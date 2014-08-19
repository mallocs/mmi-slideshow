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

        // callbacks
        start: null,
        stop: null
    },
    _create: function() {
        this.carousel = this.element.children(this.options.carousel);
        this.slides = this.carousel.children(this.options.slides);
        this.count = this.slides.length;
        this.scrollable = true;
        this.wrapper = this.carousel.wrap('<div style="position:relative;overflow:hidden;">').parent();
    },

    _setOption: function( key, value ) {
         this._super( key, value );
    },

    _destroy: function() {
    }

/**
Functions needed

_createBackground
_createCaption
_createControls
_createNext
_createPrevious
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