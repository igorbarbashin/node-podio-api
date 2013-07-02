/*
* Module's dependencies
*/
var request = require("request");
var Util    = require("./lib/util.js");


/**
 * Podio class
 * Handles invocations to Podios's methods. User and Application flows for authentication are supported, both
 * are optional but only one can be specified at the same time.
 * @param client_id     {string} Required. Get it from yours "API key" at Podio. https://developers.podio.com/authentication
 * @param client_secret {string} Required. Get it from yours "API key" at Podio. https://developers.podio.com/authentication
 * @param apiEndpoint   {string} Optional. API's endpoint, by defaults it is https://api.podio.com
 * @param authEndpoint  {string} Optional. Autorization endpoint, by defaults it is https://podio.com
 * @param userFlow      {object} Optional. Object instance containing user credentials
 *  - username          {string} Optional. user name
 *  - password          {string} Optional. user password
 * @param appFlow       {object} Optional. Object instance containing application credentials
 *  - app_id            {string} Optional. Application Id
 *  - app_token         {string} Optional. Application token
 * @returns {Podio}
 * @api public
 */

var Podio = function(settings) {

    // sets default values
    settings = settings || {};
    settings.apiEndpoint = settings.apiEndpoint || "https://api.podio.com";
    settings.authEndpoint = settings.authEndpoint || "https://podio.com";
    
    // validates endpoints
    if (typeof(settings.apiEndpoint)!=="string")    throw new Error("'apiEndpoint' setting is invalid.");
    if (typeof(settings.authEndpoint)!=="string")   throw new Error("'apiEndpoint' setting is invalid.");
    
    // validates client credentials
    if (!(settings.client_id)       || typeof(settings.client_id)!=="string")       throw new Error("'client_id' setting is missing or invalid.");
    if (!(settings.client_secret)   || typeof(settings.client_secret)!=="string")   throw new Error("'client_secret' setting is missing or invalid.");


    // both flow authentication credentials are not suppoted at he same time
    if (settings.userFlow && settings.appFlow) throw new Error("'userFlow' and 'appFlow' setting are not supported at the same time.");

    if (settings.userFlow) {
        // validates user credentials
        if (typeof(settings.userFlow)!=="object")   throw new Error("'userFlow' setting must be an object instance.");
        if (!(settings.userFlow.username) || typeof(settings.userFlow.username)!=="string") throw new Error("'userFlow.username' setting is missing or invalid.");
        if (!(settings.userFlow.password) || typeof(settings.userFlow.password)!=="string") throw new Error("'userFlow.password' setting is missing or invalid.");
    }

    if (settings.appFlow) {
        // validates app credentials
        if (typeof(settings.appFlow)!=="object")    throw new Error("'appFlow' setting must be an object instance.");
        if (!(settings.appFlow.app_id)      || typeof(settings.appFlow.app_id)!=="string")      throw new Error("'appFlow.app_id' setting is missing or invalid.");
        if (!(settings.appFlow.app_token)   || typeof(settings.appFlow.app_token)!=="string")   throw new Error("'appFlow.app_token' setting is missing or invalid.");
    }
    
    // now that settings argument was validated, creates Util instance
    var util = new Util(settings);

    /*
    * Gets an acces token using "User & password authentication" or "Application authentication"
    */
    this.authenticate = function ( options, cb ) {
        
        util.authenticate(options, cb);
    };

    // Adds public methods to the instance
    util.hook(this, require("./lib/methods"));
};

// Exports Podio class 
module.exports = Podio;
