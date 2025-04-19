// function to toggle icons when theme is changed
const toggleLogoImages = function(prevTheme, currTheme) {
  var $currElements = $(`.${currTheme}-logo`);
  $.each($currElements, function() {
    var $element = $(this);
    if ($element.hasClass('static')) { 
      return; 
    }
    $element.removeClass('d-none');
  })

  var $prevElements = $(`.${prevTheme}-logo`);
  $.each($prevElements, function() {
    var $element = $(this);
    if ($element.hasClass('static')) { 
      return; 
    }
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
    $(".slider").css("background-color", "rgba(var(--color-accent),1)");
    toggleLogoImages('theme-dark', 'theme-light');
  } else {
    setTheme('theme-dark');
    $(".slider").css("background-color", "#ccc");
    toggleLogoImages('theme-light', 'theme-dark');
  }
}

// function to set default theme on page load
const setThemeOnLoad = function() {
  if (localStorage.getItem('theme') === 'theme-light') {
    setTheme('theme-light');
    $("#slider").prop("checked", true);
    $(".slider").css("background-color", "rgba(var(--color-accent),1)");
    toggleLogoImages('theme-dark', 'theme-light');
  } else {
    setTheme('theme-dark');
    $("#slider").prop("checked", false);
    $(".slider").css("background-color", "#ccc");
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
$( document ).ready(function() {
  setThemeOnLoad();
});

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
