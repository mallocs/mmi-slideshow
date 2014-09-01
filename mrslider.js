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

        transition: "scroll",               // What type of transition to use. 
        transitionSpeed: 600,          // Speed to transition between slides.
        transitionOptions: {},            // Extra options for transition. See jQuery UI effect options.
        navigation: true,                  // Show the navigation arrows.
        previousText: false,              // Text for previous slide button.
        nextText: false,                    // Text for next slide button.
        loop: true,                           // Slides run in a loop.
        pagination: true,                 // Show pagination.

        // callbacks
        start: null,
        stop: null
    },
    _create: function() { 
        this.options = $.extend({}, this.options, $(this.element).data());
        this.carousel = this.element.children(this.options.carousel);
        this.slides = this.carousel.children(this.options.slides);
        this.currentSlideNumber = parseInt(this.options.startSlide, 10);
        this.count = this.slides.length;

        this._createWrapper();
        this._createNavigation();
        this._createCaption();
        if (this.options.pagination) {
            this._createPagination();
        }
        this.setCurrentSlide(this.currentSlideNumber);
    },

    _createWrapper: function() {
         this.wrapper = this.carousel.wrap('<div style="position:relative; overflow: hidden;"></div>').parent();
    },

    _createNavigation: function() {
        var widget = this;
        this.$previous = $('<span class="slideshow-previous slideshow-navigation" data-slides="previous"></span>');
        this.$next = $('<span class="slideshow-next slideshow-navigation icon-right-open" data-slides="next"></span>');
        this.options.previousText ? this.$previous.html(this.options.previousText) : this.$previous.addClass("icon-left-open");
        this.options.nextText ? this.$next.html(this.options.nextText) : this.$next.addClass("icon-rigth-open");
        this._on(this.$next, {
            click: "next"
        });
        this._on(this.$previous, {
            click: "previous"
        });
        this.element.append(this.$next, this.$previous);
    },

    _createCaption: function() {
        this.$caption = $('<div class="slideshow-caption"></div>');
        this.element.append(this.$caption);
    },

    _createPagination: function() {
        this.$pagination = $('<ul class="slides-pagination">');

        for (var i=0, len = this.count; i < len; i++) {
            this.$pagination.append('<li><a href="#" data-slide="' + i + '">' + (i+1) + '</a></li>');
        }
        this._on(this.$pagination, {
            "click a": "page"
        });
        this.element.append(this.$pagination);
        this.pages = this.$pagination.children(this.count);
    },

    _getSlideFromNumber: function(slideNumber) {
        return $(this.slides[ parseInt(slideNumber, 10) ]);
    },

    page: function(event) {
        event.preventDefault();
        var page = $(event.target).data("slide");
        this.setCurrentSlide(page);
    },

    setPage: function(slideNumber) {
        if (typeof this.pages === "undefined") {
            return;
        }
        var page = $(this.pages[ parseInt(slideNumber, 10) ]);
        this.pages.not(page).find("a").removeClass("selected");
        page.find("a").addClass("selected");       
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
        this.setCurrentSlide(slideNumber);
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
        this.setCurrentSlide(slideNumber);
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

    setCurrentSlide: function(slideNumber) {
        var slide = this._getSlideFromNumber(slideNumber);
        var slideTarget = $(slide.children()[0]);
        var transitionSpeed = parseInt(this.options.transitionSpeed, 10);
        var transitionOptions = this.options.transitionOptions;
        var transition = this.options.transition + "";

        var animating = false;

        if (typeof this.currentSlide === "undefined") {
            slide.show();
            this.carousel.find("li").not(slide).css({display: "none"});
        } else if (transition === "scroll") {
            if (this.wrapper.is(":animated")) {
                this.wrapper.stop();
                transitionSpeed = this.transitionSpeed = this.transitionSpeed/2 || transitionSpeed/2;
                var scroll = this.currentTarget;
                animating = true;
            } else {
                this.carousel.css({minWidth: "1500px"});
                this.carousel.find("li").css({float: "left", display: "list-item"});
                var scroll = this.currentTarget = slide.position().left + this.wrapper.scrollLeft();
            }
            var maxScroll = this.carousel.width() - this.wrapper.width();
            this.wrapper.animate({
                scrollLeft: scroll
            }, transitionSpeed);
        } else {
            if (slide.is(":animated")) {
                return;
            }
            this.carousel.find("li").not(this.currentSlide).css({display: "none", position: "static"});
            slide.show("fade", transitionOptions, transitionSpeed);
            this.currentSlide.css({position: "absolute", top: 0, left: 0});
            this.currentSlide.hide(transition, transitionOptions, transitionSpeed);
        }

        if (animating) {
            return;
        }

        this.setCaption(slideTarget.data("caption"));
        this.setPage(slideNumber);
        this.currentSlide = slide;
        this.currentSlideNumber = slideNumber;
        this._bufferSlides( parseInt(this.options.buffer, 10) );
    },

    _loadSlide: function(slide) {
        if (typeof slide.slideIsLoaded !== "undefined" || slide.slideIsLoaded === true) {
            return;
        }
        var slideTarget = $(slide.children()[0]);
        if (slideTarget.is("img")) {
            this._loadImage(slideTarget);
        }
        slide.slideIsLoaded = true;
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