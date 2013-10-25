"use strict";

(function($) {

    // The top level namespace
    var SFDC = window.SFDC || {};
    var initialized = false;
    var readyDeferred = $.Deferred();

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
    SFDC.launch = function(options) {
        if (!initialized) {
            var opts = {apiVersion: '28.0', userAgent: 'SalesforceMobileUI/alpha'};
            options = _.extend(opts, options);
            Force.init(options, 'v' + options.apiVersion);
            if (navigator.smartstore) {
                SFDC.dataStore = new Force.StoreCache('sobjects', [{path:'Name', type:'string'}, {path:'attributes.type', type:'string'}], 'Id');
                SFDC.metadataStore = new Force.StoreCache('sobjectTypes', [], 'type');
                SFDC.dataStore.init();
                SFDC.metadataStore.init();
            }
            //parseDOM();
            //setTimeout(function() { SFDC.eventDispatcher.trigger('render'); }, 0);
            initialized = true;
            readyDeferred.resolve();
        }
    }

    SFDC.cacheMode = function() {
        return SFDC.isOnline() ? Force.CACHE_MODE.SERVER_FIRST : Force.CACHE_MODE.CACHE_ONLY;
    }

    window.SFDC = SFDC;

})(jQuery);