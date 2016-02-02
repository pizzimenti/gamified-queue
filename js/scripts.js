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
  //  $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

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
