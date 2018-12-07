/*!
 * GRT Responsive Menu - jQuery Plugin
 * Version: 1.0
 * Author: GRT107
 *
 * Copyright (c) 2018 GRT107
 * Released under the MIT license
*/

// Create a function for mobile version
(function( $ ){
	$.fn.mobile = function () {
		if ($(window).width() < 768) {
			$('.mobile-button').on('click', function(){
				$(this).toggleClass("mobile-button-open");
				$("ul.menu").toggleClass("open-menu ");
				$("html, body").toggleClass("body-overflow");
			});
			$('li.dropdown').on('click', function(e){
				$(this).toggleClass("active-dropdown");
			});
		}
	}
})( jQuery );

// Initialize and check for mobile
$.fn.mobile();

// On resize window check for mobile

var resizeTimeout;
$(window).resize(function(){
  if(!!resizeTimeout){ clearTimeout(resizeTimeout); }
  resizeTimeout = setTimeout(function(){
    $.fn.mobile();
  },200);
});

// Add shadow on scroll after 60px
$(window).scroll(function(e){
   if ($(this).scrollTop() > 60){
       $('header').addClass('scrolled');
   } else {
       $('header').removeClass('scrolled');
   }
});

// Prevent a href clicks on dropdown category
$('li.dropdown > a').on('click', function(e){
	e.preventDefault();
});