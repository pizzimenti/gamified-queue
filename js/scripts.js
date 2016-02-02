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
    var timestamp = new Date();

    var newIssue = new Issue(name, location, language, description, snippet, timestamp);
    newQueue.addIssue(newIssue);
    var currentTime;
    var waitTime;

    $('#queue-output').empty();
    newQueue.issues.forEach(function(index) {
      $('#queue-output').append('<tr><td>'+index.name+'</td><td>'+index.language+'</td><td class="waitTime'+newQueue.issues.indexOf(index)+'">0 minutes</td></tr>');
    });

    var interval = setInterval(function() { timer() }, 1000);
    function timer() {

      currentTime = new Date();

      newQueue.issues.forEach(function(index) {

        waitTime = currentTime - index.timestamp;
        var queueDiv = $('#queue-output');
        var td = queueDiv.find("td.waitTime"+newQueue.issues.indexOf(index));
        td.each(function() {
          $(this).text(parseInt(waitTime/60000) + " minutes");

        });
      });

    }



    // $("ol#queue-output").empty();
    // newQueue.issues.forEach(function(index) {
    //   console.log(index.name);
    // $("ol#queue-output").append("<li><span class='name'>" + index.name + "</span></li>");
    // })
  });
});
