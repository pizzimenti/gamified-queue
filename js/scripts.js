function Issue(name, location, language, description, snippet) {
  this.name = name;
  this.location = location;
  this.language = language;
  this.description = description;
  this.snippet = snippet;
  this.waitTime = 0;
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
    var location = $("input#location").val();
    var name = $("input#pair-name").val();
    var language = $("select#language").val();
    var description = $("textarea#description").val();
    var snippet = $("textarea#snippet").val();

    var newIssue = new Issue(name, location, language, description, snippet);
    var waitTime = 0;
    $('tr.help-data').append('<td>O minutes</td>');
    var interval = setInterval(function() { timer() }, 60000);
     function timer() {
      waitTime++;
      $('td').last().text(waitTime + " minutes");
    }

    // $("ol#queue-output").empty();
    // newQueue.issues.forEach(function(index) {
    //   console.log(index.name);
    // $("ol#queue-output").append("<li><span class='name'>" + index.name + "</span></li>");
    // })
  });
});
