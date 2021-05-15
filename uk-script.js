// JavaScript Document

//Global
var pagetl = gsap.timeline({
    paused: true
});
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

var scrollArrowTl = gsap.timeline({
    paused: true
});
scrollArrowTl.from(".scroll-arrow-cont", 1, {
    y: "50"
});
scrollArrowTl.to(".scroll-arrow-cont", 1, {
    opacity: 1
});
var video = document.querySelector("#v0");
var main_section = document.querySelector('.section.main-section');
var detector = new MobileDetect(window.navigator.userAgent);
var tl;
var console = window.console;
var gsap = window.gsap;

function videoPause(){
	video.pause();
	console.log(`Video Paused`);
}

window.addEventListener("wheel", stopAutoScroll);

var first = true;

function stopAutoScroll() {
	if(first == true){
		videoPause();
		gsap.killTweensOf(window);
		first = false;
		console.log(`Autoscroll Stopped`);
	}
}

function startScrollBasedAnimation() {
	
    function scrollVideo() {
        var video = $('#v0').get(0),
            videoLength = video.duration,
            scrollPosition = $(document).scrollTop();

        video.currentTime = (scrollPosition / ($(document).height() - $(window).height())) * videoLength;
    }

    $(window).scroll(function() {
        scrollVideo();
    });

    console.group(`DESKTOP`);
    console.log(`Is video present? ${video}`);
    console.groupEnd();

}

/** Detect Mobile **/
if (detector.mobile() == null) {

    main_section.style.height = 10000 + "px";
    video.play();
	video.ontimeupdate = function() {
		
		if(video.currentTime > 3){
			console.log("AT TIME" + video.duration);
			videoPause();
		}
	
	};
    //TweenMax.delayedCall(3.5, videoPause, null, video);

    video.onpause = function() {
        startScrollBasedAnimation();
        console.group("Paused Video Info");
        console.log('paused video');
        console.log(`Current time is ${video.currentTime} on pause`); //3.361449, 3.418976, 3.045391, 3.422562
        console.log(`Current Y offset ${window.pageYOffset}`)
        console.groupEnd();
    };

    //** Setup scroll for video **//

    tl = gsap.timeline();
    tl.to(window, {
        duration: 5,
        scrollTo: 3500,
        ease: Power1.easeOut
    });
	
    startScrollBasedAnimation();

} else {

    main_section.style.height = "auto"; //set 
    video.stop(); //stop video in case it plays in non-IOS Safari browsers/devices
    video.style.display = "none"; //remove video


    console.group(`MOBILE`);
    console.log(`Is video present? ${video}`);
    console.groupEnd();

}

