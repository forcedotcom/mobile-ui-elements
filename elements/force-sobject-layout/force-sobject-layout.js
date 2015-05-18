(function(SFDC) {

    "use strict";

    // Fetches the record type id for the required layout.
    // Returns a promise which is resolved when the record type id is fetched from the server.
    var fetchRecordTypeId = function() {
        var view = this;
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
    Polymer({
        is: 'force-sobject-layout', 
        properties: {
    
            /**
             * (Required) Name of Salesforce sobject for which layout info will be fetched.
             *
             * @attribute sobject
             * @type String
             */
            sobject: String,

            /**
             * (Optional) If false, the element returns the default layout. Set true if the sobject has recordtypes or if you are unsure. If set to true, "recordid" or "recordtypeid" must be provided.
             *
             * @attribute hasrecordtypes
             * @type Boolean
             * @default false
             */
            hasrecordtypes: {
                type: Boolean,
                value: false
            },

            /**
             * (Optional) Id of the record type for which layout has to be fetched. Required if "hasrecordtypes" is true and "recordid" is not provided.
             *
             * @attribute recordtypeid
             * @type String
             * @default null
             */
            recordtypeid: {
                type: String,
                value: null
            },

            /**
             * (Optional) Id of the record for which layout has to be fetched. Required if "hasrecordtypes" is true and "recordtypeid" is not provided.
             *
             * @attribute recordid
             * @type String
             * @default null
             */
            recordid: {
                type: String,
                value: null
            },

            /**
             * Returns an object with the complete layout information.
             *
             * @attribute fields
             * @type Object
             * @readOnly
             */
            layout: {
                type: Object,
                readOnly: true,
                notify: true
            }
        },
        observers: [
            "_reset(sobject, hasrecordtypes, recordid, recordtypeid)"
        ],
        _reset: function() {
            if (this.hasrecordtypes || this._sobject != this.sobject) {
                this._sobject = this.sobject;
                this._setLayout(null);
                this.debounce("fetch-layout", this.fetch.bind(this));
            }
        },

        /**
         * Method to manually initiate the fetching of layout information.
         * 
         * @method fetch 
         */
        fetch: function() {
            if (this.layout && !this.hasrecordtypes) return;
            if (this.sobject && typeof this.sobject === 'string') {
                SFDC.launcher
                .then(fetchRecordTypeId.bind(this))
                .then(getLayoutInfo)
                .then(function(layout) {
                    this._setLayout(layout);
                    this.fire('layout-change');
                }.bind(this));
            }
        }
    });

}).call(this, SFDC);