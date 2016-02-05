function Issue(name, location, language, description, snippet, timestamp) {
  this.name = name;
  this.location = location;
  this.language = language;
  this.description = description;
  this.snippet = snippet;
  this.timestamp = timestamp;
  this.status = "";
  this.peerHelper = "";
  this.resolved = false;
};

Issue.prototype.resolve = function() {
  this.resolved = true;
}

function Queue() {
  this.issues = [];
  this.resolved = [];
};

Queue.prototype.addIssue = function(issue) {
  this.issues.push(issue);
};


Queue.prototype.resolveIssue = function(name) {
  var issues = this.issues;
  var resolved = this.resolved;
  for (var i = 0; i < issues.length; i++) {
     if (issues[i].name === name) {
      issues[i].resolved === true;
      var index = issues.indexOf(issues[i])
      var resolvedIssue = issues.slice(index, index+1);
      issues.splice(index, 1 );
      resolved.push(resolvedIssue[0]);
      console.log(resolved);
     }
  }
}

var DrawQueue = function() {
  var dbQueue = [];
  $('#queue-output').empty();
  for (var index=0; index < localStorage.length; index++) {
    dbQueue.push(JSON.parse(localStorage.getItem('queueStorage'+index)));
  }

  dbQueue.forEach(function(issue) {
     dbQueue[dbQueue.indexOf(issue)].timestamp = new Date(dbQueue[dbQueue.indexOf(issue)].timestamp);
  });

  dbQueue.forEach(function(issue) {
    $('#queue-output').append(
      '<tr id="table'+dbQueue.indexOf(issue)+'">'+
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
                    '<button type="button" id="help'+ dbQueue.indexOf(issue)+'" class="btn btn-md btn-danger help">I can help!</button>'+
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

  dbQueue.sort(compareTimestamps);
  function compareTimestamps(a, b) {
    return a.timestamp - b.timestamp;
  }

  var interval = setInterval(function() { timer() }, 100);
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

  dbQueue.forEach(function(issue){
    if (issue.status === "peer-help"){
        $("#table"+ dbQueue.indexOf(issue)).css('background-color', '#98b889');
      }
    });


  dbQueue.forEach(function(issue){
    $("#help"+ dbQueue.indexOf(issue)).click(function(){
      issue.status = "peer-help";
      var peerHelper = prompt("Your name?");
      issue.peerHelper = peerHelper;
      dbQueue.forEach(function(issue) {
        localStorage.setItem('queueStorage' + dbQueue.indexOf(issue), JSON.stringify(issue));
      });
      $("#table"+ dbQueue.indexOf(issue)).css('background-color', '#98b889');

    });
  });

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
      localStorage.setItem('queueStorage' + localStorage.length, JSON.stringify(issue));
    });

    newQueue.issues = [];

    DrawQueue();

  }); //end of Submit function

  $('button.purge').click(function() {
    localStorage.clear();
    DrawQueue();
    location.href="index.html";
  });

});  //end of Document Ready function
