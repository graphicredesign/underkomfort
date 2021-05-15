// JavaScript Document


//Global
var pagetl = gsap.timeline({paused:true});
 pagetl.set(".box-animation", {
     autoAlpha: 0,
     display: "none"
 });
 pagetl.to(".main-other", 1, {
     autoAlpha: 1
 });
 pagetl.set([".down-arrow-button"], {
     autoAlpha: 0,
     display: "none"
 });

console.log("YEEEES")

var scrollArrowTl = gsap.timeline({paused:true});
scrollArrowTl.from(".scroll-arrow-cont", 1, {
    y: "50"
});
scrollArrowTl.to(".scroll-arrow-cont", 1, {
    opacity: 1
});

var video = document.querySelector("#v0");
var initialFrame = 3000;
var first = true;

/** Detect Mobile **/
var detector = new MobileDetect(window.navigator.userAgent);

if(detector.mobile() == null ){
	
	document.querySelector('.section.main-section').style.height = 10000 + "px";
	video.play();
	TweenMax.delayedCall(3.5, video.pause, null, video);
	
	video.onpause = function() {
    	startScrollBasedAnimation();
		//initialFrame = video.currentTime;
		console.group("Paused Video Info");
		console.log('paused video');
		console.log(`Current time is ${video.currentTime} on pause`); //3.361449, 3.418976, 3.045391, 3.422562
		console.log(`Current Y offset ${window.pageYOffset}`)
		console.groupEnd();
	};
	
	//** Setup scroll for video **//
	const intro = document.querySelector("#main-section");
    var frameNumber = initialFrame,
        playbackConst = 1000,
        vid = document.getElementById('v0');
	
	var tl = gsap.timeline();
    tl.to(window, {
        duration: 5,
        scrollTo: 3500,
        ease: Power1.easeOut
    });
	
	//window.cancelAnimationFrame(requestId);
	
	//window.addEventListener("scroll", startScrollBasedAnimation);
	
	function startScrollBasedAnimation(){
		
		scrollPlay();
	
		function scrollPlay() {
						
			/*console.log(`Current time is ${initialFrame} after pause`);

			//detect if first page load
			if(first == true){
				frameNumber = initialFrame;
				first = false;
				
				console.log(`No longer first ${window.pageYOffset}`);
			}else{
				frameNumber = window.pageYOffset / playbackConst;
			}
			
			
			//frameNumber = window.pageYOffset / playbackConst;
			
			//track CURRENT SCROLL POSITION
			vid.currentTime = frameNumber;

			//fade out VIDEO FRAME
			if (frameNumber > 9.8) {
				pagetl.play();
				console.log("after fold, fade in web page");
			} else {
				pagetl.reverse();
				console.log("before fold, fade out web page");
			}

			window.requestAnimationFrame(scrollPlay);
		}
		
		window.requestAnimationFrame(scrollPlay);*/
			
		
		
		/* Detect Scroll Stop 
		
		function scrollStop (callback, refresh = 66) {

			// Make sure a valid callback was provided
			if (!callback || typeof callback !== 'function') return;

			// Setup scrolling variable
			let isScrolling;

			// Listen for scroll events
			window.addEventListener('scroll', function (event) {

				// Clear our timeout throughout the scroll
				window.clearTimeout(isScrolling);

				// Set a timeout to run after scrolling ends
				isScrolling = setTimeout(callback, refresh);

			}, false);

		}

		scrollStop(function () {
			console.log('Scrolling has stopped.');
		});*/
			
		function scrollVideo() {
		  var video = $('#v0').get(0),
			videoLength = video.duration,
			scrollPosition = $(document).scrollTop();

		  video.currentTime = (scrollPosition / ($(document).height() - $(window).height())) * videoLength;
		}

		$(window).scroll(function(e) {
		  scrollVideo();
		});
		
	}
	
    
	
	console.group(`DESKTOP`);
	console.log(`Is video present? ${video}`);
	console.groupEnd();
   
	}

}else{
	
	document.querySelector('.section.main-section').style.height = "auto"; //set 
	video.stop(); //stop video in case it plays in non-IOS Safari browsers/devices
	video.style.display = "none"; //remove video
	
	
	console.group(`MOBILE`);
    console.log(`Is video present? ${video}`);
    console.groupEnd();
}

/*function detectMob() {
    return ( ( window.innerWidth <= 800 ) && ( window.innerHeight <= 600 ) );
}
  
  if(detectMob() == true){
  
  document.querySelector('.main-other').style.opacity = 1;
document.querySelector('.main-other').style.heigth = "auto";
  
  console.log("mobile detected");
  
  }else{
  
  	const intro = document.querySelector("#main-section");
    var frameNumber = 0,
        playbackConst = 1000,
        setHeight = intro,
        vid = document.getElementById('v0');
		
    var tl = gsap.timeline();
    tl.to(window, {
        duration: 5,
        scrollTo: 3000,
        ease: Power1.easeOut
    });
    
    //window.onscroll = function() { tl.pause(); }

    startScroll();
    function startScroll() {

        // dynamically set the page height according to video length
        vid.addEventListener('loadedmetadata', function() {
            setHeight.style.height = ((Math.floor(vid.duration) * playbackConst)) + "px";
        });

        // Use requestAnimationFrame for smooth playback
        var first = true; //first run, set scroll at 3000 frame number position.
        var firstN = true;

        function scrollPlay() {
        
        		//detect if first page load
            var frameNumber;
            if (first == true) {
                frameNumber = 3000;
                first = false;
            } else {
                frameNumber = window.pageYOffset / playbackConst;
            }
            
            //reset
            window.onresize = () => {
              if(window.pageYOffset > 10000){
              console.log('greater');
              }else{
              console.log('less');
                if(frameNumber < 3000){
                console.log('frame less');
                  gsap.to(window, {
                      duration: 5,
                      scrollTo: 3000,
                      ease: Power1.easeOut
                  });
                }
              }
        		}
           
            
            vid.currentTime = frameNumber;
            
            //fade out video frame
            if (frameNumber > 9.8) {
                gsap.set(".box-animation", {
                    autoAlpha: 0,
                    display: "none"
                });
                gsap.to(".main-other", 1, {
                    autoAlpha: 1
                });
                gsap.set([".down-arrow-button"], {
                    autoAlpha: 0,
                    display: "none"
                });
            } else {
            
            	//fade out website content
                gsap.set(".box-animation", {
                    autoAlpha: 1,
                    display: "flex"
                });
                gsap.to(".main-other", .25, {
                    autoAlpha: 0
                });
                gsap.set([".down-arrow-button"], {
                    autoAlpha: 1,
                    display: "flex"
                });
            }
            
						// fade in scroll arrow
            if (frameNumber > 2 && frameNumber < 3) {
                if (firstN == true) {
                    firstN = false;
                    gsap.from(".scroll-arrow-cont", 1, {
                        y: "50"
                    });
                    gsap.to(".scroll-arrow-cont", 1, {
                        opacity: 1
                    });
                }
            }else{
            	gsap.to(".scroll-arrow-cont", 1, {
                        opacity: 0
                    });
            }
            window.requestAnimationFrame(scrollPlay);
        }
        window.requestAnimationFrame(scrollPlay);
    }
    
  }*/