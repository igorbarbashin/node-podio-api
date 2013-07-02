var assert      = require("assert");
var Connector   = require("../index.js");
var nock        = require('nock');
var settings    = null;


describe("podio", function () {

    beforeEach ( function ( done ) {
        
        settings = {
            client_id: "clientId",
            client_secret: "clientSecret"
        };

        nock.cleanAll();
        done();
    })

    describe ("constructor", function ( ) {

        it("should fail on invalid userFlow", function ( done ) {
            
            try {

                settings.userFlow = "invalid";
                var con = new Connector(settings);
                throw new Error ("Had to be thrown")

            } catch ( e ) {
                assert.ok(e);
                assert.ok(e instanceof Error);
                assert.ok(e.message.indexOf("'userFlow'") > -1);
                done();
            }
        });

        it("should fail on invalid userFlow.username", function ( done ) {
            
            try {

                settings.userFlow = {
                    username: 1234
                };

                var con = new Connector(settings);
                throw new Error ("Had to be thrown")

            } catch ( e ) {
                assert.ok(e);
                assert.ok(e instanceof Error);
                assert.ok(e.message.indexOf("'userFlow.username'") > -1);
                done();
            }
        });

        it("should fail on invalid userFlow.password", function ( done ) {
            
            try {

                settings.userFlow = {
                    username: "jhon"
                };

                var con = new Connector(settings);
                throw new Error ("Had to be thrown")

            } catch ( e ) {
                assert.ok(e);
                assert.ok(e instanceof Error);
                assert.ok(e.message.indexOf("'userFlow.password'") > -1);
                done();
            }
        });

        it("should fail on invalid appFlow", function ( done ) {
            
            try {

                settings.appFlow = "invalid";
                var con = new Connector(settings);
                throw new Error ("Had to be thrown")

            } catch ( e ) {
                assert.ok(e);
                assert.ok(e instanceof Error);
                assert.ok(e.message.indexOf("'appFlow'") > -1);
                done();
            }
        });

        it("should fail on invalid appFlow.app_id", function ( done ) {
            
            try {

                settings.appFlow = {
                    app_id: 1234
                };

                var con = new Connector(settings);
                throw new Error ("Had to be thrown")

            } catch ( e ) {
                assert.ok(e);
                assert.ok(e instanceof Error);
                assert.ok(e.message.indexOf("'appFlow.app_id'") > -1);
                done();
            }
        });

        it("should fail on invalid appFlow.app_token", function ( done ) {
            
            try {

                settings.appFlow = {
                    app_id: "jhon"
                };

                var con = new Connector(settings);
                throw new Error ("Had to be thrown")

            } catch ( e ) {
                assert.ok(e);
                assert.ok(e instanceof Error);
                assert.ok(e.message.indexOf("'appFlow.app_token'") > -1);
                done();
            }
        });

        it("should fail if both, userFlow and appFlow, were specified", function ( done ) {
            
            try {

                settings.appFlow = {
                    app_id: "jhon",
                    app_token: "1234"
                };

                settings.userFlow = {
                    username: "foo",
                    password: "5678"
                };

                var con = new Connector(settings);
                throw new Error ("Had to be thrown")

            } catch ( e ) {
                assert.ok(e);
                assert.ok(e instanceof Error);
                assert.ok(e.message.indexOf("'userFlow'") > -1);
                assert.ok(e.message.indexOf("'appFlow'") > -1);
                done();
            }
        });

        it("should be able to create an instance", function ( done ) {

            var con = new Connector(settings);
            assert.ok(con);
            done();
        });
    });

    it ("methods have been hooked", function (done) {

        var con = new Connector(settings);
        assert.equal("function", typeof con["applicationsActivateApp"]);
        done();
    });
});
