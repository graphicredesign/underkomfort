// JavaScript Document
window.onload = function(){
  // Some code

	
//Global
var video = document.querySelector("#v0");
video.load();
var main_section = document.querySelector('.section.main-section');
var main_video = document.querySelector('.main-video');
var detector = new MobileDetect(window.navigator.userAgent);
var console = window.console;
var gsap = window.gsap;

	
//First Load
var first = true;
video.pause(); //pause video
var autoScrollTl = gsap.timeline(); //pause scrolling
autoScrollTl.pause();

var reverseBtnTl = gsap.timeline({paused: true});
reverseBtnTl.to(".scroll-arrow-button", .25, {autoAlpha: 0, delay:5});
reverseBtnTl.to(".down-arrow-button", .25, {autoAlpha: 1});
	
	
// Create a condition that targets viewports at least 768px wide
const mediaQuery = window.matchMedia('(min-width: 991px )'); //991 px or more

function handleTabletChange(e) {
  // Check if the media query is true
  if (e.matches) {
    // Then log the following message to the console
	reverseBtnTl.restart();
	autoScrollTl.totalProgress(0); 
	autoScrollTl.restart(); //start scrolling
    console.log('Media Query Matched!');
  }
}

// Register event listener
mediaQuery.addListener(handleTabletChange)

//video.load();
// Initial check
video.onloadeddata = function () {
	console.log("video has loaded")
  handleTabletChange(mediaQuery);
	
};

autoScrollTl.to(window, {
	duration: 2,
	scrollTo: 2000,
	delay:.25,
	ease: Power1.easeOut
});

console.log(`Current length of video is ${video.duration}`);
console.log("1")

function stopAutoScroll() { //stop video on mouse scroll
	if(first == true){
		video.pause(); //stops video
		gsap.killTweensOf(window); //stops auto scroll on window
		first = false; //makes sure this only happens once
		console.log(`#1 if wheel, 2# if paused - Auto Stopped`);
	}
}

function scrollVideo() { //reference: https://codepen.io/juanbrujo/pen/KJdst

    var video = $('#v0').get(0),
        videoLength = video.duration,
        scrollPosition = window.pageYOffset; //$(document).scrollTop();
	
	/*console.group("DEBUG");
	console.log(`Scroll Position is ${scrollPosition}`);
	console.log(`Document Height is ${$(document).height()}`);
	console.log(`Window Height is ${$(window).height()}`);
	console.groupEnd();*/
	
    video.currentTime = (scrollPosition / ($(document).height() - $(window).height())) * (16); //videoLength

   /* console.group("Window Scrolling Information");
    console.log(`#3 Video is being scrolled`);
    console.log(`Current time is ${video.currentTime}`);
	console.log(`Current Y offset ${window.pageYOffset}`);
    console.groupEnd();*/

}

$(window).scroll(function() {
	scrollVideo();
});

window.addEventListener("wheel", wheelScroll);

function wheelScroll() {
	
	if(first == true){
		stopAutoScroll();
		gsap.to(".scroll-arrow-button", .25, {autoAlpha: 0});
		gsap.to(".down-arrow-button", .25, {autoAlpha: 1});
		gsap.set(".scroll-arrow-button", {autoAlpha: 0});
	}
	
	/*console.group("Wheel Scrolling Information");
	console.log(`Current time is ${video.currentTime}`);
	console.log(`Current Y offset ${window.pageYOffset}`);
	console.groupEnd();*/
	
}

/*console.group("#2 Paused Video + Scroll Initiated");
console.log(`Current time is ${video.currentTime} on pause`); //3.361449, 3.418976, 3.045391, 3.422562
console.log(`Current Y offset ${window.pageYOffset}`);
console.groupEnd();*/

/*video.onpause = function() { //starts scroll animation once video stops
	
		
};*/

video.ontimeupdate = function() {
		
		//console.log(`This is the current time: ${video.currentTime} during play`);
		
		if(video.currentTime > 9.85){
			gsap.to(main_section, .25, {autoAlpha: 0});
			console.log("Video auto-stopped here: " + video.duration);
		}else{
			gsap.to(main_section, .25, {autoAlpha: 1});
		}
	
};


/** Detect Device **/
if (detector.mobile() == null) { //Desktop

    //main_section.style.height = ((Math.floor(video.duration) * 1000)) + "px";
	
	/*console.group(`DESKTOP`);
	console.log("#1 Video has completely loaded.");
	console.log(`Dynamic Height ${main_section.style.height}`);
	console.log(window.pageYOffset);
	console.log(window.scrollTop);
	console.groupEnd();*/

} else {

    //main_section.style.height = "auto"; //set 
    video.pause(); //stop video in case it plays in non-IOS Safari browsers/devices
    video.style.display = "none"; //remove video
	video.parentNode.removeChild(video);
	
    /*console.group(`MOBILE`);
    console.log(`Is video present? ${video}`);
	console.log(`Dynamic Height ${main_section.style.height}`);
    console.groupEnd();*/
	
}

for (let func in console) {
   //console[func] = function() {};
}
	
};