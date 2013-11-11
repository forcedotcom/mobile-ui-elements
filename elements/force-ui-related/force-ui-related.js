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

        $.when(view.whenRelatedLists())
        .then(generateRelatedListConfigs);
    }



    var generateQuery = function(recordid, related, describeResult) {
        var rel = _.findWhere(describeResult.childRelationships, {relationshipName : related.name});
        var fieldList = _.union(_.pluck(related.columns, "name"), [related.sobject + '.Id']);
        related.soql = "SELECT " + fieldList.join(",")
                + " FROM " + related.sobject
                + " WHERE " + rel.field + " = '" + recordid + "'"
                + " ORDER BY " + related.sort[0].column + (related.sort[0].ascending ? ' asc' : ' desc')
                + " LIMIT " + related.limitRows;

        var wrapFieldName = function(name) {
            return name.replace(/\./, ':');
        }
        related.smartSql = "SELECT " + _.map(fieldList, wrapFieldName).join(",")
                + " FROM {" + related.sobject + "}"
                + " WHERE {" + related.sobject + ":" + rel.field + "} = '" + recordid + "'"
                + " ORDER BY {" + related.sobject + ":" + related.sort[0].column + (related.sort[0].ascending ? '} asc' : '} desc')
                + " LIMIT " + related.limitRows;

        _.extend(related, {
            get query() {
                return (!SFDC.isOnline() && navigator.smartstore) ? related.smartSql : related.soql;
            },
            get querytype() {
                return (!SFDC.isOnline() && navigator.smartstore) ? "cache" : "soql";
            }
        })
    }

}).call(this, jQuery, window.SFDC);