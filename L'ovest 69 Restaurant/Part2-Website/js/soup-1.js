/*
    Assignment 2020/2021
    Course:         AACS1483 - Web Design and Development
    Website Name:   Lo'vest 69 Restaurant
    Author:         Thong So Xue
    Filename:       soup-1.js

    Function:   Soup list box slide in animation when user scrolled to the slide 2 section.
                Provide functionality to the soup list box pagination.  
                Display soup items with an index order using loops.
                Display the respective soup item overlay when clicked on a soup item. 
                Play slide down animation when user reaches the slide 2 section.
                Show a snackbar that links to slide 3 when user is in the slide 2 section
*/

// Run after the document is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Intro Animation when user scrolls until the second slide
    slide2Intro();

    // Show a snackbar that links to slide 3 when user is in the slide 2 section
    jumpToSlide3();

    // Update the soup list whenever user clicks on another page
    pageActiveUpdate();

    // An overlay displaying the current selected soup product and its details
    soupItemOverlay();

});

// Object list of all Soup Product
var soupList = [
    { name: 'Vichyssoise Cream Soup', price: 19.90, imgsrc: 'pics/soup/vichyssoise-cream-soup.jpeg', desc: 'This thick and delicious creamy soup, made of boiled and puréed leeks, onions, potatoes, cream and chicken stock are guaranteed to bring you back to the 19th century of France. Its chillingness is worth trying for hot days like what he had in Malaysia, but it could also be served hot and both could still taste good.' },
    { name: 'Pumpkin Soup', price: 17.90, imgsrc: 'pics/soup/pumpkin-soup.jpg', desc: 'As a popular dish during Thanksgiving, its purée from local pumpkins always warms everyone around the table. By combining the meat of a blended pumpkin with broth, it can be served both hot or cold while still maintaining the taste of bound pumpkin smells. It also works well when served with a slice of crispy pumpkin pie.' },
    { name: 'Carrot Soup', price: 12.90, imgsrc: 'pics/soup/carrot-soup.jpg', desc: 'You could already tell how nutritious it is just from its name. Our version of carrot soups are prepared with puréed carrot which provides thick consistency while still being smooth in texture. As a classic dish in French cuisine, its freshness from its ingredients and its variance in cooking had also gained much popularity.' },
    { name: 'Creamy Broccoli Soup', price: 12.90, imgsrc: 'pics/soup/vegetable-soup.jpg', desc: 'Although it may not sound appealing to children, this award-winning vegetable has an outstanding touch of sweetness with the intelligent use of Vidalia onions and butters. The thick craving is also designated to enhance the soup flavor while still maintaining the original taste of freshness of the broccolis.' },
    { name: 'Shrimp Chowders', price: 16.90, imgsrc: 'pics/soup/shrimp-soup.jpeg', desc: 'Also known as prawn soup, we use the freshiest shrimps obtainable from Penang and cooked according to the traditional Icelandic cuisine. The resulting taste reserves the touch of local street food yet contains the sweet and smoky flavor of frozen Icelandic shrimps. The Creole seasoning and the garlic powders also enhances the aroma of the dish.' },
    { name: 'Tomato Soup', price: 12.90, imgsrc: 'pics/soup/tomato-soup.jpeg', desc: 'Using tomatoes as its primary ingredients, the combination of the smooth texture and some sour cream as the topping not only tops the flavor to another level but even enhances the familiar smell of the classic tomato soups. It is also ideal with some saltine crackers as the side material.' },
    { name: 'Mushroom Soup', price: 12.90, imgsrc: 'pics/soup/mushroom-soup.jpg', desc: 'If soups are from a role-playing game, this soup dish will definitely be the final boss, but our version of mushroom soup would make it higher. This dish is made by thinning a basic roux with some natural cream milk from Austrailia and adding Cremini mushrooms as the main and mini portobello mushrooms as the side, along with some broth to spice it up.' },
    { name: 'Creamy Cauliflower Soup', price: 14.90, imgsrc: 'pics/soup/cauliflower-soup.jpg', desc: 'This soup calls for basic ingredients but yields amazing flavor. The combination of roasted cauliflower and creaminess borrowed from butters well develops the caramelized notes with a luxurious flavor and texture. A little bit of nutmeg and lemon juice is also added to create a mystic yet fantastic kick to the soup.' },
    { name: 'Creamy Chicken Soup', price: 14.90, imgsrc: 'pics/soup/chicken-soup.jpg', desc: 'With some consolidation of chicken broth, tomatoes and beans boiled together with some garlic and jalepenos as the enhancer, the resulting dish could be outstanding if the weighs and timings are just right. If that is not enough, some lime wedges, grilled tortilla strips, avocado slices and finally cheese would bring the flavor to another level.' },
    { name: 'Clam Chowders', price: 17.90, imgsrc: 'pics/soup/clam-chowder.jpg', desc: 'Coming from America, this dish offers something more than just clams. Our clam chowders had included some of the finest diced potatoes from Peru, salt porks, onions and some celery as the finishing touch. We also serve the clam chowders with some saltine crackers to spice up the dining process.' },
    { name: 'Borscht Soup', price: 16.90, imgsrc: 'pics/soup/borscht.jpg', desc: 'The traditional red beetroot soup known as Broscht has really aged well from Ukraine and is slowly gaining popularity in the global market. Packed with beetroots, beans, potatoes, carrots and cabbage, its richness in nutrition and free of meat is also optimal for the vegetarian rising trend recently.' },
    { name: 'French Onion Soup', price: 16.90, imgsrc: 'pics/soup/french-onion.jpg', desc: 'Based on meat stock and caramelized onions, this finely deglazed soup actually tastes more than just onions. This dish is also served with exquisitely toasted French baguette sprinkled with some grated Gruyere cheese and Parmesan, which when combined will bring this dish to perfection.' },
    { name: 'Butternut Soup', price: 14.90, imgsrc: 'pics/soup/butternut-soup.jpeg', desc: 'Although with a different name, this soup is actually an pretty similar to pumpkin soups, but what it offers is more than just pumpkin. Our bowl of creamy butternut squash soup is made of finely roasted caramelized butternuts with some toasted pepitas as an extra visual appeal, and the results is ultra creamy and full of complex flavor.' },
    { name: 'GreenRich Beef Soup', price: 17.90, imgsrc: 'pics/soup/beef-soup.jpg', desc: 'The mix of broth, tomatoes, browned beef, some herbs and seasoning is the basics of this soup, but with the addition of green beans, corns, peas and parsley, this dish is now ready to serve your tongue and we guarantee you that you will not want this dish to be served as the appetizing.' },
    { name: 'Sour Cream Soup', price: 12.90, imgsrc: 'pics/soup/sour-cream-soup.jpg', desc: 'Although sounds a bit bland, it actually offers a taste that you will not expect. Plain butter and nutmegs are the base of this dish, but different from other dishes, we made the base of this dish extra thick, which makes the touch of aftertaste extremely satisfying. Along with some tomatoes as the sides, this dish will not back down when facing other dishes. ' }
]

