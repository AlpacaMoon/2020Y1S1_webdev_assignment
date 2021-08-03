/*
    Assignment 2020/2021
    Course:         AACS1483 - Web Design and Development
    Website Name:   Lo'vest 69 Restaurant
    Author:         Wang Shu Wei
    Filename:       event-slideshow.js

    Function:   Slideshow of event pictures. 
*/

/* Slideshow for Special Events */
var slideIndex1 = 1;
showDivs1(slideIndex1);
        
function plusDivs1(n) {
    showDivs1(slideIndex1 += n);
}
        
function showDivs1(n) {
    var i;
    var x = document.getElementsByClassName("slideshow1");
    if (n > x.length) {
        slideIndex1 = 1
    }
    if (n < 1) {
        slideIndex1 = x.length
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
    x[slideIndex1-1].style.display = "block";  
}


/* Slideshow for Corporate Events */
var slideIndex2 = 1;
showDivs2(slideIndex2);

function plusDivs2(n) {
    showDivs2(slideIndex2 += n);
}

function showDivs2(n) {
    var i;
    var x = document.getElementsByClassName("slideshow2");
    if (n > x.length) {
        slideIndex2 = 1
    }
    if (n < 1) {
        slideIndex2 = x.length
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
    x[slideIndex2-1].style.display = "block";  
}


/* Slideshow for Social Events */
var slideIndex3 = 1;
showDivs3(slideIndex3);
        
function plusDivs3(n) {
    showDivs3(slideIndex3 += n);
}
        
function showDivs3(n) {
    var i;
    var x = document.getElementsByClassName("slideshow3");
    if (n > x.length) {
        slideIndex3 = 1
    }
    if (n < 1) {
        slideIndex3 = x.length
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
    x[slideIndex3-1].style.display = "block";  
}