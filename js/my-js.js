'use strict';
$(function() {
    //config
    var width = 1200;
    var slideSpeed = 1000;
    var pause = 4000;
   
   
    //Cache DOM
    var $pictureSlider = $('#picture-slider');
    var $slides = $pictureSlider.find('.slides');
    var $slide = $slides.find('li');
    
     var currentSlide = 1;
    //Slice First Slide and append
     var firstSlide = $slide.first();
     var tmp = '<li>'+firstSlide.html()+'</li>';
     firstSlide = tmp;
     $slides.append(firstSlide);
      
 
     var interval;
     function startSlider() {
        interval = setInterval(function() {
           $slides.animate({'margin-left': '-='+width+'px'}, slideSpeed, function(){
                currentSlide++;
                if (currentSlide === $slide.length+1) {
                     clearInterval(interval);
                     currentSlide = 1;
                     $slides.css('margin-left', 0);
                     startSlider();
                         
                }
           });
         }, pause);
    }
    function stopSlider() {
        clearInterval(interval);
    }
    $pictureSlider.on('mouseenter', stopSlider);
    $pictureSlider.on('mouseleave', startSlider);
           
    startSlider();
    
});
