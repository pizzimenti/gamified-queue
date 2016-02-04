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


var DrawQueue = function() {


}

$(document).ready(function(){

  var newQueue = new Queue();
  var dbQueue = []

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
    dbQueue = [];

    newQueue.issues.forEach(function(issue) {

      localStorage.setItem('queueStorage' + newQueue.issues.indexOf(issue), JSON.stringify(issue));
    });

    for (index=0; index < localStorage.length; index++) {
      dbQueue.push(JSON.parse(localStorage.getItem('queueStorage'+index)));
    }

    $('#queue-output').empty();

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
                    '<button type="button" class="close" data-dismiss="modal">&times;'+
                    '</button>'+
                    '<h4 class="modal-title">'+issue.name+'</h4>'+
                  '</div>'+
                  '<div class="modal-body">'+
                    '<p>Location:<span class="modal-data">'+issue.location+'</span></p>'+
                    '<p>Language:<span class="modal-data">'+issue.language+'</span></p>'+
                    '<p>Description:<span class="modal-data">'+issue.description+'</span></p>'+
                    '<p>Code Snippet:<span class="modal-data"><xmp>'+issue.snippet+'</xmp></span></p>'+
                  '</div>'+
                '</div>'+
              '</div>'+
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
  });

  // $('button.refresh').click(function() {
  //   var currentTime = new Date();
  //
  //   dbQueue.forEach(function(issue) {
  //     var issue = dbQueue.indexOf(issue)
  //     var waitTime = (currentTime - issue.timestamp)/60000;
  //     if(waitTime > 1) {
  //       var longWait = dbQueue.splice(issue, 1 );
  //       dbQueue.unshift(longWait);
  //       console.log(dbQueue);
  //     }}}}
  //   })
});
