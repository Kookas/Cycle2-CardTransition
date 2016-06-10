(function($) {
"use strict";

$.extend($.fn.cycle.defaults, {
    cardsShiftOut: 500,   // How far a slide will move as it transitions out.
});

$.fn.cycle.transitions.scrollCards =
{
    before: function( opts, curr, next, fwd ) {        
        opts.API.stackSlides( curr, next, fwd );
        var w = opts.container.css('overflow','hidden').width();
        opts.cssBefore = { zIndex: opts._maxZ, left: fwd ? w : - w, top: 0, opacity: 1, visibility: 'visible', display: 'block' };
        opts.cssAfter = { zIndex: opts._maxZ - 2, left: 0 }; // We have to make sure that the incoming slide is above the outgoing slide, which we do using zIndex
        opts.animIn = { left: 0 };
        opts.animOut = { left: fwd ? -opts.cardsShiftOut : opts.cardsShiftOut }; // Where cardsShiftOut is applied
    },
    
    transition: function( slideOpts, currEl, nextEl, fwd, callback) {
        var opts = slideOpts;
        var curr = $(currEl), next = $(nextEl);
        
        // We literally just do what the standard transition function does, but backwards.
        
        var fn = function() {
            curr.css(opts.cssAfter || {});
            curr.animate(opts.animOut || {}, opts.speed, opts.easeOut || opts.easing, callback);        
        };

        next.css(opts.cssBefore || {});
        
        next.animate(opts.animIn || { opacity: 1}, opts.speed, opts.easeIn || opts.easing, function() {            
            if (!opts.sync) {
                fn();
            }
        });
        
        if (opts.sync) {
            fn();
        }
    }
}
})(jQuery);