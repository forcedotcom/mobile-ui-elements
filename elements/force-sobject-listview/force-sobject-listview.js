var query='';
  // Call the List View API to get the results (also includes column definitions)
    Polymer('force-ui-listview', {
     observe: {
      sobject: 'ready'
      },
     ready: function() { 
      this.query='';
      this.query = '/services/data/v32.0/sobjects/' + this.sobject + '/listviews/';
      },
     updateListView: function() { 
       this.sobject=sobject;
     }
  }); 
   $.ajax({
      url : query, 
      headers : { 'Authorization' : 'Bearer {!$Api.Session_ID}' },
      datatype : 'json', 
      success : function(response) {                   
        // Clear current List View info
        $('#listview').empty();
        $.each(response.listviews, function(index, column) {
          $('#listview').append($('<li>' + column.label + '</li>'));
        });
     }
  }); 
