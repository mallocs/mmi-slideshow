/*!
 * mallocs slider v0.0
 *
 * Copyright 2014 Marcus Ulrich 
 * Released under the MIT license.
 *
 */

;(function( $ ) {

$.widget("mmi.slideshow", {
    version: "0.0",
    options: {
        carousel: '.carousel',            // Selector for carousel element.
        slides: '.slide',                      // Selector for carousel slides.

        startSlide: 0,                        // Starting slide.
        buffer: 3,                             // Number of extra slides to buffer.
        navigation: true,
        previousText: '&lang;',         // Text for previous slide button.
        nextText: '&rang;',               // Text for next slide button.
        loop: true,                           // Slides run in a loop.

        // callbacks
        start: null,
        stop: null
    },
    _create: function() { 
        this.carousel = this.element.children(this.options.carousel);
        this.slides = this.carousel.children(this.options.slides);
        this.currentSlideNumber = parseInt(this.options.startSlide, 10);
        this.count = this.slides.length;
        this.scrollable = true;
        this.carouselWidth = this._getSlideFromNumber(this.currentSlideNumber).find("img").width();

        this._createWrapper();
        this._createNavigation();
        this._createCaption();
        this.setCurrentSlideNumber(this.currentSlideNumber);
    },

    _createWrapper: function() {
        this.wrapper = this.carousel.wrap('<div style="position:relative;"></div>').parent();
        this.wrapper.css({
            "width": this.carouselWidth + "px"
        });
    },

    _createNavigation: function() {
        var widget = this;
        this.$previous = $('<a href="#" class="slideshow-previous slideshow-navigation" data-slides="previous">' + this.options.previousText + '</a>');
        this.$next = $('<a href="#" class="slideshow-next slideshow-navigation" data-slides="next">' + this.options.nextText + '</a>');
        this.wrapper.append(this.$next, this.$previous);

        this._on(this.$next, {
            click: "next"
        });
        this._on(this.$previous, {
            click: "previous"
        });
    },

    _createCaption: function() {
        this.$caption = $('<div class="slideshow-caption"></a>');
        this.wrapper.append(this.$caption);
    },

    _getSlideFromNumber: function(slideNumber) {
        return $(this.slides[ parseInt(slideNumber, 10) ]);
    },

    next: function(event) {
        var slideNumber = this.currentSlideNumber + 1;
        if(slideNumber >= this.count) {
            if(this.options.loop) {
                slideNumber = 0;
            } else {
                return;
            }
        }
        this.setCurrentSlideNumber(slideNumber);
    },

    previous: function(event) {
        var slideNumber = this.currentSlideNumber - 1;
        if(slideNumber < 0) {
            if(this.options.loop) {
                slideNumber = this.count - 1;
            } else {
                return;
            }
        }
        this.setCurrentSlideNumber(slideNumber);
    },

    showNavigation: function() {
        this.$next.show();
        this.$previous.show();
    },

    hideNavigation: function() {
        this.$next.hide();
        this.$previous.hide();
    },

    setCaption: function(text) {
        text = text ? text : "&nbsp;";
        if (typeof this.$caption !== "undefined" ) {
            this.$caption.html('<p>' + text + '</p>');
        }
    },

    showCaption: function() {
        this.$caption.show();
    },

    hideCaption: function() {
        this.$caption.hide();
    },

    _bufferSlides: function(count) {
        var widget = this;
        this.slides.slice( this.currentSlideNumber, this.currentSlideNumber + count).each(function(index, el) {
            widget._loadSlide.call(widget, $(el));
        });
    },

    //needs to do transition stuff.
    setCurrentSlideNumber: function(slideNumber) {
        var slide = this._getSlideFromNumber(slideNumber);
        var slideTarget = $(slide.children()[0]);
        if(typeof this.currentSlide !== "undefined") {
            this.currentSlide.hide();
        }
//TODO optional resize wrapper        this.carouselWidth = this.currentSlide.find("img").width();

        slide.show();
        this.setCaption(slideTarget.data("caption"));
        this.currentSlide = slide;
        this.currentSlideNumber = slideNumber;
        this.slides.not(slide).hide();  // Make sure we only show the current slide.
        this._bufferSlides( parseInt(this.options.buffer, 10) );
    },

    _loadSlide: function(slide) {
        var slideTarget = $(slide.children()[0]);
        if (slideTarget.is("img")) {
            this._loadImage(slideTarget);
        }
    },

    _loadImage: function(image) {
        if (image.attr("src") === undefined && image.data("src") !== undefined) {
            image.attr("src", image.data("src"));
        }
    },

    _setOption: function( key, value ) {
        this._super( key, value );

        if (key === "controls") {
            value ? this.showNavigation() : this.hideNavigation();
        }
        if (key === "captions") {
            value ? this.showCaption() : this.hideCaption();
        }

    },

    _destroy: function() {
    }

/**
Functions needed

_createPaging
_createPagingFromSprite

_setFirstSlide
_setPreLoadCount
_setPauseOnHover
_setShowNav
_setHideNav
_setShowCaption
_setHideCaption
_setShuffle
_setLoop
_setPlay
_setTransition
_setTransitionSpeed

_checkImgHasLoaded
_loadImg
_goToSlide
_showNav
_hideNav
_makePicUrl
_getPicUrl

addSlide
addSlides
play
stop
next

**/



});

}( jQuery ));