(function($) {

    var vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
        (/firefox/i).test(navigator.userAgent) ? 'Moz' :
        'opera' in window ? 'O' : '';
    
    $.fn.changePage = function (to, reverse, callback) {
        var fromPage = this,
            toPage = (typeof to == 'object') ? to : $(to),
            parent = fromPage.parent(),
            parentWidth = parent.width(),
            onComplete, translateX;
            
        if (parent.is(toPage.parent())) {
            if (reverse) {
                translateX = 0;
                parent.css('-webkit-transition', 'none')
                    .css('-webkit-transform', 'translate3d(' + (-1*parentWidth) + 'px, 0, 0)');
                fromPage.css('-webkit-transform', 'translate3d(' + parentWidth + 'px, 0, 0)');
            } else {
                translateX = -1*parentWidth;
                toPage.css('-webkit-transform', 'translate3d(' + parentWidth + 'px, 0, 0)');
            }
            
            onComplete = function() {
                fromPage.css('visibility', 'hidden').css('-webkit-transform', 'none');
                parent.css('-webkit-transition', 'none').css('-webkit-transform', 'none');
                toPage.css('-webkit-transform', 'none');
                /* Reset the transition property*/
                setTimeout(function() { parent.css('-webkit-transition', ''); }, 0);
                if (typeof callback == 'function') callback();
            }
            
            toPage.css('visibility', '');
            parent.slide('translate3d(' + translateX + 'px, 0, 0)', onComplete);
        }
    };
    
    $.fn.scrollHeight = function() {
        return this[0].scrollHeight;
    };
    
    $.fn.slide = function(transform, callback) {
        var that = this, transitionEnd = false;
        
        var onComp = function(event) {
            if (!transitionEnd && (!event || that.is(event.target))) {
                transitionEnd = true;
                that.off('webkitTransitionEnd'); 
                if(typeof callback == 'function') callback();
            }
        };
        this.off('webkitTransitionEnd').on('webkitTransitionEnd', onComp);
        this.css('visibility', 'visible');

        setTimeout(function() {
            that.css('-webkit-transition', '-webkit-transform ease 0.4s')
                .css('-webkit-backface-visibility', 'hidden')
                .css(vendor + 'Transform', transform); 
        }, 10);

        // Ensure we do callback no matter what
        setTimeout(onComp, 1000);

        return this;
    };
    
    $.fn.slideIn = function(axis, initialPos, finalPos, callback) {
        var that = this;
        
        var initialTransform, finalTransform;
        switch(axis.toUpperCase()) {
            case 'X': 
                initialTransform = 'translate3d(' + initialPos + 'px, 0px, 0px)';
                finalTransform = 'translate3d(' + finalPos  + 'px, 0px, 0px)';
                break;
            case 'Y': 
                initialTransform = 'translate3d(0px, ' + initialPos + 'px, 0px)';
                finalTransform = 'translate3d(0px, ' + finalPos  + 'px, 0px)';
                break;
        };

        this.css('visibility', 'hidden').css(vendor + 'TransitionProperty','none')
            .css(vendor + 'Transform', initialTransform);
            
        return this.slide(finalTransform, callback);
    };
    
    $.fn.slideOut = function(axis, finalPos, callback){
        var that = this;
        
        var finalTransform;
        switch(axis.toUpperCase()) {
            case 'X': 
                finalTransform = 'translate3d(' + finalPos + 'px, 0px, 0px)';
                break;
            case 'Y': 
                finalTransform = 'translate3d(0px, ' + finalPos + 'px, 0px)';
                break;
        };
        
        var onComp = function() { 
            that.css('visibility', 'hidden'); 
            if(typeof callback == 'function') callback(); 
        };
        
        return this.slide(finalTransform, onComp);
    };
    
    $.fn.slideInLeft = function(callback) {
                
        var leftPos = this.parent().width() - this.outerWidth(); // Element should be hidden before calculating width
        this.slideIn('X', this.parent().width(), leftPos, callback);
    };
    
    $.fn.slideOutRight = function(callback) {
                
        if (this.css('display') == 'block') {
            this.slideOut('X', this.parent().width(), callback);
        }   
    };
})(jQuery);