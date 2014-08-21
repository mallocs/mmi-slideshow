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
        zIndex: false,

        carousel: '.carousel',   // Selector for carousel element.
        slides: '.slide',             // Selector for carousel slides.

        controls: true,
        previousText: '<',    // Use text for slider controls.
        nextText: '>',           //

        // callbacks
        start: null,
        stop: null
    },
    _create: function() { 
        this.carousel = this.element.children(this.options.carousel);
        this.slides = this.carousel.children(this.options.slides);
        this.wrapper = this.carousel.wrap('<div style="position:relative;overflow:hidden;"></div>').parent();

        this.carouselWidth = $(this.slides[0]).find("img").width();

        this.wrapper.css({
            'width': this.carouselWidth + 'px'
        });
        this._createControls();
        this.count = this.slides.length;
        this.scrollable = true;
    },

    _createControls: function() {
            this.previous = $('<a href="#" class="slides-previous slides-controls" data-slides="previous">' + this.options.previousText + '</a>');
            this.next = $('<a href="#" class="slides-next slides-controls" data-slides="next">' + this.options.nextText + '</a>');
            this.wrapper.append(this.next, this.previous);
    },

    showControls: function() {
        $(this.wrapper).find(".slides-controls").css({
            "visibility": "visible"
        });
    },

    hideControls: function() {
        $(this.wrapper).find(".slides-controls").css({
            "visibility": "hidden"
        });
    },

    _setOption: function( key, value ) {
        this._super( key, value );

        if(key === "controls") {
            value ? this.showControls() : this.hideControls();
        }

    },

    _destroy: function() {
    }

/**
Functions needed

_createCaption
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
_setCaption
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