(function($, SFDC) {

    Polymer('force-ui-related', {
        recordid: null,
        idfield: 'Id',
        hasrecordtypes: false,
        relationships: null,
        //applyAuthorStyles: true,
        //resetStyleInheritance: true,
        relatedLists: [],
        attributeChanged: function(attrName, oldVal, newVal) {
            this.super(arguments);
            this.relatedLists = [];
            fetchRelatedLists(this);
        }
    });

    var fetchRelatedLists = function(view) {
        var relsToKeep = view.relationships ? view.relationships.split(',') : null;
        var sobjectType = SFDC.getSObjectType(view.sobject);
        $.when(view.whenRelatedLists(), sobjectType.describe())
        .then(function(relatedListInfo, describeResult) {
            for (var idx in relatedListInfo) {
                var related = _.extend({}, relatedListInfo[idx]);
                if (!relsToKeep || _.contains(related.name)) {
                    view.relatedLists.push(related);
                    generateQuery(view.recordid, related, describeResult);
                }
            }
        });
    }

    var generateQuery = function(recordid, related, describeResult) {
        var rel = _.findWhere(describeResult.childRelationships, {relationshipName : related.name});
        var fieldList = _.pluck(related.columns, "field");
        fieldList = _.map(fieldList, function(name) {
            return name.substring(name.indexOf('.') + 1);
        });
        related.soql = "SELECT " + fieldList.join(",")
                + " FROM " + related.sobject
                + " WHERE " + rel.field + " = '" + recordid + "'"
                + " ORDER BY " + related.sort[0].column + (related.sort[0].ascending ? ' asc' : ' desc')
                + " LIMIT " + related.limitRows;

        var wrapFieldName = function(name) {
            return "{" + related.sobject + ":" + name + "}";
        }
        related.smartSql = "SELECT " + _.map(fieldList, wrapFieldName).join(",")
                + " FROM {" + related.sobject + "}"
                + " WHERE {" + related.sobject + ":" + rel.field + "} = '" + recordid + "'"
                + " ORDER BY {" + related.sobject + ":" + related.sort[0].column + (related.sort[0].ascending ? '} asc' : '} desc')
                + " LIMIT " + related.limitRows;

        _.extend(related, {
            get query() {
                return (!SFDC.isOnline() && navigator.smartstore) ? this.smartSql : this.soql;
            },
            get querytype() {
                return (!SFDC.isOnline() && navigator.smartstore) ? "cache" : "soql";
            }
        })
    }

}).call(this, jQuery, window.SFDC);