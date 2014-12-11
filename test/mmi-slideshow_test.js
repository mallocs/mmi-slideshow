(function ($) {
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
        setup: function () {
            this.ssObj = $(".mmi-slideshow").slideshow().data("mmi-slideshow");
        }
    });

    test('check setup', function () {
        expect(5);
        ok(this.ssObj.count > 0, "Check that slides are found");
        ok(this.ssObj.$pagination.length > 0, "Check that pagination is created");
        strictEqual(this.ssObj.$pagination.children().length, this.ssObj.count, "Check that there's a link for every slide");
        ok(this.ssObj.$next.length > 0, "Check that next link is created");
        ok(this.ssObj.$previous.length > 0, "Check that previous link is created");
    });
    
    module('Options', {
        // This will run before each test in this module.
        setup: function () {
            //nothing for now.
        }
    });

    test('check startSlide option', function () {
        var startSlideNumber = 2;
        var ssObj = $(".mmi-slideshow").slideshow({startSlide: startSlideNumber}).data("mmi-slideshow");
        strictEqual(ssObj.currentSlideNumber, startSlideNumber, "Check start slide number");
    });
     
    test('check buffer option', function () {
        var bufferCount = 3;
        var ssObj = $(".mmi-slideshow").slideshow({buffer: bufferCount, startSlide: 1}).data("mmi-slideshow");
        for (var i=1; i <= bufferCount; i++) {
            var slideImg = $(ssObj.slides[i]).children()[0];
            ok($(ssObj.slides[i]).attr("slideIsLoaded"), "Checking slide " + i + " is buffered");
            ok($(slideImg).attr("src"), "Checking slide " + i + " has the image src set");
        }
    });
    
    test('check pagination option: true', function () {
        expect(2);
        var ssObj = $(".mmi-slideshow").slideshow({pagination: true}).data("mmi-slideshow");
        var slideCount = ssObj.count;
        strictEqual(ssObj.$pagination.length, 1, "Check that pagination is created");
        strictEqual(ssObj.$pagination.children().length, slideCount, "Check that pagination has an item for each slide");
    });
    
    test('check pagination option: false', function () {
        var ssObj = $(".mmi-slideshow").slideshow({pagination: false}).data("mmi-slideshow");
        strictEqual(ssObj.$pagination, undefined, "Check pagination is not created");
    });
    
    test('check navigation option: true', function () {
        expect(4);
        var ssObj = $(".mmi-slideshow").slideshow({navigation: true}).data("mmi-slideshow");
        strictEqual(ssObj.$next.length, 1, "Check next element HTML is created");
        strictEqual(ssObj.$previous.length, 1, "Check previous element HTML is created");
        
        ok(ssObj.$next.is("span.mmi-navigation.mmi-next.mmi-icon-next"), "Check that next is a span that has the correct classes");
        ok(ssObj.$previous.is("span.mmi-navigation.mmi-previous.mmi-icon-previous"), "Check that previous is a span that has the correct classes");
    });    

    test('check navigation option: false', function () {
        expect(2);
        var ssObj = $(".mmi-slideshow").slideshow({navigation: false}).data("mmi-slideshow");
        strictEqual(ssObj.$next, undefined, "Check next element HTML is not created");
        strictEqual(ssObj.$previous, undefined, "Check previous element HTML is not created");
    });  
    
    module('Public API', {
    });

    //the current slide should be set before the animation is done, so this shouldn't be async.
    test(".setCurrentSlide()", function () {
        expect(3);
        var ssObj = $(".mmi-slideshow").slideshow({startSlide: 1}).data("mmi-slideshow");

        var lastSlide = ssObj.count;
        var randomSlide = Math.floor(Math.random() * lastSlide + 1);

        strictEqual(ssObj.currentSlideNumber, 1, "Check going to the first slide");

        ssObj.setCurrentSlide(randomSlide);
        strictEqual(ssObj.currentSlideNumber, randomSlide, "Check going to a random slide number " + randomSlide);

        ssObj.setCurrentSlide(lastSlide);
        strictEqual(ssObj.currentSlideNumber, lastSlide, "Check going to the last slide");
    });

    test(".next() loop:true", function () {
        expect(2);
        var ssObj = $(".mmi-slideshow").slideshow({loop: true, startSlide: 1}).data("mmi-slideshow");
        var slideCount = ssObj.count;
        
        var initialSlideNumber = ssObj.currentSlideNumber;
        ssObj.next();
        strictEqual(ssObj.currentSlideNumber, initialSlideNumber + 1, "Check that next() works");
        
        ssObj.setCurrentSlide(slideCount);
        ssObj.next();
        strictEqual(ssObj.currentSlideNumber, 1, "Check that next() loops to the first slide");
    });
    
    test(".next() loop:false", function () {
        var ssObj = $(".mmi-slideshow").slideshow({loop: false}).data("mmi-slideshow");
        var slideCount = ssObj.count;
        
        ssObj.setCurrentSlide(slideCount);
        ssObj.next();
        strictEqual(ssObj.currentSlideNumber, slideCount, "Check that next() does not loop");
    });

    test(".previous() loop:true", function () {
        expect(2);
        var ssObj = $(".mmi-slideshow").slideshow({loop: true, startSlide: 2}).data("mmi-slideshow");
        var slideCount = ssObj.count;
        
        var initialSlideNumber = ssObj.currentSlideNumber;
        ssObj.previous();
        strictEqual(ssObj.currentSlideNumber, initialSlideNumber - 1, "Check that previous() works");
        
        ssObj.previous();
        strictEqual(ssObj.currentSlideNumber, slideCount, "Check that previous() loops to the last slide");
    });
    
    test(".previous() loop:false", function () {
        var ssObj = $(".mmi-slideshow").slideshow({loop: false, startSlide: 1}).data("mmi-slideshow");
        
        ssObj.previous();
        strictEqual(ssObj.currentSlideNumber, 1, "Check that previous() does not loop to the last slide");
    });

    test(".setCaption()", function () {
        var ssObj = $(".mmi-slideshow").slideshow({captions: true}).data("mmi-slideshow");
        var caption = "Some caption";
        ssObj.setCaption(caption);
        strictEqual(ssObj.$caption.html(), "<p>" + caption + "</p>", "Check that the caption is created");
    });


}(jQuery));