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

  module('Public API', {
    // This will run before each test in this module.
    setup: function() {
      this.ssObj = $(".mmi-slideshow").slideshow().data("mmi-slideshow");
    }
  });
  
    test(".setCurrentSlide", function() {
        expect(3);

        this.ssObj.setCurrentSlide(0);
        strictEqual(this.ssObj.currentSlideNumber, 0);
        
        var slideCount = this.ssObj.count;
        var randomSlide = Math.floor(Math.random() * slideCount);
        this.ssObj.setCurrentSlide(randomSlide);
        strictEqual(this.ssObj.currentSlideNumber, randomSlide);
        
        var lastSlide = this.ssObj.count - 1;
        this.ssObj.setCurrentSlide(this.ssObj.count - 1);
        strictEqual(this.ssObj.currentSlideNumber, lastSlide);

    });
  /*
  test(".next()", function() {
    var initialSlideNumber = this.ssObj.currentSlideNumber;
    this.ssObj.next();
    strictEqual(this.ssObj.currentSlideNumber, initalSlideNumber + 1);
  });
    
  test(".previous()", function() {
    var initialSlideNumber = this.ssObj.currentSlideNumber;
    this.ssObj.next();
    strictEqual(this.ssObj.currentSlideNumber, initalSlideNumber - 1);
  });
  */
}(jQuery));
