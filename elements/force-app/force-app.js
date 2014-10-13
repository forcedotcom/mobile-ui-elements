(function($) {

    "use strict";

    // The top level namespace
    var SFDC = window.SFDC || {};
    var initialized = false;
    var readyDeferred = $.Deferred();

    var authenticator = function(authProvider) {
        return function(client, callback, error) {
            if (readyDeferred.state() != 'pending') {
                readyDeferred = $.Deferred();
                SFDC.launcher = readyDeferred.promise();
                if (authProvider) authProvider();
            }
            SFDC.launcher.done(callback).fail(error);
        }
    }

    // Global Events Dispatcher to loosely couple all the views
    SFDC.eventDispatcher = _.extend({}, Backbone.Events);
    SFDC.launcher = readyDeferred.promise();

    // Forcing v29.0 as API version as all methods/components are currently built using that API.
    // This can't be changed by the others to make sure the components don't break due to API changes.
    var SFDC_API_VERSION = 'v29.0';

    SFDC.isOnline = function() {
        // If we have cordova available, then use the bootstrap plugin to check network connection.
        if (window.cordova) return cordova.require('com.salesforce.util.bootstrap').deviceIsOnline();
        else return navigator.onLine ||
               (typeof navigator.connection != 'undefined' &&
               navigator.connection.type !== Connection.UNKNOWN &&
               navigator.connection.type !== Connection.NONE);
    }

    //SFDC.launch
    //TODO: Provide an auth provider as an argument so that the consumer can initiate fetch for new session tokens
    SFDC.launch = function(options, logLevel) {
        var opts = {userAgent: 'SalesforceMobileUI/alpha'};
        options = _.extend(opts, options);
        if (!initialized) {

            initialized = true;
            Force.init(options, SFDC_API_VERSION, null, authenticator(options.authProvider));

            if (navigator.smartstore) {
                navigator.smartstore.setLogLevel(logLevel || "info");
                SFDC.metadataStore = new Force.StoreCache('sobjectTypes', [], 'type');
                SFDC.metadataStore.init()
                .done(function() {
                    readyDeferred.resolve();
                });
            } else {
                readyDeferred.resolve();
            }
        } else {
            // Forcetk already initialized. So refresh the session info.
            Force.forcetkClient.impl.setSessionToken(options.accessToken, SFDC_API_VERSION, options.instanceUrl);
            readyDeferred.resolve();
        }
    }

    SFDC.cacheMode = function() {
        return SFDC.isOnline() ? Force.CACHE_MODE.SERVER_FIRST : Force.CACHE_MODE.CACHE_ONLY;
    }

    // Key value object store to cache all the sobject type infos.
    var sobjectTypes = {};

    // Utility method to get the cached instance of Force.SObjectType
    SFDC.getSObjectType = function(sobjectName) {
        sobjectName = sobjectName.toLowerCase();
        var typeInfo = sobjectTypes[sobjectName];

        if (!typeInfo) {
            typeInfo = new Force.SObjectType(sobjectName, SFDC.metadataStore, SFDC.cacheMode);
            sobjectTypes[sobjectName] = typeInfo;
        }
        return typeInfo;
    }

    window.SFDC = SFDC;

}).call(this, jQuery);
