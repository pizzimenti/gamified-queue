function Issue(name, location, language, description, snippet) {
  this.name = name;
  this.location = location;
  this.language = language;
  this.description = description;
  this.snippet = snippet;
  this.waitTime = 0;
};

Issue.prototype.waiter = function() {
  setTimeout(this.timer(), 10000);
}

Issue.prototype.timer = function() {
  this.waitTime+=1;
};
