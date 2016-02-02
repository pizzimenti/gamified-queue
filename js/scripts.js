function Issue(name, location, language, description, snippet, timestamp) {
  this.name = name;
  this.location = location;
  this.language = language;
  this.description = description;
  this.snippet = snippet;
  this.timestamp = timestamp;
};

function Queue() {
  this.issues = [];
}

Queue.prototype.addIssue = function(issue) {
  this.issues.push(issue);
}

$(document).ready(function(){

  var newQueue = new Queue();

  $("form#issue-form").submit(function(event) {
    event.preventDefault();

    var name = $("input#pair-name").val();
    var language = $("select#language").val();
    var location = $("input#location").val();
    var description = $("textarea#description").val();
    var snippet = $("textarea#snippet").val();
    var timestamp = Date();

    var newIssue = new Issue(name, location, language, description, snippet, timestamp);
    newQueue.addIssue(newIssue);

    $('#queue-output').empty();
    newQueue.issues.forEach(function(index) {


      $('#queue-output').append('<tr><td><div data-toggle="modal" data-target="#myModal'+newQueue.issues.indexOf(index) + '">'+index.name+'</div><div class="modal fade" id="myModal'+ newQueue.issues.indexOf(index) +'" role="dialog"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Queue</h4></div><div class="modal-body"><p>'+index.name+'</p><p>'+index.location+'</p><p>'+index.language+'</p><p>'+index.description+'</p><p><xmp>'+index.snippet+'</xmp></p></div></div></div></div></td><td><div data-toggle="modal" data-target="#myModal'+ newQueue.issues.indexOf(index) + '">'+index.language+'</div></td><td class="waitTime"><div data-toggle="modal" data-target="#myModal'+newQueue.issues.indexOf(index) + '">0 minutes</div></td></tr>');



    });

//
//     var queueDiv = $('#queue-output');
//     var td = queueDiv.find("td.waitTime");
//     td.each(function() {
//     var interval = setInterval(function() { timer() }, 1000);
//      function timer() {
// debugger;
//       // td.last().text(waitTime + " minutes");
//     }
  // });

    // $("ol#queue-output").empty();
    // newQueue.issues.forEach(function(index) {
    //   console.log(index.name);
    // $("ol#queue-output").append("<li><span class='name'>" + index.name + "</span></li>");
    // })
  });
});
