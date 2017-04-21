 /*global jQuery */
jQuery(function ($) {

    "use strict";
// ---------  SLIDER ---------


    function doAnimations(elems) {
        //Cache the animationend event in a variable
        var animEndEv = "webkitAnimationEnd animationend";
        elems.each(function () {
            var $this = $(this);
                $animationType = $this.data("animation");
            $this.addClass($animationType).one(animEndEv, function () {
                $this.removeClass($animationType);
            });
        });
    }
    //Variables on page load
    var $myCarousel = $("#immortal_carousel");
        $firstAnimatingElems = $myCarousel.find(".item:first").find("[data-animation ^= ")"]");
    //Initialize carousel
    $myCarousel.carousel();
    //Animate captions in first slide on page load
    doAnimations($firstAnimatingElems);
    //Other slides to be animated on carousel slide event
    $myCarousel.on("slide.bs.carousel", function (e) {
        var $animatingElems = $(e.relatedTarget).find("[data-animation ^= "animated"]");
        doAnimations($animatingElems);
    });

// --------- TOOL TIP ---------

    $("[data-toggle="tooltip"]").tooltip();

// --------- SLIDEDOWN ANIMATION TO DROPDOWN ---------

// ADD SLIDEDOWN ANIMATION TO DROPDOWN //
    $("#dropdown_slide").find("li.dropdown").on("show.bs.dropdown", function (e) {
        $(this).find(".dropdown-menu").first().stop(true, true).slideDown();
    });
// ADD SLIDEUP ANIMATION TO DROPDOWN //
    $("#dropdown_slide").find("li.dropdown").on("hide.bs.dropdown", function (e) {
        e.preventDefault();
        $(this).find(".dropdown-menu").first().stop(true, true).slideUp(400, function () {
            $(this).parent().removeClass("open");
        });
    });

})(jQuery);