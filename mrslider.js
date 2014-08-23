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
        previousText: '&#10092;',    // Text for previous slide button.
        nextText: '&#10093;',          // Text for next slide button.

        // callbacks
        start: null,
        stop: null
    },
    _create: function() { 
        this.carousel = this.element.children(this.options.carousel);
        this.slides = this.carousel.children(this.options.slides);
        this.currentSlideNumber = parseInt(this.options.startSlide, 10);
        this.currentSlide = $(this.slides[ this.currentSlideNumber ]);
        this.carouselWidth = this.currentSlide.find("img").width();
        this.count = this.slides.length;
        this.scrollable = true;

        this.slides.not(this.currentSlide).css("display", "none");  // Make sure we only show the current slide.

        this._createWrapper();
        this._createNavigation();
        this._createCaption();
        this._bufferSlides( parseInt(this.options.buffer, 10) );
        this.showSlide(this.currentSlide);

    },

    _createWrapper: function() {
        this.wrapper = this.carousel.wrap('<div style="position:relative;"></div>').parent();
        this.wrapper.css({
            "width": this.carouselWidth + "px"
        });
    },

    _createNavigation: function() {
        this.previous = $('<a href="#" class="slideshow-previous slideshow-navigation" data-slides="previous">' + this.options.previousText + '</a>');
        this.next = $('<a href="#" class="slideshow-next slideshow-navigation" data-slides="next">' + this.options.nextText + '</a>');
        this.wrapper.append(this.next, this.previous);
    },

    _createCaption: function() {
        this.caption = $('<div class="slideshow-caption"></a>');
        this.wrapper.append(this.caption);
    },

    _showHideSelector: function(selector, show) {
        var visibility = show && show !== "hide" ? "visible" : "hidden";
        $(this.element).find(selector).css({
            "visibility": visibility
        });    
    },

    showNavigation: function() {
        this._showHideSelector(".slideshow-navigation", "show");
    },

    hideNavigation: function() {
        this._showHideSelector(".slideshow-navigation", "hide");
    },

    setCaption: function(text) {
        text = text ? text : "&nbsp;"
        if (typeof this.caption !== "undefined" ) {
            this.caption.html('<p>' + text + '</p>');
        }
    },

    showCaption: function() {
        this._showHideSelector(".slideshow-caption", "show");
    },

    hideCaption: function() {
        this._showHideSelector(".slideshow-caption", "hide");
    },

    _bufferSlides: function(count) {
        var widget = this;
        this.slides.slice( this.currentSlideNumber, this.currentSlideNumber + count).each(function(index, el) {
            widget._loadSlide.call(widget, $(el));
        });
    },

    //needs to do transition stuff.
    showSlide: function(slide) {
        var slideTarget = $(slide.children()[0]);
        this.currentSlide.css("display", "block");
        this.setCaption(slideTarget.data("caption"));
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