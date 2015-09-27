(function($){
    jQuery.fn.slideShow = function(options){
         options = $.extend({
             width: 1200,
             slideSpeed: 1000,
             pause: 3000
         });
         var make = function(){
            //Cache DOM
            var $pictureSlider = $(this);
            var $slides = $pictureSlider.find('.slides');
            var $slide = $slides.find('li');

             var currentSlide = 0;
             
             //Slide Navigation 
                var slideNav = $('.slider-nav ul');
                var round = '<li></li>'; 
                $slide.each(function(){
                    slideNav.append(round);
                });
                var slideNavRound = slideNav.children();
                $(slideNavRound[currentSlide]).addClass('li-background');
             
             //Click Slide Navigation
                function clickNav(slide){
                   slideNavRound.on('click', function(){
                      if ( !($(this).hasClass('li-background')))
                          { 
                              
                              var currentNav = $(this).index();
                              $(slideNavRound[slide]).removeClass('li-background');
                              if (currentNav > slide )
                                  { 
                                        var difference = (currentNav - slide)*options.width; 
                                        $slides.animate({'margin-left': '-='+difference+'px'}, options.slideSpeed)
                                        slide = currentNav;
                                        $(slideNavRound[slide]).addClass('li-background');
                                  }
                              else 
                                  {
//                                         var difference = (slide - currentNav)*options.width; 
//                                         $slides.animate({'margin-left': '+='+difference+'px'}, options.slideSpeed)  
                                  }
                          }
                   });
                    
                }
             //Slice First Slide and append
               var firstSlide = $slide.first();
               var tmp = '<li>'+firstSlide.html()+'</li>';
               firstSlide = tmp;
               $slides.append(firstSlide);
             clickNav(currentSlide);
             //SLideShow
             var interval;
             function startSlider() {
                interval = setInterval(function() {
                $slides.animate({'margin-left': '-='+options.width+'px'}, options.slideSpeed, function(){
                        $(slideNavRound[currentSlide]).removeClass('li-background');
                        
                        if (currentSlide === $slide.length-1) {
                             clearInterval(interval);
                             currentSlide = 0;
                             $slides.css('margin-left', 0);
                             $(slideNavRound[currentSlide]).addClass('li-background');
                             startSlider();

                        }
                        else {
                            
                            currentSlide++;
                            $(slideNavRound[currentSlide]).addClass('li-background');
                        }
                   });
                    
                    clickNav(currentSlide);
                 }, options.pause);
            }
            function stopSlider() {
                clearInterval(interval);
            }
            $pictureSlider.on('mouseenter', stopSlider);
            $pictureSlider.on('mouseleave', startSlider);

            startSlider();
                 }
    return this.each(make);     
    }
})(jQuery);