/*
    Assignment 2020/2021
    Course:         AACS1483 - Web Design and Development
    Website Name:   Lo'vest 69 Restaurant
    Author:         Tan Eng Lip
    Filename:       member_exclusive.js

    function:       To do the slideshow.

*/
var slideIndex = 0;
showSlides()

/*get username from local storage*/
document.getElementById("result").innerHTML=sessionStorage.getItem("userInput");

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("Slides");
    var dots = document.getElementsByClassName("dot");
    /*for slides */
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;           
    if (slideIndex > slides.length) {
        slideIndex = 1
    }      

    slides[slideIndex - 1].style.display = "block";

    /*for dots */
    for (i = 0; i < dots.length; i++) {   
        dots[i].className = dots[i].className.replace("active", "");
    }
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 3000);
}
