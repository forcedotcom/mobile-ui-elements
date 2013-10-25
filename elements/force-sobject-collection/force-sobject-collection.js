"use strict";

(function(SFDC) {

    var viewProps = {
        sobject: "Account",
        query: "",
        querytype: "mru"
        /* async: false */ // Optional property to perform fetch as a web worker operation. Useful for data priming.
    };

    var generateConfig = function(props) {
        var config = {};

        // Fetch if only sobject type is specified.
        if (props.sobject) {
            // Is device online
            if (SFDC.isOnline()) {
                // Send the user config for fetch
                config.sobjectType = props.sobject;
                config.type = props.querytype;
                config.query = props.query;
            }
            // Is device offline and smartstore is available
            else if (navigator.smartstore) {
                // Only run cache queries. If none provided, fetch all data.
                config.type = 'cache';
                if (props.querytype == 'cache' && props.query) config.query = props.query;
                else config.cacheQuery = navigator.smartstore.buildExactQuerySpec('attributes.type', props.sobject);
            }
            return config;
        }
        return null;
    }

    Polymer('force-sobject-collection', _.extend({}, viewProps, {
        ready: function() {
            this.collection = new (Force.SObjectCollection.extend({
                cache: SFDC.dataStore,
                cacheMode: SFDC.cacheMode,
                config: generateConfig(_.pick(this, _.keys(viewProps)))
            }));

            //TBD: May be listen for the event when app is ready to do the fetch. Or fetch can be triggered by the consumer.
            this.async(this.fetch);
        },
        attributeChanged: function(attrName, oldVal, newVal) {
            var config = generateConfig(_.pick(this, _.keys(viewProps)));
            // FIXME: Polymer is calling this method multiple times for single attribute change.
            // That's why adding the isEqual check to prevent multiple server calls.
            if (!_.isEqual(config, this.collection.config)) {
                this.collection.config = config;
                this.async( this.fetch );
            }
        },
        fetch: function() {
            var that = this;
            SFDC.launcher.done(function() { that.collection.fetch({reset: true}); });
        }
    }));

})(window.SFDC);