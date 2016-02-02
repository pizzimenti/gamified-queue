function Issue(name, location, language, description, snippet) {
  this.name = name;
  this.location = location;
  this.language = language;
  this.description = description;
  this.snippet = snippet;
  this.waitTime = 0;
};

// Issue.prototype.waiter = function() {
//   var waitTime = 0;
//
//   var timer = function() {
//     waitTime += 1;
//   }
//   this.waitTime = setInterval(function() {
//     timer()}, 1000);
//     console.log(this.waitTime);
//   // var stopTimer = function() {
//   //   clearInterval(interval);
//   // }
//   }


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
    newQueue.addIssue(newIssue);

    $("ol#queue-output").empty();
    newQueue.issues.forEach(function(index) {
      console.log(index.name);
    $("ol#queue-output").append("<li><span class='name'>" + index.name + "</span></li>");
    })



  //  $("input#new-first-name").val("");
  //  $("input#new-last-name").val("");

//     $(".contact").last().click(function() {
//       $("#show-contact").show();
//       $("#show-contact h2").text(newContact.fullName());
//       $(".first-name").text(newContact.firstName);
//       $(".last-name").text(newContact.lastName);
//     });
  });
});
