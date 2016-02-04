function Issue(name, location, language, description, snippet, timestamp) {
  this.name = name;
  this.location = location;
  this.language = language;
  this.description = description;
  this.snippet = snippet;
  this.timestamp = timestamp;
  this.resolved = false;
};

function Queue() {
  this.issues = [];
};

Queue.prototype.addIssue = function(issue) {
  this.issues.push(issue);
};

Queue.prototype.refresh = function() {
  this.issues.sort(compareTimestamps);
  function compareTimestamps(a, b) {
    return a.timestamp - b.timestamp;
  }
};
  
var DrawQueue = function() {
  var dbQueue = [];
  $('#queue-output').empty();

  for (var index=0; index < localStorage.length; index++) {
    dbQueue.push(JSON.parse(localStorage.getItem('queueStorage'+index)));
  }

  dbQueue.forEach(function(issue) {
    $('#queue-output').append(
      '<tr>'+
        '<td>'+
          '<div data-toggle="modal" data-target="#myModal'+dbQueue.indexOf(issue) + '">'
            +issue.name+
          '</div>'+
          '<div class="modal fade" id="myModal'+ dbQueue.indexOf(issue) +'" role="dialog">'+
            '<div class="modal-dialog modal-lg">'+
              '<div class="modal-content">'+
                '<div class="modal-header">'+
                '<h4 class="modal-title">Help Ticket Details:</h4>'+
                  '<h4 class="modal-title">'+issue.name+'</h4>'+
                '</div>'+
                '<div class="modal-body">'+
                  '<p>Location:<span class="modal-data">'+issue.location+'</span></p>'+
                  '<p>Language:<span class="modal-data">'+issue.language+'</span></p>'+
                  '<p>Description:<span class="modal-data desc">'+issue.description+'</span></p>'+
                  '<p>Code Snippet:<span class="modal-data"><xmp>'+issue.snippet+'</xmp></span></p>'+
                '</div>'+
                '<div class="modal-footer">'+
                  '<button type="button" class="btn btn-md btn-primary"'+
                  'data-dismiss="modal">Close</button>'+
                  '<button type="button" class="btn btn-md btn-danger help">I can help!</button>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</td>'+
        '<td>'+

          '<div data-toggle="modal" data-target="#myModal'+dbQueue.indexOf(issue) + '">'
            +issue.location+
          '</div>'+
        '</td>'+
        '<td>'+
          '<div data-toggle="modal" data-target="#myModal'+ dbQueue.indexOf(issue) + '">'
            +issue.language+
          '</div>'+
        '</td>'+
        '<td data-toggle="modal" data-target="#myModal'+dbQueue.indexOf(issue) + '" class="waitTime'+ dbQueue.indexOf(issue) +
            '">0 minutes'+
        '</td>'+
      '</tr>');
    });


  var interval = setInterval(function() { timer() }, 1000);
  function timer() {
    currentTime = new Date();

    dbQueue.forEach(function(issue) {

      waitTime = currentTime - issue.timestamp;
      var queueDiv = $('#queue-output');
      var td = queueDiv.find("td.waitTime"+dbQueue.indexOf(issue));
      td.each(function() {
        $(this).text(parseInt(waitTime/60000) + " minutes");
      });
    });
  }
}  //end of DrawQueue function

$(document).ready(function(){

  var newQueue = new Queue();

  if (localStorage !== null) {
    DrawQueue();
  }

  $("form#issue-form").submit(function(event) {
    event.preventDefault();

    var name = $("input#pair-name").val();
    var language = $("select#language").val();
      var location = $("input#location").val();
      var description = $("textarea#description").val();
      var snippet = $("textarea#snippet").val();
    var timestamp = new Date();

    var newIssue = new Issue(name, location, language, description, snippet, timestamp);
    newQueue.addIssue(newIssue);
    var currentTime;
    var waitTime;


  newQueue.issues.forEach(function(issue) {
    localStorage.setItem('queueStorage' + newQueue.issues.indexOf(issue), JSON.stringify(issue));
  });

  DrawQueue();

  }); //end of Submit function

  $('button.refresh').click(function() {
    newQueue.refresh();
  });

  $('button.purge').click(function() {
    localStorage.clear();
    DrawQueue();
  });

});  //end of Document Ready function
