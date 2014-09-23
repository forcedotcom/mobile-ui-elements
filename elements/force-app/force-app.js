(function($) {

    "use strict";

    // The top level namespace
    var SFDC = window.SFDC || {};
    var initialized = false;
    var readyDeferred = $.Deferred();

    var authenticator = function(client, callback, error) {
        if (readyDeferred.state() != 'pending') {
            readyDeferred = $.Deferred();
            SFDC.launcher = readyDeferred.promise();
        }
        SFDC.launcher.done(callback).fail(error);
    }

    // Global Events Dispatcher to loosely couple all the views
    SFDC.eventDispatcher = _.extend({}, Backbone.Events);
    SFDC.launcher = readyDeferred.promise();

    SFDC.isOnline = function() {
        return navigator.onLine ||
               (typeof navigator.connection != 'undefined' &&
               navigator.connection.type !== Connection.UNKNOWN &&
               navigator.connection.type !== Connection.NONE);
    }

    //SFDC.launch
    //TODO: Provide an auth provider as an argument so that the consumer can initiate fetch for new session tokens
    SFDC.launch = function(options, logLevel) {
        var opts = {apiVersion: 'v31.0', userAgent: 'SalesforceMobileUI/alpha'};
        options = _.extend(opts, options);
        if (!initialized) {

            initialized = true;
            Force.init(options, options.apiVersion, null, authenticator);

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
            Force.forcetkClient.impl.setSessionToken(options.accessToken, options.apiVersion, options.instanceUrl);
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
