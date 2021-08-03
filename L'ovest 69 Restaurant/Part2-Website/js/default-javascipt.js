/*
    Assignment 2020/2021
    Course:         AACS1483 - Web Design and Development
    Website Name:   Lo'vest 69 Restaurant
    Author:         Thong So Xue
    Filename:       default-javascript.js

    Function: This is the default layout javascript that will be applied to all html files in the website. 
                Plays the page transition animation when entering or leaving a page.
                Hides the header when scrolling down, and shows the header when scrolling up.
                Shows the cart when hovered on the cart icon, and hides the cart when the mouse leaves a certain area.
                Shows the "Back to Top" button when user is not at the top of site.
                Show the navigation menu when clicked on the "Hamburger Icon" which only appears on smaller screens.    
*/

// Run after the document is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Runs Functions that need to be run on load
    pageOnLoad();

    // Page transition when leaving page (Clicked on hyperlink)
    pageTransitionOut();

    // Get initial scroll position
    var prevScrollpos = window.pageYOffset;
    // When user scrolls
    window.onscroll = function () {
        // Shrink header when scrolling down, Show header when scrolling up
        //  Get header; Get Logo white diamond Background
        var navBar = document.getElementById("navBar");
        var navDiamond = document.getElementById("navLogoDiamond");

        // Get current scroll position
        var currentScrollPos = window.pageYOffset;

        // Shrink Header when scroll down
        if (prevScrollpos > currentScrollPos) {
            navBar.style.top = "0";
            navDiamond.style.top = "-60px";
        }
        // Show Header when scroll up 
        else {
            navBar.style.top = "-50px";
            navDiamond.style.top = "-45px";
        }

        // Update current scroll position 
        prevScrollpos = currentScrollPos;


        // Show or Hide Back to Top Icon
        backToTopScroll();

        // Hides cart when scrolling
        hideOverlayOnScroll();
    }

    // Show cart when mouse hover onto cart icon
    cartShowAndHide();

    // Give functionality to the "Hamburger" Icon that only appears when using smaller screens
    hamburgerIcon();

});



// Runs Functions that need to be run on load
function pageOnLoad() {
    // Page transition when entering page
    pageTransitionIn()

    // Correct Back to Top icon position
    backToTopInitialized()

    // Get Cart Dropdown, default to hidden
    var dropContent = document.querySelector("#dropdown-content");
    dropContent.classList.add("cartDropUp")
}


// Page transition when entering page
function pageTransitionIn() {
    // *Everything is hidden on startup
    // Get 69 Logo
    var logo = document.querySelector('#navLogo');
    // Get White Screen Dropdown
    var pgTrans = document.querySelector('#page-transition');

    // Show everything that is initially hidden (To have smooth white transitions)
    document.body.style.visibility = "visible";
    // White Screen is dropped down initially
    pgTrans.classList.add("downed");

    // Move 69 Logo from center to Top
    setTimeout(function () {
        logo.classList.remove("pageCenterIn");
        logo.classList.add("pageTop");
    }, 1000);
    // Slide up White Screen
    setTimeout(function () {
        pgTrans.classList.add("upped");
    }, 1100);
};



// Page transition when leaving page (Clicked on hyperlink)
function pageTransitionOut() {
    // When user leaves a page (Clicked on hyperlinks)    
    document.querySelectorAll("a:not(.notJumping)").forEach(el => {
        if (el.classList.contains('pageTransOutAnimation') == false) {
            el.addEventListener("click", function () {
                pgTransOutAnimation(el);
            });
            el.classList.add('pageTransOutAnimation');
        }
    });
}

function pgTransOutAnimation(clicked) {

    // Get 69 Logo; Get White screen dropdown
    var logo = document.querySelector('#navLogo');
    var pgTrans = document.querySelector('#page-transition');

    // Get Initial Link
    var hrefLink = clicked.getAttribute("href");
    // Cancel leaving page event
    event.preventDefault();

    // Slide down white screen
    pgTrans.classList.remove("upped");
    pgTrans.classList.add("downed");

    // Move Logo from top to center
    setTimeout(function () {
        logo.classList.remove("pageTop");
        logo.classList.add("pageCenterOut");
    }, 50);

    // Hide everything except logo and white screen (For smooth transition)
    setTimeout(function () {
        document.querySelectorAll("body:not(#page-transition)").forEach(el => {
            el.style.visibility = "hidden";
        })
    }, 400);

    // Lastly leave the page after animation is finished
    setTimeout(function () {
        window.location.href = hrefLink;
    }, 1000);
}


// Correct Back to Top position when page loaded
function backToTopInitialized() {
    // Get Back to top Icon
    var backToTop = document.getElementById("back-to-top");

    // Show if not at top of page
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        backToTop.style.right = "1%";
    }
    // Hide if at top of page
    else {
        backToTop.style.right = "-90px";
    }
}

// Show or Hide Back to Top Icon
function backToTopScroll() {
    // Get Back to top Icon
    var backToTop = document.getElementById("back-to-top");

    /* Show if not at top of page */
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        backToTop.style.right = "1%";
    }
    /* Hide if at top of page */
    else {
        backToTop.style.right = "-90px";
    }
}


/*============================== CART ==================================*/

// Hides cart when scrolling
function hideOverlayOnScroll() {
    var dropContent = document.querySelector("#dropdown-content");
    var dropHitbox = document.querySelectorAll(".dropdown-hitbox");

    // Hide cart slide up detection box
    dropHitbox.forEach(el => {
        el.style.display = "none";
    });

    // Slide up cart
    dropContent.classList.remove("cartDropDown");
    dropContent.classList.add("cartDropUp");

    // Close the Navigation Menu
    if (navList.classList.contains('extended')) {
        navList.classList.remove('extended');
    }
}


// Show and hide cart on hover
function cartShowAndHide() {
    // Get Cart Dropdown
    var dropContent = document.querySelector("#dropdown-content");
    // Get cart dropdown detection box
    var dropHitbox = document.querySelectorAll(".dropdown-hitbox");
    // Get cart icon
    var cartIcon = document.querySelector("#cart-icon");
    // Cart icon playing animation = False
    var isPlaying = false;
    // Get the navigation Menu
    var navList = document.querySelector('#navList');


    // Show cart when mouse hover onto cart icon
    cartIcon.addEventListener("click", function () {
        // Cart icon shake animation
        if (isPlaying == false) {
            isPlaying = true;
            cartIcon.style.animationPlayState = "running";
            setTimeout(function () {
                cartIcon.style.animationPlayState = "paused";
                isPlaying = false;
            }, 495);
        }

        // Close the Navigation Menu
        if (navList.classList.contains('extended')) {
            navList.classList.remove('extended');
        }

        // Slide down the cart detection hitboxes
        dropHitbox.forEach(el => {
            el.style.display = "block";
        });

        // SLide down the cart
        dropContent.classList.toggle("cartDropDown");

    });


    // Hide Cart when mouse leave
    dropHitbox.forEach(el => {
        el.addEventListener("mouseover", function () {
            dropHitbox.forEach(el2 => {
                el2.style.display = "none";
            });
            dropContent.classList.remove("cartDropDown");
        });
    });
}

// Give functionality to the "Hamburger" Icon that only appears when using smaller screens
function hamburgerIcon() {
    var cart = document.querySelector("#dropdown-content");

    document.querySelector('#hamburger-icon').addEventListener('click', function () {
        document.querySelector('#navList').classList.toggle('extended');
        if (cart.classList.contains('cartDropDown')) {
            cart.classList.remove('cartDropDown');
        }
    });
}