// JavaScript Document
window.onload = function(){
  // Some code

	
//Global
var video = document.querySelector("#v0");
video.load();

var main_section = document.querySelector('.section.main-section');
//var main_video = document.querySelector('.main-video');
var detector = new MobileDetect(window.navigator.userAgent);
var console = window.console;
var gsap = window.gsap;
var videoLength;
	
//First Load
var first = true;
//video.pause(); //pause video
var autoScrollTl = gsap.timeline(); //pause scrolling
//autoScrollTl.pause();

var reverseBtnTl = gsap.timeline({paused: true});
reverseBtnTl.to(".scroll-arrow-button", .25, {autoAlpha: 0, delay:5});
reverseBtnTl.to(".down-arrow-button", .25, {autoAlpha: 1});
	
// Initial check
video.onloadeddata = function () {
	console.log("video has loaded")
	
};

autoScrollTl.to(window, {
	duration: 2,
	scrollTo: 2000,
	delay:.25,
	ease: Power1.easeOut
});

function scrollVideo() { //reference: https://codepen.io/juanbrujo/pen/KJdst

    videoLength = video.duration,
    scrollPosition = window.pageYOffset; //$(document).scrollTop();
    video.currentTime = (scrollPosition / ($(document).height() - $(window).height())) * (16);
	
	console.dir(video)

}

$(window).scroll(function() {
	
	scrollVideo();
	
});

video.ontimeupdate = function() {
		
		if(video.currentTime > 9.85){
			gsap.to(main_section, .25, {autoAlpha: 0});
			console.log("Video auto-stopped here: " + video.duration);
		}else{
			gsap.to(main_section, .25, {autoAlpha: 1});
		}
	
};

for (let func in console) {
   //console[func] = function() {};
}
	
};