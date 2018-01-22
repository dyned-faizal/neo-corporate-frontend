$(document).ready(function(){

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

    //ARCODION SHOW BOOKING TIME IN PAGE BOOKING A COACH
    $('.accordion-thumb').click( function() {
      $(this).next(".accordion-panel").slideToggle();
    });

    $('.accordion-item').click( function() {
      $(this).children(".accordion__panel--history").slideToggle();
    });

    // WEEKLY SCHEDULE BOOKING COACH
    $(".weekly_schedule").each(function () {
        $(this).click(function() {
            //alert(this.name);
            var loadUrl = "<?php echo site_url('student/find_coaches/schedule_detail'); ?>" + "/" + this.value;
            //alert(loadUrl);
            if (this.value != '') {
                $("#schedule-loading").show();
                $(".txt").hide();
                $("#result_" + this.value).load(loadUrl, function () {
                    $("#schedule-loading").hide();
                });
            }
        })
    });

    // GRAPH BAR IN STUDY DASHBOARD
    $(".graph__bar__each").each(function() {
        var dataWidth = $(this).data('value') / 125 * 100;
        $(this).css("width", dataWidth + "%");
    
        if ($(this).data('value') >= 100) {
            $(this).css('background', 'linear-gradient(-136deg, rgb(73, 197, 254) 0%, rgb(121, 231, 68) 92%)');
        }
    });

    // burger menu click event
    $('.burger__menu').click(function() {
        $('.menu__bar').toggleClass('clicked');
            if($('.menu__bar').hasClass('clicked')) {
                $('.mobile__nav').addClass('act');
            }
            else {
                $('.mobile__nav').removeClass('act');
            }
    });
    // end burger menu click event

    //MENU TAB IN DASHBOARD

    $('ul.tabs li').click(function() {
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').fadeOut(50);

        $(this).addClass('current');
        $("#" + tab_id).fadeIn(1000).css('display', 'flex');

    })

    $('.tabs div').click(function() {
        var tab_id = $(this).attr('data-tab');

        $('.tabs div').removeClass('current');
        $('.tab-content').fadeOut(300);

        $(this).addClass('current');
        $("#" + tab_id).delay(300).fadeIn(300);

    })

    //DATE TIME PICKER IN BOOKING A COACH
    $(function() {
        $(".calendar").datepicker({
            dateFormat: 'dd - MM - yy',
            firstDay: 1
        });

        $(document).on('click', '.date-picker .input', function(e) {
            var $me = $(this),
                $parent = $me.parents('.date-picker');
            $parent.toggleClass('open');
        });

        $(".calendar").on("change", function() {
            var $me = $(this),
                $selected = $me.val(),
                $parent = $me.parents('.date-picker');
            $parent.find('.result').children('span').html($selected);
        });
    });

    //DROPDOWN COUNTRY AND LANGUAGES BOOKING A COACH
    (function($, window, document, undefined) {

        'use strict';

        var $html = $('html');

        $html.on('click.ui.dropdown', '.js-dropdown', function(e) {
            e.preventDefault();
            $(this).toggleClass('is-open');
        });

        $html.on('click.ui.dropdown', '.js-dropdown [data-dropdown-value]', function(e) {
            e.preventDefault();
            var $item = $(this);
            var $dropdown = $item.parents('.js-dropdown');
            $dropdown.find('.js-dropdown__input').val($item.data('dropdown-value'));
            $dropdown.find('.js-dropdown__current').text($item.text());
        });

        $html.on('click.ui.dropdown', function(e) {
            var $target = $(e.target);
            if (!$target.parents().hasClass('js-dropdown')) {
                $('.js-dropdown').removeClass('is-open');
            }
        });

    })(jQuery, window, document);


    //SELECTED AND SHOW MENU BOOKING A COACH IN MOBILE

    jQuery(function($) {
        $('#town').on('change', function() {
            //use toggle for ease of use
            if ($(this).val() === "1") {
                $(".alt1").show(this.value == 1);
                $(".alt2").hide();
                $(".alt3").hide();
                $(".alt4").hide();
            } else if ($(this).val() === "2") {
                $(".alt2").show(this.value == 2);
                $(".alt1").hide();
                $(".alt3").hide();
                $(".alt4").hide();
            } else if ($(this).val() === "3") {
                $(".alt3").show(this.value == 3);
                $(".alt1").hide();
                $(".alt2").hide();
                $(".alt4").hide();
            } else if ($(this).val() === "4") {
                $(".alt4").show(this.value == 4);
                $(".alt1").hide();
                $(".alt2").hide();
                $(".alt3").hide();
            } else if ($(this).val() === "0") {

                $(".alt1").hide();
                $(".alt2").hide();
                $(".alt3").hide();
                $(".alt4").hide();
            }
        });
    });

    //RATING COACH  MENU BOOKING A COACH 

    /* 1. Visualizing things on Hover - See next part for action on click */
    $('#stars li').on('mouseover', function() {
        var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

        // Now highlight all the stars that's not after the current hovered star
        $(this).parent().children('li.star').each(function(e) {
            if (e < onStar) {
                $(this).addClass('hover');
            } else {
                $(this).removeClass('hover');
            }
        });

    }).on('mouseout', function() {
        $(this).parent().children('li.star').each(function(e) {
            $(this).removeClass('hover');
        });
    });


    /* 2. Action to perform on click */
    $('#stars li').on('click', function() {
        var onStar = parseInt($(this).data('value'), 10); // The star currently selected
        var stars = $(this).parent().children('li.star');

        for (i = 0; i < stars.length; i++) {
            $(stars[i]).removeClass('selected');
        }

        for (i = 0; i < onStar; i++) {
            $(stars[i]).addClass('selected');
        }

        // JUST RESPONSE (Not needed)
        var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
        var msg = "";
        if (ratingValue > 1) {
            msg = " " + ratingValue + " stars.";
        } else {
            msg = " " + ratingValue + " stars.";
        }
        responseMessage(msg);

    });

    function responseMessage(msg) {
        $('.success-box').fadeIn(200);
        $('.success-box div.text-message').html("<span>" + msg + "</span>");
    }

    $('.fa-times').click(function() {
        $('.dashboard__notif').remove();
    });


    // ANIMATEDLY DISPLAY THE NOTIFICATION COUNTER. // notification thing
    var totalNotif = 13;

    $('#noti__counter')
        .css({ opacity: 0 })
        .text(totalNotif)              // ADD DYNAMIC VALUE (YOU CAN EXTRACT DATA FROM DATABASE OR XML).
        .css({ top: '10px', right: '5px' })
        .animate({ opacity: 1 }, 500);

    if (totalNotif == 0) {
        $('#noti__counter').hide();
    };

    $('#noti__button').click(function () {

        // TOGGLE (SHOW OR HIDE) NOTIFICATION WINDOW.
        $('#notifications').fadeToggle('fast', 'linear', function () {
            if ($('#notifications').is(':hidden')) {
                $('#noti__button').css('background-color', 'rgb(59, 74, 116)');
            }       // CHANGE BACKGROUND COLOR OF THE BUTTON.
        });

        $('#noti__counter').fadeOut('slow');                 // HIDE THE COUNTER.

        return false;
    });

    // HIDE NOTIFICATIONS WHEN CLICKED ANYWHERE ON THE PAGE.
    $(document).click(function () {
        $('#notifications').hide();

        // CHECK IF NOTIFICATION COUNTER IS HIDDEN.
        if ($('#noti__counter').is(':hidden')) {
            // CHANGE BACKGROUND COLOR OF THE BUTTON.
            $('#noti__button').css('background-color', '#2E467C');
        }
    });

    $('#notifications').click(function () {
        return false;       // DO NOTHING WHEN CONTAINER IS CLICKED.
    });

    // logout 
    $('#logout__button').click(function () {

        // TOGGLE (SHOW OR HIDE) NOTIFICATION WINDOW.
        $('#logout__box').fadeToggle('fast', 'linear', function () {
            if ($('#logout__box').is(':hidden')) {
                $('#logout__button').css('background-color', '#2E467C');
            }       // CHANGE BACKGROUND COLOR OF THE BUTTON.
        });

        $('#logout__counter').fadeOut('slow');                 // HIDE THE COUNTER.

        return false;
    });

    // HIDE NOTIFICATIONS WHEN CLICKED ANYWHERE ON THE PAGE.
    $(document).click(function () {
        $('#logout__box').hide();

        // CHECK IF NOTIFICATION COUNTER IS HIDDEN.
        if ($('#logout__counter').is(':hidden')) {
            // CHANGE BACKGROUND COLOR OF THE BUTTON.
            $('#logout__button').css('background-color', '#2E467C');
        }
    });

    $('#logout__box').click(function () {
        return false;       // DO NOTHING WHEN CONTAINER IS CLICKED.
    });
});