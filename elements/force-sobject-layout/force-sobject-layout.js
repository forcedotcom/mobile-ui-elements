(function(SFDC) {

    "use strict";

    var getLayoutInfo = function(sobject, recordtypeid) {
        return SFDC.getSObjectType(sobject)
            .describeLayout(recordtypeid);
    }

    Polymer('force-sobject-layout', {
        sobject: null,
        recordtypeid: null,
        //applyAuthorStyles: true,
        //resetStyleInheritance: true,
        whenDetailSections: function() {
            return getLayoutInfo(this.sobject, this.recordtypeid)
                .then(function(layout) {
                    return layout.detailLayoutSections;
                });
        },
        whenEditSections: function() {
            return getLayoutInfo(this.sobject, this.recordtypeid)
                .then(function(layout) {
                return layout.editLayoutSections;
            });
        },
        whenRelatedLists: function() {
            return getLayoutInfo(this.sobject, this.recordtypeid)
                .then(function(layout) {
                return layout.relatedLists;
            });
        }
    });

}).call(this, SFDC);