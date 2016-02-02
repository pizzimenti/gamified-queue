describe('Issue', function() {
  it('should have a property "name"', function() {
    var testIssue = new Issue("Bob");
    expect(testIssue.name).to.equal("Bob");
  });

  it("should have a property of loction", function(){
    var testIssue = new Issue("Bobby", "6f");
    expect(testIssue.location).to.equal("6f");
  });

  it("should have a property 'language'", function() {
    var testIssue = new Issue("Bobby", "6f", "CSS");
    expect(testIssue.language).to.equal('CSS');
  });

  it("should have a property 'description' of problem", function() {
    var testIssue = new Issue("Bobby", "6f", "CSS", "I can't figure out why my loop breaks everything. Help!*^. My <p> is yeah");
    expect(testIssue.description).to.equal("I can't figure out why my loop breaks everything. Help!*^. My <p> is yeah");
  });

  it('should have a property of a broken code snippet', function() {    var testIssue = new Issue("Bobby", "6f", "CSS", "I can't figure out why my loop breaks everything. Help!*^. My <p> is yeah", "functionIssue(name, location, language, description) { this.name=name; this.location = location; this.language = language; this.description = description;};")
  expect(testIssue.snippet).to.equal("functionIssue(name, location, language, description) { this.name=name; this.location = location; this.language = language; this.description = description;};");
  });

  it('should have a property of the current date/time', function() {
    var timestamp = Date();
    var testIssue = new Issue("Bobby", "6f", "CSS", "I can't figure out why my loop breaks everything. Help!*^. My <p> is yeah", "snippet",timestamp);
    expect(testIssue.timestamp).to.equal(timestamp);
  });

  // it("should update wait time with a dynamic timer", function() {
  //   var testIssue = new Issue("Bobby", "6f", "CSS", "I can't figure out why my loop breaks everything. Help!*^. My <p> is yeah", "snippet");
  //   testIssue.waiter(testIssue);
  //   expect(testIssue.waitTime).to.equal(0);
  // });
});

describe('Queue', function() {
  it("will have a collection to hold issues", function() {
    var testQueue = new Queue();
    expect(testQueue.issues).to.eql([]);
  });

  it("will store objects created by contructor Issue in the collection,", function(){
        var testIssue = new Issue();
        var testQueue = new Queue();
        testQueue.addIssue(testIssue);
        expect(testQueue.issues).to.eql([testIssue]);
  });
});