// Intro Animation when user scrolls until the second slide
function slide2Intro() {
    var slide2 = document.querySelector('#slide2');          // Second slide
    var vl = document.querySelector('#slide2-vl-main');      // Vertical Line in second slide
    var whiteBox = document.querySelector('#soup-list-box'); // The white box containing the soup list
    var runned = false;                                      // To ensure soupListUpdate() only run once on startup (to fix showing multiple duplicates on startup bug)

    // Runs everytime user scrolls
    document.addEventListener('scroll', function () {
        // If user reaches second slide
        if (window.scrollY >= slide2.getBoundingClientRect().top && !runned) {
            // Play vertical line extend animation
            vl.classList.add('extended');

            // Play white box extend animation
            setTimeout(function () {
                whiteBox.classList.add('extended');
            }, 400);

            setTimeout(function () {
                // Play pagination box extend animation
                document.querySelector('#soup-list-pagination').classList.add('extended');

                // Only update the soup list once on startup
                if (!runned) {
                    soupListUpdate();
                    runned = true;
                }
            }, 600);
        }
    });
}

// Show a snackbar that links to slide 3 when user is in the slide 2 section
function jumpToSlide3() {
    // Run on scroll
    document.addEventListener('scroll', function () {

        // Get the distance between slide 2 and the top of page
        var s2Dist = 0, elem;
        elem = document.querySelector('#slide2');
        do {
            s2Dist += elem.offsetTop;
            elem = elem.offsetParent;
        } while (elem);

        // Get the distance between slide 3 and the top of page
        var s3Dist = 0;
        elem = document.querySelector('#slide3');
        do {
            s3Dist += elem.offsetTop;
            elem = elem.offsetParent;
        } while (elem);

        // Only show snackbar when user is inside slide 2
        if (window.scrollY < s2Dist - 500) {
            document.querySelector('#slide3Bar').classList.add("hideUnder");
        } else if (window.scrollY < s3Dist - 300) {
            document.querySelector('#slide3Bar').classList.remove("hideUnder");
        } else {
            document.querySelector('#slide3Bar').classList.add("hideUnder");
        }
    })
}

// Update the soup list whenever user clicks on another page
function pageActiveUpdate() {
    var allPages = document.querySelectorAll('#soup-list-pagination .pageNo');  // Get pagination list
    var pgTransitioning = false;                                                // Switching page animation running state

    allPages.forEach(el => {
        // Run if user clicked on a page number
        el.addEventListener('click', function () {
            // Only run if the switching page animation isn't running
            if (pgTransitioning == false) {
                pgTransitioning = true;
                var num = parseInt(el.textContent); // Get the clicked number
                var currentActivePg = document.querySelector('#soup-list-pagination .active'); // Get the current active page

                // Only run if the number clicked isn't the current page
                if (parseInt(currentActivePg.textContent) != num) {
                    currentActivePg.classList.remove('active'); // Remove the active style from the current page
                    allPages.forEach(el2 => {
                        if (parseInt(el2.textContent) == num) {
                            el2.classList.add('active');        // Add the active style to the chosen page
                        }
                    });
                    // Update the soup list according to the page number
                    soupListUpdate();
                }

                // Only allow user to choose other pages after the animation is finished
                setTimeout(function () {
                    pgTransitioning = false;
                }, 750)
            }
        });
    });
}

