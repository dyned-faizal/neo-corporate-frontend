(function($) {

    skel.breakpoints({
        xlarge: '(max-width: 1680px)',
        large:  '(max-width: 1280px)',
        medium: '(max-width: 980px)',
        small:  '(max-width: 736px)',
        xsmall: '(max-width: 480px)'
    });

    $(function() {
        var $window = $(window),
            $body = $('body'),
            $sidebar = $('#sidebar');

        // Sidebar.
            if ($sidebar.length > 0) {

                var $sidebar_a = $sidebar.find('a');

                $sidebar_a
                    .addClass('scrolly')
                    .on('click', function() {

                        var $this = $(this);

                        // External link? Bail.
                            if ($this.attr('href').charAt(0) != '#')
                                return;

                        // Deactivate all links.
                            $sidebar_a.removeClass('active');

                        // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
                            $this
                                .addClass('active')
                                .addClass('active-locked');

                    })
                    .each(function() {

                        var $this = $(this),
                            id = $this.attr('href'),
                            $section = $(id);

                        // No section for this link? Bail.
                            if ($section.length < 1)
                                return;

                        // Scrollex.
                            $section.scrollex({
                                mode: 'middle',
                                top: '-20vh',
                                bottom: '-20vh',
                                initialize: function() {

                                    // Deactivate section.
                                        if (skel.canUse('transition'))
                                            $section.addClass('inactive');

                                },
                                enter: function() {

                                    // Activate section.
                                        $section.removeClass('inactive');

                                    // No locked links? Deactivate all links and activate this section's one.
                                        if ($sidebar_a.filter('.active-locked').length == 0) {

                                            $sidebar_a.removeClass('active');
                                            $this.addClass('active');

                                        }

                                    // Otherwise, if this section's link is the one that's locked, unlock it.
                                        else if ($this.hasClass('active-locked'))
                                            $this.removeClass('active-locked');

                                }
                            });

                    });

            }

        // Scrolly.
            $('.scrolly').scrolly({
                speed: 1000,
                offset: function() {

                    // If <=large, >small, and sidebar is present, use its height as the offset.
                        if (skel.breakpoint('large').active
                        &&  !skel.breakpoint('small').active
                        &&  $sidebar.length > 0)
                            return $sidebar.height();

                    return 0;

                }
            });

        // Spotlights.
            $('.spotlights > section')
                .scrollex({
                    mode: 'middle',
                    top: '-10vh',
                    bottom: '-10vh',
                    initialize: function() {

                        // Deactivate section.
                            if (skel.canUse('transition'))
                                $(this).addClass('inactive');

                    },
                    enter: function() {
                        // Activate section.
                            $(this).removeClass('inactive');

                    }
                })
                .each(function() {

                    var $this = $(this),
                        $image = $this.find('.image'),
                        $img = $image.find('img'),
                        x;

                    // Assign image.
                        $image.css('background-image', 'url(' + $img.attr('src') + ')');

                    // Set background position.
                        if (x = $img.data('position'))
                            $image.css('background-position', x);

                    // Hide <img>.
                        $img.hide();

                });

        // Features.
            if (skel.canUse('transition'))
                $('.features')
                    .scrollex({
                        mode: 'middle',
                        top: '-20vh',
                        bottom: '-20vh',
                        initialize: function() {

                            // Deactivate section.
                                $(this).addClass('inactive');

                        },
                        enter: function() {

                            // Activate section.
                                $(this).removeClass('inactive');

                        }
                    });
    });

    // MODAL
    $('.trigger').each(function() {
        $(this).click(function() {
            $(this).next().addClass('open');
            return false;
        });
    });
    $('a.btn-close').click(function() {
        $(this).parents('.modal-wrapper').removeClass('open');
    });
    $('a.span-close').click(function() {
        $(this).parents('.modal-wrapper').removeClass('open');
    });

    // BURGER MENU
    $('.burger__menu').click(function() {
        $('.menu__bar').toggleClass('clicked');
            if($('.menu__bar').hasClass('clicked')) {
                $('.main__nav').addClass('act');
            }
            else {
                $('.main__nav').removeClass('act');
            }
    });

    // SEARCH BAR
    function activateSearchbox(el){
      el.classList.add('searchbox--active')
    }
    function deactivateSearchbox(el){
      el.classList.remove('searchbox--active')
    }

    function onFocus(){
      activateSearchbox(document.querySelector('.searchbox'));  
    }

    function onBlur(){
      deactivateSearchbox(document.querySelector('.searchbox'));  
    }

})(jQuery);



 //JS FOR TRIGER YOUTUBE

        $(".video-trigger, .video-trigger2, .video-trigger3").click(function() {
            $(this).addClass("removed");

        });

        $('.video-trigger').on('click', function(e) {
            $(".video").addClass("watch");
            $(".video")[0].src += "&autoplay=1";
            $(".video-trigger2").removeClass("removed");
            $(".video2").removeClass("watch");
            $(".video2").attr('src', 'https://www.youtube.com/embed/ym9AlYGTfE0?rel=0');
            $(".video3").removeClass("watch");
            $(".video3").attr('src', 'https://www.youtube.com/embed/ym9AlYGTfE0?rel=0');

            event.preventDefault();
        });

        $('.video-trigger2').on('click', function(e) {
            $(".video2").addClass("watch");
            $(".video2")[0].src += "&autoplay=1";
            $(".video-trigger").removeClass("removed");
            $(".video").removeClass("watch");
            $(".video").attr('src', 'https://www.youtube.com/embed/ym9AlYGTfE0?rel=0');
            $(".video3").removeClass("watch");
            $(".video3").attr('src', 'https://www.youtube.com/embed/ym9AlYGTfE0?rel=0');

            event.preventDefault();
        });

        $('.video-trigger3').on('click', function(e) {
            $(".video3").addClass("watch");
            $(".video3")[0].src += "&autoplay=1";
            $(".video-trigger").removeClass("removed");
            $(".video-trigger2").removeClass("removed");
            $(".video").removeClass("watch");
            $(".video").attr('src', 'https://www.youtube.com/embed/ym9AlYGTfE0?rel=0');
            $(".video2").removeClass("watch");
            $(".video2").attr('src', 'https://www.youtube.com/embed/ym9AlYGTfE0?rel=0');
            

            event.preventDefault();
        });