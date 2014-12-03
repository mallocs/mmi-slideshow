(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('Setup', {
    // This will run before each test in this module.
    setup: function() {
      this.ssObj = $(".mmi-slideshow").slideshow().data("mmi-slideshow");
    }
  });
    
  test('check setup', function() {
    expect(5);
    ok(this.ssObj.count > 0, "Check that slides are found");
    ok(this.ssObj.$pagination.length > 0, "Check that pagination is created");
    ok(this.ssObj.$pagination.children().length === this.ssObj.count, "Check that there's a link for every slide");  
    ok(this.ssObj.$next.length > 0, "Check that next link is created");
    ok(this.ssObj.$previous.length > 0, "Check that previous link is created");
  });

/*
  test('is chainable', function() {
    expect(1);
    // Not a bad test to run on collection methods.
    strictEqual(this.elems.awesome(), this.elems, 'should be chainable');
  });

  test('is awesome', function() {
    expect(1);
    strictEqual(this.elems.awesome().text(), 'awesome0awesome1awesome2', 'should be awesome');
  });

  module('jQuery.awesome');

  test('is awesome', function() {
    expect(2);
    strictEqual($.awesome(), 'awesome.', 'should be awesome');
    strictEqual($.awesome({punctuation: '!'}), 'awesome!', 'should be thoroughly awesome');
  });

  module(':awesome selector', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is awesome', function() {
    expect(1);
    // Use deepEqual & .get() when comparing jQuery objects.
    deepEqual(this.elems.filter(':awesome').get(), this.elems.last().get(), 'knows awesome when it sees it');
  });
*/
}(jQuery));
