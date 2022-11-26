(function ($) {
  "use strict";
  function xsFunction() {
    var xsContact = $(".xs-contact-form-wraper"),
      xsMap = $(".map-wraper-v2");
    xsMap.css("height", xsContact.outerHeight());
  }
  
  $(window).on("load", function () {
    xsFunction();
    setTimeout(() => {
      $("#preloader").fadeOut();
    }, 500);
    
    if ($(".xs-portfolio-grid").length > 0) {
      var $portfolioGrid = $(".xs-portfolio-grid"),
        colWidth = function () {
          var w = $portfolioGrid.width(),
            columnNum = 1,
            columnWidth = 0;
          if (w > 1200) {
            columnNum = 3;
          } else if (w > 900) {
            columnNum = 3;
          } else if (w > 600) {
            columnNum = 2;
          } else if (w > 450) {
            columnNum = 2;
          } else if (w > 385) {
            columnNum = 1;
          }
          columnWidth = Math.floor(w / columnNum);
          $portfolioGrid.find(".xs-portfolio-grid-item").each(function () {
            var $item = $(this),
              multiplier_w = $item
                .attr("class")
                .match(/xs-portfolio-grid-item-w(\d)/),
              multiplier_h = $item
                .attr("class")
                .match(/xs-portfolio-grid-item-h(\d)/),
              width = multiplier_w
                ? columnWidth * multiplier_w[1]
                : columnWidth,
              height = multiplier_h
                ? columnWidth * multiplier_h[1] * 0.4 - 12
                : columnWidth * 0.5;
            $item.css({ width: width });
          });
          return columnWidth;
        },
        isotope = function () {
          $portfolioGrid.isotope({
            resizable: false,
            itemSelector: ".xs-portfolio-grid-item",
            masonry: { columnWidth: colWidth(), gutterWidth: 3 },
          });
        };
      isotope();
      $(window).resize(isotope);
    }
  });

  $(document).ready(function () {
    xsFunction();
    // animate the owl owlCarousels ======================================================
    if ($(".xs-banner-slider").length > 0) {
      var bannerSlider = $(".xs-banner-slider");
      bannerSlider.owlCarousel({
        items: 1,
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        dots: false,
        nav: true,
        navText: [
          '<i class="fa fa-angle-left xs-round-nav"></i>',
          '<i class="fa fa-angle-right xs-round-nav"></i>',
        ],
        autoplay: true,
        autoplayTimeout: 5000,
        // autoplayHoverPause: true,
        animateOut: "fadeOut",
        animateIn: "fadeIn",
        responsive: {
          0: { nav: false },
          480: { nav: false },
          991: { nav: true },
        },
      });
    }

    if ($(".xs-single-item-slider").length > 0) {
      var singleItemSlider = $(".xs-single-item-slider");
      singleItemSlider.owlCarousel({
        items: 1,
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        dots: false,
        nav: true,
        navText: [
          '<i class="fa fa-arrow-left xs-square-nav"></i>',
          '<i class="fa fa-arrow-right xs-square-nav"></i>',
        ],
        autoplay: true,
        autoplayTimeout: 5000,
        // autoplayHoverPause: true,
        animateOut: "fadeOut",
        animateIn: "fadeIn",
        responsive: {
          0: { nav: false },
          480: { nav: false },
          768: { nav: true },
        },
      });
    }

    if ($(".xs-focus").length > 0) {
      var bannerSlider = $(".xs-focus");
      bannerSlider.owlCarousel({
        items: 4,
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        dots: false,
        nav: true,
        navText: [
          '<i class="fa fa-angle-left xs-round-nav"></i>',
          '<i class="fa fa-angle-right xs-round-nav"></i>',
        ],
        autoplay: true,
        autoplayTimeout: 4000,
        animateOut: "fadeOut",
        animateIn: "fadeIn",
        responsive : {
          // breakpoint from 0 up
          0 : {
            items: 2,
            autoplayTimeout: 3000,
          },
          // breakpoint from 768 up
          768 : {
            items: 2,
            autoplayTimeout: 3000,
          },
          1024 : {
            items: 4,
            autoplayTimeout: 4000,
          }
      }
        
      });
    }

    if ($(".xs-focus2").length > 0) {
      var bannerSlider = $(".xs-focus2");
      bannerSlider.owlCarousel({
        items: 3,
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        dots: false,
        nav: true,
        navText: [
          '<i class="fa fa-angle-left xs-round-nav"></i>',
          '<i class="fa fa-angle-right xs-round-nav"></i>',
        ],
        autoplay: true,
        autoplayTimeout: 4000,
        animateOut: "fadeOut",
        animateIn: "fadeIn",
        responsive : {
          // breakpoint from 0 up
          0 : {
            items: 1,
            autoplayTimeout: 3000,
          },
          // breakpoint from 768 up
          768 : {
            items: 2,
            autoplayTimeout: 3000,
          },
          1024 : {
            items: 3,
            autoplayTimeout: 4000,
          }
      }
        
      });
    }

    // animate the numbers-----======================================================
    var number_percentage = $(".number-percentage");
    function animateProgressBar() {
      number_percentage.each(function () {
        $(this).animateNumbers(
          $(this).attr("data-value"),
          true,
          parseInt($(this).attr("data-animation-duration"), 10)
        );
        var value = $(this).attr("data-value");
        var duration = $(this).attr("data-animation-duration");
        $(this)
          .closest(".xs-skill-bar")
          .find(".xs-skill-track")
          .animate({ width: value + "%" }, 4500);
      });
    }

    if ($(".waypoint-tigger").length > 0) {
      var waypoint = new Waypoint({
        element: document.getElementsByClassName("waypoint-tigger"),
        handler: function (direction) {
          animateProgressBar();
        },
      });
    }

    $.fn.animateNumbers = function (stop, commas, duration, ease) {
      return this.each(function () {
        var $this = $(this);
        var start = parseInt($this.text().replace(/,/g, ""), 10);
        commas = commas === undefined ? true : commas;
        $({ value: start }).animate(
          { value: stop },
          {
            duration: duration == undefined ? 500 : duration,
            easing: ease == undefined ? "swing" : ease,
            step: function () {
              $this.text(Math.floor(this.value));
              if (commas) {
                $this.text(
                  $this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                );
              }
            },
            complete: function () {
              if (parseInt($this.text(), 10) !== stop) {
                $this.text(stop);
                if (commas) {
                  $this.text(
                    $this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                  );
                }
              }
            },
          }
        );
      });
    };


    if ($(".xs-menus").length > 0) {
      $(".xs-menus").xs_nav({ mobileBreakpoint: 992 });
    }

    // move to top =================================================================
    $(document).on("click", ".xs-back-to-top", function (event) {
      event.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 1000);
    });

    // video and image pop-up ======================================================
    if ($(".xs-video-popup").length > 0) {
      $(".xs-video-popup").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
      });
    }
    $(".xs-image-popup").magnificPopup({
      type: "image",
      closeOnContentClick: false,
      closeBtnInside: false,
      mainClass: "mfp-with-zoom mfp-img-mobile",
      gallery: { enabled: true },
      zoom: { enabled: true, duration: 300 },
    });

  });

  


  
})(jQuery);
