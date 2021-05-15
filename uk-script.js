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

var scrollArrowTl = gsap.timeline({paused:true});
scrollArrowTl.from(".scroll-arrow-cont", 1, {
    y: "50"
});
scrollArrowTl.to(".scroll-arrow-cont", 1, {
    opacity: 1
});

var video = document.querySelector("#v0");

/** Detect Mobile **/
var detector = new MobileDetect(window.navigator.userAgent);

if(detector.mobile() == null ){
	
	document.querySelector('.section.main-section').style.height = 10000 + "px";
	video.play();
	TweenMax.delayedCall(3.5, video.pause, null, video);
	//TweenMax.delayedCall(3.6, startScrollBasedAnimation);
	video.onpause = function() {
    	startScrollBasedAnimation();
		console.log('paused video')
	};
	
	//** Setup scroll for video **//
	const intro = document.querySelector("#main-section");
    var frameNumber = 0,
        playbackConst = 1000,
        vid = document.getElementById('v0');    
	
	function startScrollBasedAnimation(){
	
		function scrollPlay() {

			//detect if first page load
			var frameNumber;
			frameNumber = window.pageYOffset / playbackConst;
			
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
		
		window.requestAnimationFrame(scrollPlay);
		
	}
	
    
	
	console.group(`DESKTOP`);
	console.log(`Is video present? ${video}`);
	console.groupEnd();
   
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