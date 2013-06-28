/*
* Module's dependencies
*/
var request = require("request");
var Cache   = require("mem-cache");
var uuid    = require("node-uuid");

var Util = function(settings) {

    var self    = this;
    var config  = settings;
    var cacheOptions = {
        timeout: settings.timeout || (15 * 60 * 1000) // 15 minutes in milliseconds
    };

    Object.defineProperty(this, "cacheAuth", {
      enumerable: false,
      configurable: false,
      writable: false,
      value: new Cache(cacheOptions)
    });

    var cacheUserFlow   = new Cache(cacheOptions);
    var cacheAppFlow    = new Cache(cacheOptions);

    // For each method metadata, it adds a new public method to the instance
    this.hook = function(target, methodsInfo) {

        if ( !target || typeof target !== 'object' )            throw new Error("Invalid 'target' argument. It must be an object instance.");
        if ( !methodsInfo || typeof methodsInfo !== 'object' )  throw new Error("Invalid 'methodsInfo' argument. It must be an object instance.");

        // creates every single method
        Object.keys(methodsInfo)
            .map(function(name) {
                var info = methodsInfo[name];
                validatesMethodInfo(info);
                target[name] = createMethod(name, info);
        });
    };     

    this.validateParams = function(data, params) {

        if (!data || typeof data !== 'object')  throw new Error("Invalid 'data' argument. It must be an object instance.");
        if (!(params instanceof Array))         throw new Error("Invalid 'params' argument. It must be an string array.");

        for (var index in params) {

            var param = params[index];
            if (data[param]===undefined || data[param]===null) {
                return new Error("'" + param + "' option is required.");
            }
        }
    };

    this.authenticate = function(credentials, cb) {
        
        // defaults for credentials
        credentials = credentials || {};
        if (!cb && typeof credentials === 'function') {
            cb = credentials;
            credentials = {};
        }
        
        // defaults for cb
        cb = cb || function(err) { if(err) throw err; };
        if (typeof cb !== 'function')                           return cb (new Error("'cb' argument is invalid."));
        if (!credentials || typeof credentials !== 'object')    return  cb (new Error("'credentials' argument is invalid."));

        // builds authentication data
        var reqForm = {
            client_id:      config.client_id,   
            client_secret:  config.client_secret                   
        };

        // uses user or app credentials if one of them are present.
        if (credentials.username) {

            reqForm.grant_type  = "password";
            reqForm.username    = credentials.username;
            reqForm.password    = credentials.password;

        } else if (credentials.app_id) {

            reqForm.grant_type  = "app";
            reqForm.app_id      = credentials.app_id;
            reqForm.app_token   = credentials.app_token;

        } else {

            // if no user or app credentials were passed into credentials argument,
            // then tries to use credentials from configuration
            if (config.userFlow) {
                var auth = cacheUserFlow.get(config.userFlow.username);
                if (auth) return cb(null, auth);

                reqForm.grant_type  = "password";
                reqForm.username    = config.userFlow.username;
                reqForm.password    = config.userFlow.password;

            } else if (config.appFlow) {
                var auth = cacheAppFlow.get(config.appFlow.app_id);
                if (auth) return cb(null, auth);

                reqForm.grant_type  = "app";
                reqForm.app_id      = config.appFlow.app_id;
                reqForm.app_token   = config.appFlow.app_token;

            } else {
                // No credentials could be found.
                return cb ( new Error ("User or application credentials are needed in order to authenticate the client"));
            }
        }

        // Validates credentials
        if (reqForm.grant_type === 'password') {

            // Validates user credentials
            if (!(reqForm.username)    || typeof (reqForm.username) !== 'string') return cb( new Error("'username' property is invalid.") );
            if (!(reqForm.password)    || typeof (reqForm.password) !== 'string') return cb( new Error("'password' property is missing or invalid.") );

        } else {

            // Validates app credentials 
            if (!(reqForm.app_id)       || typeof (reqForm.app_id)    !== 'string')   return cb( new Error("'app_id' property is invalid.") );
            if (!(reqForm.app_token)    || typeof (reqForm.app_token) !== 'string')   return cb( new Error("'app_token' property is missing or invalid.") );
        }
        
        // Sets HTTP request options
        var reqOptions = {
            method  : "POST",
            url     : config.authEndpoint + "/oauth/token",
            form    : reqForm
        };

        // Invokes Podio's servers
        request(reqOptions, function(err, response){

            if (err) return cb(err);

            var auth = null;
            try {

                var body = JSON.parse(response.body);  
                auth = uuid.v4(); // Internal auth token
            
                self.cacheAuth.set( auth, buildAuthData(body));  
            
                if (reqForm.grant_type === 'password') { 

                    cacheUserFlow.set(reqForm.username, auth);

                } else {

                    cacheAppFlow.set(reqForm.app_id, auth);

                }

            } catch (e) {
                err = new Error ("Authentication response couldn't be processed." );
            }
            cb(err, auth);
        });
    };

    this.buildResponse = function(response) {

        var res = {
            statusCode: response.statusCode
        };

        if (response.headers) {
            if (response.headers["x-podio-request-id"]!==undefined) {

                res.id = response.headers["x-podio-request-id"];
            };
            
            if (response.headers["x-rate-limit-limit"]!==undefined) {
            
                res.rate = {
                    limit: parseInt(response.headers["x-rate-limit-limit"]),
                    remaining: parseInt(response.headers["x-rate-limit-remaining"])
                };
            }
        }

        if (response.body) res.body = JSON.parse(response.body);

        return res;
    };

    var createMethod = function(name, info) {

        var requiredParams = getParamsFromPath(info.path);

        return function(options, cb) {

            // manage optional options
            if (!cb && typeof options === 'function') {
                cb = options;
                options = null;
            };

            // validates cb
            cb = cb || function(err) { if(err) throw err; };
            if (typeof cb !== 'function') throw new Error("'cb' argument is invalid.");
            
            // validates options
            options = options || {};
            if (typeof options !== 'object') return cb(new Error("'options' argument is invalid."));

            // vaidate requied parameters
            var err = self.validateParams(options, requiredParams);
            if (err) return cb(err);


            getAccessToken(options, function(err, access_token) {

                if (err) return cb ( new Error ( "There was an error executing method '" + name + "'. " + err.message ));

                // Sets HTTP request options
                var reqOptions = {
                    method: info.method || "GET",
                    url: config.apiEndpoint + supplant(info.path, options),
                    headers: {
                        Authorization: "OAuth2 " + access_token          
                    }
                };

                if (options.body !== undefined)    reqOptions.json = options.body;
                if (options.params !== undefined)  reqOptions.qs = options.params;

                // Invokes Podio's servers
                request(reqOptions, function (err, response) {

                    if (err) return cb (new Error( "There was an error executing method '" + name + "'. " + err.message ));
                    cb (null, self.buildResponse(response));
                });
            });
        };

    };

    var renewToken =  function (refreshToken, cb) {
        // Sets HTTP request options
        var reqOptions = {
            method  : "POST",
            url     : config.authEndpoint + "/oauth/token",
            form    : {
                client_id       : config.client_id,   
                client_secret   : config.client_secret,
                grant_type      : "refresh_token",
                refresh_token   : refreshToken
            }
        };

        // Invokes Podio's servers
        request(reqOptions, function(err, response) {

            if (err) return cb(err);

            try {

                return cb(null, JSON.parse(response.body));  

            } catch (e) {

                cb(new Error ("renewToken response couldn't be processed." ));
            
            }
        });
    };

    var getAccessToken = function (options, cb) {
        
        // has the options an auth prop?
        if (!(options.auth)) {
        
            // try to authenticate an get a new auth
            self.authenticate(options, function (err, auth) {

                if (err) return cb(err);    // an error ocurred on authentication proccess

                // gets Podio's tokens from cache
                var tokens = self.cacheAuth.get(auth);

                // returns access_token
                cb (null, tokens.access_token);
            });

        } else {

            // gets podio's tokens from cache
            var tokens = self.cacheAuth.get(options.auth);
            if (!tokens) return cb(new Error("invalid 'auth' property.")); // tokens not found

            // is access_token expired?
            if (new Date().getTime() >= tokens.expires_at) {

                // access_token is expired, get a new one.
                renewToken(tokens.refresh_token, function(err, result) {
                
                    if (err) return cb(err);  // error while tying to renew the token

                    // token was refreshed, saves it into cache
                    var tokens = buildAuthData(result);
                    self.cacheAuth.set (options.auth, tokens);  

                    // returns access_token
                    cb (null, tokens.access_token);
                });
            } 
            else {

                // access_token is not expired, returns it
                cb(null, tokens.access_token);
            }
        }
    };

    var validatesMethodInfo = function(info) {
        // validate params
        info.params = info.params || {}
        if (typeof info.params !== 'object') throw new Error("Invalid method's params. " + JSON.stringify(info));

        // validate method
        info.method = info.method || "GET";
        if (typeof info.method !== 'string') throw new Error("Invalid HTTP method. " + JSON.stringify(info));

        // validates path
        if (!(info.path) || typeof info.path != 'string') throw new Error("Invalid method's path. " + JSON.stringify(info));
        if (info.path[0]!=='/') throw new Error("Method's path must start with '/' character. " + JSON.stringify(info));
    };

    var getParamsFromPath = function(path) {

        var results = path.match(/{([^{}]*)}/g);
        
        return results ? results.map(function(m) { return m.substring(1, m.length-1); }) : [];
    };

    var supplant = function(pattern, data) {
        return pattern.replace(/{([^{}]*)}/g,
            function (a, b) {
                
                var r = data[b];
                return typeof r === 'string' || typeof r === 'number' ? r : r.toString();
            }
        );
    };

    var buildAuthData = function(body) {
        return {       // Podio's tokens
            access_token: body.access_token,
            refresh_token: body.refresh_token,
            expires_at: new Date().getTime() + (body.expires_in - 5) * 1000
        };
    };
};

module.exports = Util;