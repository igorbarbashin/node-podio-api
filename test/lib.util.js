var assert      = require("assert");
var Util        = require("../lib/util.js");
var nock        = require('nock');
var uuid        = require("node-uuid");
var settings    = null;

describe("lib.util", function ( ) {

    beforeEach ( function ( done ) {
        
        settings = {
            client_id:      "clientId",
            client_secret:  "clientSecret",
            apiEndpoint:    "https://api.podio.com",
            authEndpoint:   "https://podio.com"
        };
        nock.cleanAll();
        done();
    })

    describe("authentication", function() {

        it("should fail if invalid credentials", function ( done ) {
            var util = new Util(settings);
            util.authenticate("invalid credentials", function(err, result){
                assert.ok(err);
                assert.ok(err instanceof Error);
                assert.ok(err.message.indexOf('credentials') > -1);
                done();
            });
        });

        describe ("authenticate using user and password", function() {
            
            it("should fail if no username", function ( done ) {
                var util = new Util(settings);
                var options = {
                    password:"beta"
                };

                util.authenticate(options, function(err, result){
                    assert.ok(err);
                    assert.ok(err instanceof Error);
                    assert.ok(err.message.indexOf('User or application') > -1);
                    done();
                });
            });

            it("should fail if no password", function ( done ) {
                var util = new Util(settings);
                var options = {
                    username:"alfa"
                };

                util.authenticate(options, function(err, result){
                    assert.ok(err);
                    assert.ok(err instanceof Error);
                    assert.ok(err.message.indexOf('password') > -1);
                    done();
                });
            });
 
            it("should authenticate", function ( done ) {

                nock("https://podio.com")
                    .post("/oauth/token", "client_id=clientId&client_secret=clientSecret&grant_type=password&username=alfa&password=beta")
                    .reply(200, { access_token: "foo", refresh_token: "bar", expires_in: 10 });

                var util = new Util(settings);
                var options = {
                    username:"alfa",
                    password:"beta"
                };

                util.authenticate(options, function(err, result) {
                    assert.ok(!err);
                    assert.ok(result);
                    assert.equal('string', typeof result.auth);
                    assert.equal(36, result.auth.length);
                    done();
                });
            });
        });

        describe ("authenticate using application credentials", function() {
            
            it("should fail if no app_id", function ( done ) {
                var util = new Util(settings);
                var options = {
                    app_token: "omega"
                };

                util.authenticate(options, function(err, result){
                    assert.ok(err);
                    assert.ok(err instanceof Error);
                    assert.ok(err.message.indexOf('User or application') > -1);
                    done();
                });
            });

            it("should fail if no app_token", function ( done ) {
                var util = new Util(settings);
                var options = {
                    app_id: "gama"
                };

                util.authenticate(options, function(err, result){
                    assert.ok(err);
                    assert.ok(err instanceof Error);
                    assert.ok(err.message.indexOf('app_token') > -1);
                    done();
                });
            });

            it("should authenticate", function ( done ) {

                var podio = nock("https://podio.com")
                    .post("/oauth/token", "client_id=clientId&client_secret=clientSecret&grant_type=app&app_id=gama&app_token=omega")
                    .reply(200, { access_token: "foo", refresh_token: "bar", expires_in: 10 });

                var util = new Util(settings);
                var options = {
                    app_id: "gama",
                    app_token: "omega"
                };

                util.authenticate(options, function(err, result){
                    assert.ok(!err);
                    assert.ok(result);
                    assert.equal('string', typeof result.auth);
                    assert.equal(36, result.auth.length);
                    done();
                });
            });
        });
    });

    describe("hook", function ( ) {

        it("Should throw if no target argument", function ( done ) {

            try {
                var util = new Util({});
                util.hook();
                throw new Error ("Had to be thrown")

            } catch ( e ) {
                assert.ok(e);
                assert.ok(e instanceof Error);
                assert.ok(e.message.indexOf("'target'") > -1);
                done();
            }
        } );

        it("Should throw if no methods argument", function ( done ) {

            try {
                var util = new Util({});
                util.hook({});
                throw new Error ("Had to be thrown");

            } catch ( e ) {
                assert.ok(e);
                assert.ok(e instanceof Error);
                assert.ok(e.message.indexOf("'methods") > -1);
                done();
            }
        });

        it ("Should add all methods", function ( done ) {

            var target = {},
                methods = { group: {
                    foo: { path: "/" },
                    bar: { path: "/" }
                } };

            var util = new Util({});
            util.hook(target, methods);

            assert.ok(typeof target["foo"] === 'function');
            assert.ok(typeof target["bar"] === 'function');
            done();
        });

        it("Should set GET as default HTTP method", function ( done ) {

            settings.apiEndpoint = "http://contoso";

            var server = nock("http://contoso")
                .get("/")
                .reply(200, true);

            var target  = {};
            var methods = { group: { foo: { path: "/" } } };
            var util    = new Util(settings)
            
            util.cacheAuth.set ("xyz", { 
                access_token    : "alfa",
                refresh_token   : "beta",
                expires_in      : 10
            });

            util.hook(target, methods);

            assert.ok(typeof target["foo"] === 'function');

            target["foo"]({ auth: 'xyz' }, function(err, result) {
                assert.ok(!err);
                assert.ok(result);
                done();
            })
        });

        it ("Should set the HTTP method", function ( done ) {

            settings.apiEndpoint = "http://contoso";

            var server = nock("http://contoso")
                .post("/")
                .reply(200, true);

            var target  = {};
            var methods = { group: { foo: { method: "POST", path: "/" } } };
            var util    = new Util(settings)

            util.cacheAuth.set ("xyz", { 
                access_token    : "alfa",
                refresh_token   : "beta",
                expires_in      : 10
            });

            util.hook(target, methods);

            assert.ok(typeof target["foo"] === 'function');

            target["foo"]({ auth: 'xyz' }, function(err, result){

                assert.ok(!err);
                assert.ok(result);
                done();
            })
        });

        it ("Should set the path", function ( done ) {

            settings.apiEndpoint = "http://contoso";

            var server = nock("http://contoso")
                .get("/alfa/beta")
                .reply(200, true);

            var target  = {};
            var methods = { group: { foo: { path: "/alfa/beta" } } };
            var util    = new Util(settings)

            util.cacheAuth.set ("xyz", { 
                access_token    : "alfa",
                refresh_token   : "beta",
                expires_in      : 10
            });

            util.hook(target, methods);

            assert.ok(typeof target["foo"] === 'function');

            target["foo"]({ auth: 'xyz' }, function(err, result){

                assert.ok(!err);
                assert.ok(result);
                done();
            });
        });
    });

    describe("invoking methods", function ( ) {

        var methods = { group: { foo: { path: "/" } } };

        beforeEach (function (done) {
            settings.apiEndpoint = "http://api.contoso";
            settings.authEndpoint = "http://auth.contoso";
            done();
        });

        describe ("if not authentication flow was configured", function() {

            it ("should fail if not auth value, user credentials or app credentials were passed within option argument, ", function ( done ) {

                var target = {};
                var util = new Util(settings);
                util.hook(target, methods);         

                target["foo"]({ }, function(err, result) {
                    assert.ok(err);
                    assert.ok(err instanceof Error);
                    assert.ok(err.message.indexOf('foo') > -1);
                    done();
                });
            });

            it ("should be able to authenticate and invoke a method passing auth value" , function (done) {
                nock("http://auth.contoso")
                    .post("/oauth/token", "client_id=clientId&client_secret=clientSecret&grant_type=password&username=alfa&password=beta")
                    .reply(200, { access_token: "xyz", refresh_token: "pqr", expires_in: 10 });

                nock("http://api.contoso")
                    .matchHeader('Authorization', 'OAuth2 xyz')
                    .get("/")
                    .reply(200, {foo:"bar"});

                var target = {};
                var util = new Util(settings);
        
                util.hook(target, methods);         

                util.authenticate({ username:"alfa", password:"beta" }, function (err, authRes) {

                    assert.ok(!err);
                    assert.ok(authRes);
                    assert.equal("string", typeof authRes.auth);
                    assert.equal(36, authRes.auth.length);

                    target["foo"]({ auth: authRes.auth }, function(err, result){
                        assert.ok(!err);
                        assert.ok(result);
                        assert.equal(200, result.statusCode);
                        assert.ok(result.body);
                        assert.equal("bar", result.body.foo);
                        done();
                    });
                });
            });

            it ("should invoke if user credentials were passed" , function (done) {
                nock("http://auth.contoso")
                    .post("/oauth/token", "client_id=clientId&client_secret=clientSecret&grant_type=password&username=alfa&password=beta")
                    .reply(200, { 
                        access_token    : "xyz",
                        refresh_token   : "pqr",
                        expires_in      : 10
                    });

                nock("http://api.contoso")
                    .matchHeader('Authorization', 'OAuth2 xyz')
                    .get("/")
                    .reply(200, {foo:"bar"});

                var target = {};
                var util = new Util(settings);
                util.hook(target, methods);         

                target["foo"]({ username: "alfa", password: "beta" }, function(err, result){
                    assert.ok(!err);
                    assert.ok(result);
                    assert.equal(200, result.statusCode);
                    assert.ok(result.body);
                    assert.equal("bar", result.body.foo);
                    done();
                });
            });

            it ("should not cache passed user credentials" , function (done) {
                nock("http://auth.contoso")
                    .post("/oauth/token", "client_id=clientId&client_secret=clientSecret&grant_type=password&username=alfa&password=beta")
                    .reply(200, { 
                        access_token    : "xxx",
                        refresh_token   : "pqr",
                        expires_in      : 10
                    });

                nock("http://auth.contoso")
                    .post("/oauth/token", "client_id=clientId&client_secret=clientSecret&grant_type=password&username=alfa&password=beta")
                    .reply(200, { 
                        access_token    : "yyy",
                        refresh_token   : "pqr",
                        expires_in      : 10
                    });

                nock("http://api.contoso")
                    .matchHeader('Authorization', 'OAuth2 xxx')
                    .get("/")
                    .reply(200, {foo:"bar"});

                nock("http://api.contoso")
                    .matchHeader('Authorization', 'OAuth2 yyy')
                    .get("/")
                    .reply(200, {foo:"baz"});

                var target = {};
                var util = new Util(settings);
                util.hook(target, methods);   
                var method = target["foo"];       

                method({ username: "alfa", password: "beta" }, function(err, result){
                    assert.ok(!err);
                    assert.ok(result);
                    assert.equal(200, result.statusCode);
                    assert.ok(result.body);
                    assert.equal("bar", result.body.foo);

                    // this invocation must request a new authentication and invoke the method using 'yyy' as auth 
                    method({ username: "alfa", password: "beta" }, function(err, result){

                        assert.ok(!err);
                        assert.ok(result);
                        assert.equal(200, result.statusCode);
                        assert.ok(result.body);
                        assert.equal("baz", result.body.foo);
                        done();
                    });
                });
            });

            it ("should invoke if app credentials were passed" , function (done) {
                nock("http://auth.contoso")
                    .post("/oauth/token", "client_id=clientId&client_secret=clientSecret&grant_type=app&app_id=alfa&app_token=beta")
                    .reply(200, { 
                        access_token    : "xyz",
                        refresh_token   : "pqr",
                        expires_in      : 10
                    });

                nock("http://api.contoso")
                    .matchHeader('Authorization', 'OAuth2 xyz')
                    .get("/")
                    .reply(200, {foo:"bar"});

                var target = {};
                var util = new Util(settings);
                util.hook(target, methods);         

                target["foo"]({ app_id: "alfa", app_token: "beta" }, function(err, result){
                    assert.ok(!err);
                    assert.ok(result);
                    assert.equal(200, result.statusCode);
                    assert.ok(result.body);
                    assert.equal("bar", result.body.foo);
                    done();
                });
            });

            it ("should not cache passed app credentials" , function (done) {
                nock("http://auth.contoso")
                    .post("/oauth/token", "client_id=clientId&client_secret=clientSecret&grant_type=app&app_id=alfa&app_token=beta")
                    .reply(200, { 
                        access_token    : "xxx",
                        refresh_token   : "pqr",
                        expires_in      : 10
                    });

                nock("http://auth.contoso")
                    .post("/oauth/token", "client_id=clientId&client_secret=clientSecret&grant_type=app&app_id=alfa&app_token=beta")
                    .reply(200, { 
                        access_token    : "yyy",
                        refresh_token   : "pqr",
                        expires_in      : 10
                    });

                nock("http://api.contoso")
                    .matchHeader('Authorization', 'OAuth2 xxx')
                    .get("/")
                    .reply(200, {foo:"bar"});

                nock("http://api.contoso")
                    .matchHeader('Authorization', 'OAuth2 yyy')
                    .get("/")
                    .reply(200, {foo:"baz"});

                var target = {};
                var util = new Util(settings);
                util.hook(target, methods);   
                var method = target["foo"];       

                method({ app_id: "alfa", app_token: "beta" }, function(err, result){
                    assert.ok(!err);
                    assert.ok(result);
                    assert.equal(200, result.statusCode);
                    assert.ok(result.body);
                    assert.equal("bar", result.body.foo);

                    // this invocation must request a new authentication and invoke the method using 'yyy' as auth 
                    method({ app_id: "alfa", app_token: "beta" }, function(err, result){

                        assert.ok(!err);
                        assert.ok(result);
                        assert.equal(200, result.statusCode);
                        assert.ok(result.body);
                        assert.equal("baz", result.body.foo);
                        done();
                    });
                });
            });
        });

        describe ("if user authentication flow was configured", function() {

            beforeEach (function (done) {
                settings.userFlow = {
                    username: "alfa",
                    password: "beta"
                };
                done();
            });

            it ("should use configured user credentials if not auth value was passed within option argument, ", function ( done ) {

                nock("http://auth.contoso")
                    .post("/oauth/token", "client_id=clientId&client_secret=clientSecret&grant_type=password&username=alfa&password=beta")
                    .reply(200, { 
                        access_token    : "xyz",
                        refresh_token   : "pqr",
                        expires_in      : 10
                    });

                nock("http://api.contoso")
                    .matchHeader('Authorization', 'OAuth2 xyz')
                    .get("/")
                    .reply(200, {foo:"bar"});

                var target = {};
                var util = new Util(settings);
                util.hook(target, methods);         

                target["foo"]({ }, function(err, result){
                    assert.ok(!err);
                    assert.ok(result);
                    assert.equal(200, result.statusCode);
                    assert.ok(result.body);
                    assert.equal("bar", result.body.foo);
                    done();
                });
            });

            it("should cache configured user credentials" , function (done) {

                nock("http://auth.contoso")
                    .post("/oauth/token", "client_id=clientId&client_secret=clientSecret&grant_type=password&username=alfa&password=beta")
                    .reply(200, { 
                        access_token    : "xxx",
                        refresh_token   : "pqr",
                        expires_in      : 10
                    });

                nock("http://api.contoso")
                    .matchHeader('Authorization', 'OAuth2 xxx')
                    .get("/")
                    .reply(200, {foo:"bar"});

                nock("http://api.contoso")
                    .matchHeader('Authorization', 'OAuth2 xxx')
                    .get("/")
                    .reply(200, {foo:"baz"});

                var target = {};
                var util = new Util(settings);
                util.hook(target, methods);   
                var method = target["foo"];       

                method({ }, function(err, result){
                    assert.ok(!err);
                    assert.ok(result);
                    assert.equal(200, result.statusCode);
                    assert.ok(result.body);
                    assert.equal("bar", result.body.foo);

                    // this invocation must use cache auth 
                    method({ }, function(err, result){
                        assert.ok(!err);
                        assert.ok(result);
                        assert.equal(200, result.statusCode);
                        assert.ok(result.body);
                        assert.equal("baz", result.body.foo);
                        done();
                    });
                });
            });

            it ("should use passed user credentials instead the configured one" , function (done) {
                nock("http://auth.contoso")
                    .post("/oauth/token", "client_id=clientId&client_secret=clientSecret&grant_type=password&username=gama&password=omega")
                    .reply(200, { 
                        access_token    : "xyz",
                        refresh_token   : "pqr",
                        expires_in      : 10
                    });

                nock("http://api.contoso")
                    .matchHeader('Authorization', 'OAuth2 xyz')
                    .get("/")
                    .reply(200, {foo:"bar"});

                var target = {};
                var util = new Util(settings);
                util.hook(target, methods);         

                target["foo"]({ username: "gama", password: "omega" }, function(err, result){
                    assert.ok(!err);
                    assert.ok(result);
                    assert.equal(200, result.statusCode);
                    assert.ok(result.body);
                    assert.equal("bar", result.body.foo);
                    done();
                });
            });

            it("should use passed app credentials instead the configured user credentials" , function (done) {
                nock("http://auth.contoso")
                    .post("/oauth/token", "client_id=clientId&client_secret=clientSecret&grant_type=app&app_id=gama&app_token=omega")
                    .reply(200, { 
                        access_token    : "xyz",
                        refresh_token   : "pqr",
                        expires_in      : 10
                    });

                nock("http://api.contoso")
                    .matchHeader('Authorization', 'OAuth2 xyz')
                    .get("/")
                    .reply(200, {foo:"bar"});

                var target = {};
                var util = new Util(settings);
                util.hook(target, methods);         

                target["foo"]({ app_id: "gama", app_token: "omega" }, function(err, result){
                    assert.ok(!err);
                    assert.ok(result);
                    assert.equal(200, result.statusCode);
                    assert.ok(result.body);
                    assert.equal("bar", result.body.foo);
                    done();
                });
            });
        });

        describe ("if app authentication flow was configured", function() {

            beforeEach (function (done) {
                settings.appFlow = {
                    app_id: "alfa",
                    app_token: "beta"
                };
                done();
            });

            it("should use configured app credentials if not auth value was passed within option argument, ", function ( done ) {

                nock("http://auth.contoso")
                    .post("/oauth/token", "client_id=clientId&client_secret=clientSecret&grant_type=app&app_id=alfa&app_token=beta")
                    .reply(200, { 
                        access_token    : "xyz",
                        refresh_token   : "pqr",
                        expires_in      : 10
                    });

                nock("http://api.contoso")
                    .matchHeader('Authorization', 'OAuth2 xyz')
                    .get("/")
                    .reply(200, {foo:"bar"});

                var target = {};
                var util = new Util(settings);
                util.hook(target, methods);         

                target["foo"]({ }, function(err, result){
                    assert.ok(!err);
                    assert.ok(result);
                    assert.equal(200, result.statusCode);
                    assert.ok(result.body);
                    assert.equal("bar", result.body.foo);
                    done();
                });
            });

            it ("should cache configured app credentials" , function (done) {
                nock("http://auth.contoso")
                    .post("/oauth/token", "client_id=clientId&client_secret=clientSecret&grant_type=app&app_id=alfa&app_token=beta")
                    .reply(200, { 
                        access_token    : "xxx",
                        refresh_token   : "pqr",
                        expires_in      : 10
                    });

                nock("http://api.contoso")
                    .matchHeader('Authorization', 'OAuth2 xxx')
                    .get("/")
                    .reply(200, {foo:"bar"});

                nock("http://api.contoso")
                    .matchHeader('Authorization', 'OAuth2 xxx')
                    .get("/")
                    .reply(200, {foo:"baz"});

                var target = {};
                var util = new Util(settings);
                util.hook(target, methods);   
                var method = target["foo"];       

                method({ }, function(err, result){
                    assert.ok(!err);
                    assert.ok(result);
                    assert.equal(200, result.statusCode);
                    assert.ok(result.body);
                    assert.equal("bar", result.body.foo);

                    // this invocation must use cache auth 
                    method({ }, function(err, result){

                        assert.ok(!err);
                        assert.ok(result);
                        assert.equal(200, result.statusCode);
                        assert.ok(result.body);
                        assert.equal("baz", result.body.foo);
                        done();
                    });
                });
            });

            it ("should use passed user credentials instead the configured app credentials" , function (done) {
                nock("http://auth.contoso")
                    .post("/oauth/token", "client_id=clientId&client_secret=clientSecret&grant_type=password&username=gama&password=omega")
                    .reply(200, { 
                        access_token    : "xyz",
                        refresh_token   : "pqr",
                        expires_in      : 10
                    });

                nock("http://api.contoso")
                    .matchHeader('Authorization', 'OAuth2 xyz')
                    .get("/")
                    .reply(200, {foo:"bar"});

                var target = {};
                var util = new Util(settings);
                util.hook(target, methods);         

                target["foo"]({ username: "gama", password: "omega" }, function(err, result){
                    assert.ok(!err);
                    assert.ok(result);
                    assert.equal(200, result.statusCode);
                    assert.ok(result.body);
                    assert.equal("bar", result.body.foo);
                    done();
                });
            });

            it("should use passed app credentials instead the configured one" , function (done) {
                nock("http://auth.contoso")
                    .post("/oauth/token", "client_id=clientId&client_secret=clientSecret&grant_type=app&app_id=gama&app_token=omega")
                    .reply(200, { 
                        access_token    : "xyz",
                        refresh_token   : "pqr",
                        expires_in      : 10
                    });

                nock("http://api.contoso")
                    .matchHeader('Authorization', 'OAuth2 xyz')
                    .get("/")
                    .reply(200, {foo:"bar"});

                var target = {};
                var util = new Util(settings);
                util.hook(target, methods);         

                target["foo"]({ app_id: "gama", app_token: "omega" }, function(err, result){
                    assert.ok(!err);
                    assert.ok(result);
                    assert.equal(200, result.statusCode);
                    assert.ok(result.body);
                    assert.equal("bar", result.body.foo);
                    done();
                });
            });
        });

        it ("Should fail on missing required argument", function ( done ) {

            var target = {};
            var methods = { group: { foo: { path: "/{requiredArg}" } } };
            var util = new Util(settings);            

            util.cacheAuth.set ("xyz", { 
                access_token    : "alfa",
                refresh_token   : "beta",
                expires_in      : 10
            });

            util.hook(target, methods);

            assert.ok(typeof target["foo"] === 'function');

            target["foo"]({auth:1}, function(err, result){
                assert.ok(err);
                assert.ok(err instanceof Error);
                assert.ok(err.message.indexOf("requiredArg") > -1);
                done();
            })
        });


        it ("Should process required argument", function ( done ) {

            var server = nock("http://api.contoso")
                .get("/bar")
                .reply(200, true);

            var target = {};
            var methods = { group: { foo: { path: "/{requiredArg}" } } };
            var util = new Util(settings);

            util.cacheAuth.set ("xyz", { 
                access_token    : "alfa",
                refresh_token   : "beta",
                expires_in      : 10
            });

            util.hook(target, methods);

            assert.ok(typeof target["foo"] === 'function');

            target["foo"]({auth:'xyz', requiredArg: "bar"}, function(err, result){

                assert.ok(!err);
                assert.ok(result);
                done();
            })
        });


        it ("Should send body", function ( done ) {

            var server = nock("http://api.contoso")
                .get("/", {bar:1})
                .reply(200, true);

            var target = {};
            var methods = { group: { foo: { path: "/" } } };
            var util = new Util(settings);

            util.cacheAuth.set ("xyz", { 
                access_token    : "alfa",
                refresh_token   : "beta",
                expires_in      : 10
            });

            util.hook(target, methods);

            assert.ok(typeof target["foo"] === 'function');

            target["foo"]({auth:'xyz', body: { bar: 1 }}, function(err, result){
                assert.ok(!err);
                assert.ok(result);
                done();
            })
        });
    

        it ("Should send optional params as querystring", function ( done ) {

            var server = nock("http://api.contoso")
                .get("/?bar=1&baz=2")
                .reply(200, true);

            var target = {};
            var methods = { group: { foo: { path: "/" } } };
            var util = new Util(settings);

            util.cacheAuth.set ("xyz", { 
                access_token    : "alfa",
                refresh_token   : "beta",
                expires_in      : 10
            });

            util.hook(target, methods);

            assert.ok(typeof target["foo"] === 'function');

            target["foo"]({auth:'xyz', params: { bar: 1, baz: 2 } }, function(err, result){
                assert.ok(!err);
                assert.ok(result);
                done();
            })
        });
    } );

    describe("validateParams", function () {

        it ("Should throw if no data argument", function ( done ) {
            
            try {
                var util = new Util(settings);
                util.validateParams();
                throw new Error ("Had to be thrown")

            } catch ( e ) {
                assert.ok(e);
                assert.ok(e instanceof Error);
                assert.ok(e.message.indexOf("'data'") > -1);
                done();
            }
        } );

        it ("Should throw if no params argument.", function ( done ) {
            
            try {
                var util = new Util(settings);
                util.validateParams({});
                throw new Error ("Had to be thrown")

            } catch ( e ) {
                assert.ok(e);
                assert.ok(e instanceof Error);
                assert.ok(e.message.indexOf("'params'") > -1);
                done();
            }
        } );

        it ("Should not fail on empty array of params.", function ( done ) {
            var util = new Util(settings);
            var err = util.validateParams({}, []);
            assert.ok(!err);
            done();
        });


        it ("Should not return an error if all params are present.", function ( done ) {
            var util = new Util(settings);
            var err = util.validateParams({ x:1, y: 1, z: 1}, [ "x", "z"]);
            assert.ok(!err);
            done();
        });


        it ("Should return an error on first param that is not present.", function ( done ) {
            var util = new Util(settings);
            var err = util.validateParams({ x:1, z: 1}, [ "x", "y", "z"]);
            assert.ok ( err );
            assert.ok ( err instanceof Error );
            assert.ok ( err.message.indexOf ( "'y'" ) > -1 );
            done();
        });
    } );

    describe("buildResponse", function () {

        it ("Should include status code.", function ( done ) {

            var util    = new Util(settings);
            var res     = util.buildResponse({statusCode: 200});

            assert.ok(res);
            assert.equal(200, res.statusCode);
            done();
        } );


        it ("Should include x-podio-request-id header", function ( done ) {

            var util    = new Util(settings);
            var res     = util.buildResponse( {
                headers : { "x-podio-request-id": 'foo' }
            });

            assert.ok(res);
            assert.equal('foo', res.id);
            done();
        } );


        it ("Should include x-rate-limit-* headers", function ( done ) {

            var util    = new Util(settings);
            var res     = util.buildResponse( {
                headers : { 
                    "x-rate-limit-remaining": '11',
                    "x-rate-limit-limit": '22'
                }
            });

            assert.ok(res);
            assert.ok(res.rate);
            assert.equal(11, res.rate.remaining);
            assert.equal(22, res.rate.limit);
            done();
        } );


        it ("Should include parsed body", function ( done ) {

            var util    = new Util(settings);
            var res     = util.buildResponse( { body : '{ "foo": "bar"}' });

            assert.ok(res);
            assert.ok(res.body);
            assert.equal('bar', res.body.foo);
            done();
        } );
    } );
} );