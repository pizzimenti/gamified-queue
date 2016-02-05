describe('Issue', function() {
  it('will have a property "name"', function() {
    var testIssue = new Issue("Bob");
    expect(testIssue.name).to.equal("Bob");
  });

  it("will have a property of 'location'", function(){
    var testIssue = new Issue("Bobby", "6f");
    expect(testIssue.location).to.equal("6f");
  });

  it("will have a property 'language'", function() {
    var testIssue = new Issue("Bobby", "6f", "CSS");
    expect(testIssue.language).to.equal('CSS');
  });

  it("will have a property 'description' of problem", function() {
    var testIssue = new Issue("Bobby", "6f", "CSS", "I can't figure out why my loop breaks everything. Help!*^. My <p> is yeah");
    expect(testIssue.description).to.equal("I can't figure out why my loop breaks everything. Help!*^. My <p> is yeah");
  });

  it('will have a property of a broken code "snippet"', function() {    var testIssue = new Issue("Bobby", "6f", "CSS", "I can't figure out why my loop breaks everything. Help!*^. My <p> is yeah", "functionIssue(name, location, language, description) { this.name=name; this.location = location; this.language = language; this.description = description;};")
  expect(testIssue.snippet).to.equal("functionIssue(name, location, language, description) { this.name=name; this.location = location; this.language = language; this.description = description;};");
  });

  it('will have a property of the current date/time', function() {
    var timestamp = Date();
    var testIssue = new Issue("Bobby", "6f", "CSS", "I can't figure out why my loop breaks everything. Help!*^. My <p> is yeah", "snippet",timestamp);
    expect(testIssue.timestamp).to.equal(timestamp);
  });

  it('will have a property of resolved', function() {
    var testIssue = new Issue();
    expect(testIssue.resolved).to.equal(false);
  });

  it('will change the value of resolved to true at the appropriate time', function() {
    var testIssue = new Issue();
    testIssue.resolve();
    expect(testIssue.resolved).to.equal(true);
  });

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

  it('will have a property that is collection of resolved issues', function() {
      var testQueue = new Queue();
      expect(testQueue.resolved).to.eql([]);
  });

  it('will move resolved issues to resolved queue collection and remove from queue issues collection', function() {
    var testIssue = new Issue();
    var testIssue2 = new Issue();
    testIssue2.name = "foo";
    var testIssue3 = new Issue();
    var testQueue = new Queue();
    testQueue.addIssue(testIssue);
    testQueue.addIssue(testIssue2);
    testQueue.addIssue(testIssue3);
    testQueue.resolveIssue(testIssue2.name);
    expect(testQueue.issues).to.eql([testIssue, testIssue3]);
    expect(testQueue.resolved).to.eql([testIssue2]);
  });

});
