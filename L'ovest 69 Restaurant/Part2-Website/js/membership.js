/*
    Assignment 2020/2021
    Course:         AACS1483 - Web Design and Development
    Website Name:   Lo'vest 69 Restaurant
    Author:         Thong So Xue
    Filename:       membership.js

    Function:   Hover animation for the buttons in slide1. 
                Cover the click area to the whole button for 'Login' and 'Create an Account' buttons. 
*/

// Run after the document is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Slide 1 Button Hover Animation
    s1BtnAttributes();
    
});

// SLide 1 button Hover Animation
function s1BtnAttributes() {
    // Get Various Elements
    var loginBtn = document.querySelector('#loginPgHref');
    var regisBtn = document.querySelector('#registerPgHref');
    var ORtxt = document.querySelector('#intervalOR');
    var firstDiv = document.querySelector('#s1-container > div:first-of-type');
    var secDiv = document.querySelector('#s1-container > div:nth-of-type(2)');

    // Second Row Hover Animations
    secDiv.addEventListener('mouseover', function() {
        firstDiv.classList.add('btnHovered');
        secDiv.classList.add('btnHovered');
    });
    secDiv.addEventListener('mouseout', function() {
        firstDiv.classList.remove('btnHovered');
        secDiv.classList.remove('btnHovered');
    });

    // 'Login' button hover animation
    loginBtn.addEventListener('mouseover', function() {
        loginBtn.classList.add('btnHovered');
        ORtxt.classList.add('hideSelf');
    });
    loginBtn.addEventListener('mouseout', function() {
        loginBtn.classList.remove('btnHovered');
        ORtxt.classList.remove('hideSelf');
    })

    // 'Create an Account' hover animation
    regisBtn.addEventListener('mouseover', function() {
        regisBtn.classList.add('btnHovered');
        ORtxt.classList.add('hideSelf');
    });
    regisBtn.addEventListener('mouseout', function() {
        regisBtn.classList.remove('btnHovered');
        ORtxt.classList.remove('hideSelf');
    });

    // Define 'Login' & 'Create an account' button click area
    loginBtn.addEventListener('click', function() {
        loginBtn.querySelector('a').click();
    });
    regisBtn.addEventListener('click', function() {
        regisBtn.querySelector('a').click();
    })
}