// Update the soup list according to the chosen page
function soupListUpdate() {
    var soupListDiv = document.querySelector('#soup-list');      // Get the soup List
    var currentPage = parseInt(document.querySelector('#soup-list-pagination .active').textContent); // Get the current page number
    var pgIndex = (currentPage - 1) * 6;        // Get the prefix index for each page

    soupListDiv.classList.remove('boxAppear');  // Make the soup list invisible

    // Change the soup items while the soup list is invisible
    setTimeout(function () {
        // Remove all current soup items in the list
        document.querySelectorAll('.soup-item').forEach(el => {
            el.remove();
        })

        // Add the soup items according to the current page number
        for (let i = 0; i < 6; i++) {
            if (soupList[i + pgIndex] != null) {
                // Retrieve soup item details from soupList Object list above
                var array = Object.entries(soupList[i + pgIndex]);
                itemName = array[0][1];
                itemPrice = array[1][1].toFixed(2);
                itemImgSrc = array[2][1];

                // Create new soup item according to info retrieved from soupList
                var newSoupItem = document.createElement('LI');
                var newSoupItemTemplate = `
                    <span class="soup-item-name">${itemName}</span>
                    <span class="soup-item-price">$${itemPrice}</span>
                `
                newSoupItem.innerHTML = newSoupItemTemplate;
                newSoupItem.classList.add('soup-item');
                newSoupItem.style.backgroundImage = `url(${itemImgSrc})`;

                // Place the soup item inside soup list
                soupListDiv.appendChild(newSoupItem);
            }
        }
    }, 400);

    // Show the soup list when all soup items are changed according to the current page number
    setTimeout(function () {
        soupItemOverlay();                      // Add click event listener to all soup items
        soupListDiv.classList.add('boxAppear'); // Show the soup list
    }, 500)
}

// An overlay displaying the current selected soup product and its details
function soupItemOverlay() {
    var soupItems = document.querySelectorAll('.soup-item');    // Get all soup items
    var grayOverlay = document.querySelector('#grayOverlay');   // Get the gray overlay
    var boxOverlay = document.querySelector('#overlayBox');     // Get the white box overlay
    var opened = false;

    soupItems.forEach(el => {
        // Run when user clicked on a soup item
        el.addEventListener('click', function () {
            if (opened == false) {
                // Show the overlay
                grayOverlay.classList.add('show');
                boxOverlay.classList.add('show');
                opened = true;

                // Get the soup item clicked
                var itemNameClicked = el.querySelector('.soup-item-name').textContent;
                var itemName, itemPrice, itemImgSrc, itemDesc;

                // Retrieve soup item details from soupList Object list above
                soupList.forEach(el => {
                    var arr = Object.entries(el)
                    if (itemNameClicked == arr[0][1]) {
                        itemName = arr[0][1];
                        itemPrice = arr[1][1].toFixed(2);
                        itemImgSrc = arr[2][1];
                        itemDesc = arr[3][1];
                    }
                });

                // Create white box overlay with dedicated information correspond to which item clicked
                boxOverlay.innerHTML = `
                    <div id="overlayImg"></div>
                    <div id='overlayName'><span>${itemName}</span></div>
                    <div id="overlayPrice"><span>$${itemPrice}</span></div>
                    <div id="overlayDesc"><span>${itemDesc}</span></div>
                    <div id="overlayCart"><button onclick="addToCart('${itemName}', ${itemPrice}, 1, '${itemImgSrc}', 'soup-1.html  ', '${itemDesc}')">Add to Cart</button></div>
                `

                boxOverlay.querySelector('#overlayImg').style.backgroundImage = `url(${itemImgSrc})`;

                let cartContents = JSON.parse(sessionStorage.getItem('cart-contents')); // Get the current cart items
                let cartBtn = boxOverlay.querySelector('#overlayCart');                 // Get the Add to Cart button

                // Check if the soup item clicked is already in the cart
                cartContents.forEach(item => {
                    let arr = Object.entries(item)
                    arr.forEach(attr => {
                        // If an item with the same name is in the cart: 
                        if (attr[0] == 'name' && attr[1] == itemName) {
                            // Disable add to cart function
                            cartBtn.innerHTML = '<button>&check; ADDED TO CART</button>'
                        }
                    });
                });

                // Disable add to cart again after adding to cart once
                cartBtn.addEventListener('click', function () {
                    cartBtn.innerHTML = '<button>&check; ADDED TO CART</button>'
                });
            }

        });

        // Close the overlay if user clicked anywhere outside the white box overlay
        grayOverlay.addEventListener('click', function () {
            grayOverlay.classList.remove('show');
            boxOverlay.classList.remove('show');
            setTimeout(function () {
                opened = false;
            }, 300);
        })
    })
}