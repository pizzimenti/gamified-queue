function Issue(name, location, language, description, snippet) {
  this.name = name;
  this.location = location;
  this.language = language;
  this.description = description;
  this.snippet = snippet;
  this.waitTime = 0;
};

Issue.prototype.waiter = function(obj) {
  var interval = setInterval(function() {timer()}, 1000);
  var timer = function() {
    obj.waitTime+=1;
    if (obj.waitTime === 5) {
      stopTimer();
    }
  }
  var stopTimer = function() {
    clearInterval(interval);
  }
}


function Queue() {
  this.issues = [];
}

Queue.prototype.addIssue = function(issue) {
  this.issues.push(issue);
}

$(document).ready(function(){
  $("form#submit-column").submit(function(event) {
    event.preventDefault();

    var name = $("input#pair-name").val();
    var location = $("input#location").val();
    var name = $("input#pair-name").val();
    var language = $("select#language").val();
    var description = $("textarea#description").val();
    var snippet = $("textarea#snippet").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName);

  //  $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

  //  $("input#new-first-name").val("");
  //  $("input#new-last-name").val("");

//     $(".contact").last().click(function() {
//       $("#show-contact").show();
//       $("#show-contact h2").text(newContact.fullName());
//       $(".first-name").text(newContact.firstName);
//       $(".last-name").text(newContact.lastName);
//     });
//   });
// });
