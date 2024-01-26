var stars = document.getElementById("background");
var moon = document.getElementById("background2");
var mountains_behind = document.getElementById("house");
var mountains_front = document.getElementById("front");


window.addEventListener("scroll", function(){
    var value = window.scrollY;
    stars.style.top = value * 1.2 + 'px';
    moon.style.top = value * 1.1 + 'px';
    mountains_behind.style.top = value * 0.45 +'px';
    mountains_front.style.top = value * 0 + 'px';
})