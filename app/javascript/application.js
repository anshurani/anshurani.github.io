// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "jquery"
import Typed from 'typed.js';

(function () {

  // function to toggle icons when theme is changed
  const toggleLogoImages = function(prevTheme, currTheme) {
    var $currElements = $(`.${currTheme}-logo`);
    $.each($currElements, function() {
      var $element = $(this);
      $element.removeClass('d-none');
    })

    var $prevElements = $(`.${prevTheme}-logo`);
    $.each($prevElements, function() {
      var $element = $(this);
      $element.addClass('d-none');
    })
  }

  // function to set a given theme 
  const setTheme = function(themeName) {
    localStorage.setItem('theme', themeName);
    $(':root').removeClass().addClass(themeName);
  }

  // function to toggle between light and dark theme
  const toggleTheme = function() {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-light');
      toggleLogoImages('theme-dark', 'theme-light');
    } else {
      setTheme('theme-dark');
      toggleLogoImages('theme-light', 'theme-dark');
    }
  }

  // function to set default theme on page load
  const setThemeOnLoad = function() {
    if (localStorage.getItem('theme') === 'theme-light') {
      setTheme('theme-light');
      $("#slider").prop("checked", true);
      toggleLogoImages('theme-dark', 'theme-light');
    } else {
      setTheme('theme-dark');
      $("#slider").prop("checked", false);
      toggleLogoImages('theme-light', 'theme-dark');
    }
  }

  var $window = $(window);
  
  // function to add animation when element scrolled into viewport  
  const animationOnInViewElement = function() {
    var $windowHeight = $window.height();
    var $windowTopPosition = $window.scrollTop();
    var $windowBottomPosition = ($windowTopPosition + $windowHeight);
    
    var $animationElements = $('.animation-element-left, .animation-element-right');

    $.each($animationElements, function() {
      var $element = $(this);
      var $elementHeight = $element.outerHeight();
      var $elementTopPosition = $element.offset().top;
      var $elementBottomPosition = ($elementTopPosition + $elementHeight);
      var $animationClass = $element.hasClass('animation-element-right') ? 'animate__animated animate__fadeInRight' : 'animate__animated animate__fadeInLeft';
      //check to see if this current container is within viewport
      if (($elementBottomPosition >= $windowTopPosition) &&
        ($elementTopPosition <= $windowBottomPosition)) {
        // add animation class 
        $element.addClass($animationClass);
      }
    });
  }

  // call function to set default theme on page load
  setThemeOnLoad();
  
  // call function to add animation when window is scrolled
  $(document).scroll(function() {
    animationOnInViewElement()
  })
  
  // click on slider to toggle theme
  $(document).on('change','#slider',function(){
    toggleTheme();
  })

  // header dropdown click on mobile devices
  $('.dropdown').click(function(){
    $('.dropdown-menu').toggleClass('show');
  });

  // show skills on introduction section
  const typed = new Typed('#tech-skills', {
    strings: [
      'Ruby on Rails',
      'MySQL',
      'PostgreSQL', 
      'HTML',
      'CSS',
      'Javascript',
      'JQuery',
      'Bootstrap',
      'NextJs'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    startDelay: 100,
    loop: true
  });
})();
