// Call the List View API to get the results (also includes column definitions)
Polymer('force-sobject-listview', {
  observe: {
    sobject: 'updateListView'
  },
  updateListView: function() {
    var that = this;
    that.listviews = null;
    var query = '/services/data/v32.0/sobjects/' + this.sobject + '/listviews/';
    var success = function(response) {                   
      that.listviews = response.listviews;
      console.log(that.listviews);
    };
    SFDC.launcher.then(function(){
         Force.forcetkClient.impl.ajax(query, success);
    });
  }
});