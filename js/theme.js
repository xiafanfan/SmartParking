/*======================================================
* Template Name: Plesir - Car & Travel Mobile Template	
* Version: 1.0
* Author: HidraTheme 
* Developed By: HidraTheme  
* Author URL: https://themeforest.net/user/hidratheme 
======================================================*/

(function ($) {

  "use strict"; 

    /* PRELOADER */
      $(window).on('load',function() { 
          $(".preloading").fadeOut("slow"); 
      });

    /* SIDE NAVIGATION */
      $('#dismiss, .overlay').on('click', function () {
          $('#sidebarleft').removeClass('active');
          $('#sidebarright').removeClass('active');
          $('.overlay').removeClass('active'); 
          $('body').removeClass('noscroll');
      });

      $('#sidebarleftbutton,#sidebarrightbutton').on('click', function () { 
          $('.overlay').addClass('active');
          $('body').addClass('noscroll');
      });

      $('#sidebarleftbutton').on('click', function () {
          $('#sidebarleft').addClass('active'); 
      });

      $('#sidebarrightbutton').on('click', function () {
          $('#sidebarright').addClass('active'); 
      });

    



    /* GALLERY - FILTERING FUCTION */
      $(".filter-button").on("click", function() {  
        var value = $(this).data('filter');  

          if(value == "gallery-show-all")
          {
              $('.gallery-img-box').removeClass("gallery-hidden");
          }
          else
          {  
            $( '.gallery-img-box:not([data-category-image*="' + value + '"]').addClass("gallery-hidden");
            $( '.gallery-img-box[data-category-image*="' + value + '"]').removeClass("gallery-hidden");   
          }
      });

      $('.filter-gallery .filter-button').on("click", function() {
          $('.filter-gallery').find('.filter-button.active').removeClass('active');  
          $(this).addClass('active');
      });



})(jQuery);


