(function($, SFDC) {

    Polymer('force-sobject-relatedlists', {
        relatedLists: [],
        relationshipsChanged: function() {
            // Execute generateRelatedLists after current process ends to allow processing all change handlers on parent.
            setTimeout(this.generateRelatedLists.bind(this), 0);
        },
        ready: function() {
            this.$.sobject_layout.addEventListener('layout-change', this.generateRelatedLists.bind(this));
        },
        generateRelatedLists: function(ev) {
            this.relatedLists = [];
            fetchRelatedLists(this);
        }
    });

    var fetchRelatedLists = function(view) {
        var relsToKeep = typeof view.relationships === 'string'
                            ? view.relationships.trim().split(/\s+/) : null;
        var parentType = SFDC.getSObjectType(view.sobject);

        var addConfigIfAllowed = function(related, childInfo, parentDescribe) {
            if (childInfo.objectDescribe.queryable) {
                view.relatedLists.push(related);
                generateQuery(view.recordid, related, parentDescribe);
            }
        }

        var generateRelatedListConfigs = function(relatedListInfo) {
            for (var idx in relatedListInfo) {
                var related = _.extend({}, relatedListInfo[idx]);
                if (!relsToKeep || _.contains(related.name)) {
                    var childType = SFDC.getSObjectType(related.sobject);
                    $.when(related, childType.getMetadata(), parentType.describe())
                    .then(addConfigIfAllowed);
                }
            }
        }

        // Generate related lists if the layout has been fetched
        if (view.recordid && view.$.sobject_layout.layout) {
            generateRelatedListConfigs(view.$.sobject_layout.layout.relatedLists);
        }
    }



    var generateQuery = function(recordid, related, describeResult) {
        var rel = _.findWhere(describeResult.childRelationships, {relationshipName : related.name});
        // Column names are used for generating the soql query
        var colNameList = _.union(_.pluck(related.columns, "name"), ['Id']);
        related.soql = "SELECT " + colNameList.join(",")
                + " FROM " + related.sobject
                + " WHERE " + rel.field + " = '" + recordid + "'"
                + " ORDER BY " + related.sort[0].column + (related.sort[0].ascending ? ' asc' : ' desc')
                + " LIMIT " + related.limitRows;

        // the column field value should be used for generating the smartsql
        var fieldList = _.union(_.pluck(related.columns, "field"), [related.sobject + '.Id']);
        var wrapFieldName = function(name) {
            return "{" + name.replace(/\./, ':') + "}";
        }
        related.smartSql = "SELECT " + _.map(fieldList, wrapFieldName).join(",")
                + " FROM {" + related.sobject + "}"
                + " WHERE {" + related.sobject + ":" + rel.field + "} = '" + recordid + "'"
                + " ORDER BY {" + related.sobject + ":" + related.sort[0].column + (related.sort[0].ascending ? '} asc' : '} desc')
                + " LIMIT " + related.limitRows;

        _.extend(related, {
            get query() {
                if (!SFDC.isOnline() && navigator.smartstore)
                    return navigator.smartstore.buildSmartQuerySpec(related.smartSql);
                else return related.soql;
            },
            get querytype() {
                return (!SFDC.isOnline() && navigator.smartstore) ? "cache" : "soql";
            }
        })
    }

}).call(this, jQuery, window.SFDC);