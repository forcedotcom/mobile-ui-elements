(function(SFDC) {

    "use strict";

    // Fetches the record type id for the required layout.
    // Returns a promise which is resolved when the record type id is fetched from the server.
    var fetchRecordTypeId = function(view) {
        var fetchStatus = $.Deferred();

        var resolveStatus = function(recordTypeId) {
            fetchStatus.resolve(view.sobject, recordTypeId);
        }

        // If record types are not present, then use the default recordtypeid
        if (!view.hasrecordtypes) resolveStatus('012000000000000AAA');
        // If record types are present, then get the recordtypeid
        else {
            var sobjectElem = view.$.force_sobject;
            // If record type id is provided then use that.
            if (view.recordtypeid) resolveStatus(view.recordtypeid);
            // If not but the recordid is available, then get the recordtype info from sfdc
            else if (sobjectElem.fields.Id && sobjectElem.fields.Id.length) {
                // Fetch the record's recordtypeid
                sobjectElem.fetch({
                    success: function() {
                        // Once we get the recordtypeid, fetch the layout
                        resolveStatus(this.get('recordTypeId'));
                    },
                    error: function() {
                        fetchStatus.reject(view);
                    }
                });
            }
        }

        return fetchStatus.promise();
    }

    var getLayoutInfo = function(sobject, recordtypeid) {
        return SFDC.getSObjectType(sobject)
            .describeLayout(recordtypeid);
    }

    Polymer('force-sobject-layout', {
        sobject: null,
        hasrecordtypes: false,
        recordtypeid: null,
        recordid: null,
        observe: {
            sobject: "fetch",
            recordid: "fetch",
            hasrecordtypes: "fetch",
            recordtypeid: "fetch"
        },
        fetch: function() {
            this.layout = null;
            if (this.sobject && typeof this.sobject === 'string') {
                fetchRecordTypeId(this)
                .then(getLayoutInfo)
                .then(function(layout) {
                    this.layout = layout;
                    this.fire('layout-change');
                }.bind(this));
            }
        }
    });

}).call(this, SFDC);