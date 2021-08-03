/*
    Assignment 2020/2021
    Course:         AACS1483 - Web Design and Development
    Website Name:   Lo'vest 69 Restaurant
    Author:         Thong So Xue
    Filename:       cart-js.js

    Function: This javascript file is responsible of uploading & downloading the cart contents to the session storage.
                It allows data related to the cart to be updated in real time. 
                It is also responsible of giving functionality to certain elements in the cart such as the "Delete item from cart" button.
*/

// Run after the document is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Create Session Storage for empty carts
    createSessionStorage();

    // Import previous session storage to current cart
    importSessionStorage();

    // Runs checkout button animation when hovered
    cartCheckoutButton();

    // Enable or disable checkout button linking to payment.html based on the cart is empty or not
    cartCheckoutBlank();

});



//==============================SESSION STORAGE==============================//

// Create Session Storage for empty carts
function createSessionStorage() {
    // Get previous session storage
    var cartContents = JSON.parse(sessionStorage.getItem('cart-contents'));

    // Create empty array if storage is empty
    if (cartContents == null) {
        cartContents = []
        sessionStorage.setItem('cart-contents', JSON.stringify(cartContents));
    }
}

// Import previous session storage to current cart
function importSessionStorage() {
    // Get previous session storage
    var cartContents = JSON.parse(sessionStorage.getItem('cart-contents'));

    // Clear the session storage to prevent duplicates
    sessionStorage.setItem('cart-contents', JSON.stringify([]));

    // Import all items from session storage to cart
    cartContents.forEach(item => {
        // Convert object to array
        var arr = Object.entries(item);
        // Variables needed for "add to cart" function
        var itemName, itemPrice, itemQuantity, itemImgSrc, itemHref, itemDesc;

        // Find and assign each variable to their values
        arr.forEach(el => {
            if (el[0] == 'name') { itemName = el[1] }
            if (el[0] == 'price') { itemPrice = el[1] }
            if (el[0] == 'quantity') { itemQuantity = el[1] }
            if (el[0] == 'imgsrc') { itemImgSrc = el[1] }
            if (el[0] == 'href') { itemHref = el[1] }
            if (el[0] == 'desc') { itemDesc = el[1] }
        });

        // Add item to Cart & Add item to session storage
        addToCart(itemName, itemPrice, itemQuantity, itemImgSrc, itemHref, itemDesc);
    })
}



//==============================UPDATE CART VALUES==============================

// Update all subtotal in cart
function updateCartSubtotal() {
    document.querySelectorAll('.cart-item').forEach(el => {
        // Get individual item price and quantities
        var price = parseFloat(el.querySelector('.cart-item-price span').textContent);
        var quantity = el.querySelector('.cart-item-count .count-field').value;

        // Calculate Subtotal
        var subtotal = (price * quantity);

        // Display subtotal, fixed at 2 decimal places
        var subtotalElement = el.querySelector('.cart-item-subtotal span');
        subtotalElement.textContent = subtotal.toFixed(2);
    })
}

// Update the total of cart
function updateCartTotal() {
    // Reset total to 0
    var total = 0;

    // Add each subtotal to total
    document.querySelectorAll('.cart-item-subtotal span').forEach(el => {
        total = total + parseFloat(el.textContent);
    })

    // Display total
    document.querySelector('#cart-checkout #total span').textContent = total.toFixed(2);
}

// Enable or disable checkout button linking to payment.html based on the cart is empty or not
// [Runs when user deletes an item from cart]
function cartCheckoutBlank() {
    var cartItems = document.querySelectorAll('.cart-item');        // Get all cart items
    var cartCheckout = document.querySelector('#cart-checkout');    // Get the checkout button

    // Disable hyperlink to payment.html if cart is empty
    if (cartItems.length == 0) {
        document.querySelector('#cart-checkout #total span').textContent = '0.00';  // Set total to 0.00 if cart is empty
        cartCheckout.parentElement.removeAttribute('href');     // Disable hyperlink
        cartCheckout.parentElement.classList.add('notJumping'); // Disable page transition
    }
    // Enable hyperlink to payment.html if cart has something
    else if (cartItems.length > 0) {
        cartCheckout.parentElement.setAttribute('href', 'payment.html');// Enable hyperlink
        cartCheckout.parentElement.classList.remove('notJumping');      // Enable page transition
    }
}



//==============================CHECKOUT BUTTON ANIMATION==============================

// Cart checkout button animation on hover
function cartCheckoutButton() {
    // Get Checkout button; Get total checkout amount
    var checkoutBtn = document.querySelector("#cart-checkout");
    var total = checkoutBtn.querySelector('#total')
    var valid = checkoutBtn.querySelector('#checkoutValid')
    var invalid = checkoutBtn.querySelector('#checkoutInvalid')

    // Show cart totals when hovering
    checkoutBtn.addEventListener("mouseenter", function () {
        var cartItems = document.querySelectorAll('.cart-item');
        total.style.display = 'none'
        if (cartItems.length == 0) {
            invalid.style.display = 'inline-block';
        } else if (cartItems.length > 0) {
            valid.style.display = 'inline-block'
        }
    })

    // Show 'Checkout' text when not hovering
    checkoutBtn.addEventListener("mouseleave", function () {
        invalid.style.display = 'none'
        valid.style.display = 'none'
        total.style.display = 'inline-block'
    })
}



//==============================ADD TO CART & SESSION STORAGE==============================

// Add item to Cart & Add item to Session Storage
function addToCart(itemName, itemPrice, itemQuantity, itemImgSrc, itemHref, itemDesc) {

    // Default verify to true
    var verify = true;

    // Check if item is already added to cart
    document.querySelectorAll('.cart-item-name a').forEach(el => {
        if (el.textContent == itemName) {
            alert("This item is already in your cart. ");
            verify = false; // Verify = false if the item is already in the cart
        }
    })

    // Only if the item is not yet in the cart
    if (verify == true) {
        // Create new element for the new cart item and assign its values to it
        var newCartItem = document.createElement('li');
        newCartItem.classList.add('cart-item');
        var cartList = document.querySelector('#cart-item-list ul');
        var cartItemTemplate = `
            <table>
                <tr>
                    <td class="cart-item-img" rowspan="3">
                        <a href="${itemHref}">
                            <div alt="Product Image"
                                style="background-image: url(${itemImgSrc});">
                            </div>
                        </a>
                    </td>
                    <td class="cart-item-name"><a href="${itemHref}" title="${itemName}" class="pgTransOnClick">${itemName}</a></td>
                </tr>
                <tr>
                    <td class="cart-item-desc">
                        <p>${itemDesc}</p>
                    </td>
                </tr>
                <tr>
                    <td rowspan="2" style="vertical-align: bottom;">
                        <span class="cart-item-price">Price: $<span>${itemPrice.toFixed(2)}</span></span>
                        <br />
                        <span class="cart-item-subtotal">Subtotal: $<span>0.00</span></span>
                    </td>
                </tr>
                <tr>
                    <td class="cart-item-count">
                        <button class="count-btn-minus">-</button>
                        <input class="count-field" type="number" value="${itemQuantity}" min="0" max="100" />
                        <button class="count-btn-plus">+</button>
                    </td>
                </tr>
            </table>
            <div>
                <a class="notJumping cart-item-del" title="Delete Item">
                    <img src="pics/cart-delete.png" />
                </a>
            </div>
        `

        // Append item to cart list
        newCartItem.innerHTML = cartItemTemplate;
        cartList.appendChild(newCartItem);

        // Variables assigned to current cart item
        var liElem = cartList.lastChild;
        var cartMinusNew = liElem.querySelector(".count-btn-minus");
        var cartPlusNew = liElem.querySelector(".count-btn-plus");
        var cartQuantity = liElem.querySelector(".count-field");
        var cartDelBtn = liElem.querySelector('.cart-item-del')
        var itemName = liElem.querySelector('.cart-item-name a').textContent;

        // Give functionality to the buttons in the item (eg: Quantity [+/-] Buttons, Delete button)
        // Minus quantity button
        cartMinusNew.addEventListener("click", function () {
            var quantity = parseInt(cartMinusNew.nextElementSibling.value);
            if (quantity > 1) {
                cartMinusNew.nextElementSibling.value = quantity - 1;
            }
            updateQuantityField(cartQuantity);
        });

        // Plus quantity button
        cartPlusNew.addEventListener("click", function () {
            var quantity = parseInt(cartPlusNew.previousElementSibling.value);
            if (quantity < 99) {
                cartPlusNew.previousElementSibling.value = quantity + 1;
            }
            updateQuantityField(cartQuantity);
        });

        // Quantity number input field
        cartQuantity.addEventListener('change', function () {
            updateQuantityField(cartQuantity);
        });

        // Delete item button
        cartDelBtn.addEventListener('click', function () {
            // Get the current session storage
            var cartContents = JSON.parse(sessionStorage.getItem('cart-contents'));

            // Find and delete the item from session storage
            cartContents.forEach(item => {
                // Get all values
                var arr = Object.entries(item)

                // Delete the item of the same name in the session storage
                arr.forEach(el => {
                    if (el[0] == 'name' && el[1] == itemName) {
                        var index = cartContents.indexOf(item)
                        cartContents.splice(index, 1)
                        // Update to the session storage
                        sessionStorage.setItem('cart-contents', JSON.stringify(cartContents))
                    }
                });
            });

            // Remove the item from cart
            liElem.remove();

            // Update all cart values
            updateCartSubtotal();
            updateCartTotal();
            cartCheckoutBlank();
        })

        // Create and append the new item into session storage
        var newObj = { name: itemName, price: itemPrice, quantity: itemQuantity, imgsrc: itemImgSrc, href: itemHref, desc: itemDesc }
        var cartContents = JSON.parse(sessionStorage.getItem('cart-contents'))
        cartContents[cartContents.length] = newObj
        sessionStorage.setItem('cart-contents', JSON.stringify(cartContents))

        // Give page transition feature to new hyperlinks
        pageTransitionOut();
    }

    // Update cart values
    cartCheckoutBlank();
    updateCartSubtotal();
    updateCartTotal();
}



//==============================CART BUTTONS FUNCTIONALITY==============================

// Update the Quantity field
function updateQuantityField(el) {
    // Set minimum value to 1
    if (isNaN(el.value) || el.value <= 0) {
        el.value = 1;
    }
    // Set maximum value to 99
    else if (el.value >= 100) {
        el.value = 99;
    }
    // Update cart values
    updateCartSubtotal();
    updateCartTotal();
    updateQuantityToStorage(el);
}

// Update quantity of item to session storage
function updateQuantityToStorage(self) {

    // Create and get various elements
    var cartItem = self.parentElement.parentElement.parentElement.parentElement;    // The clicked cart item
    var itemName = cartItem.querySelector('.cart-item-name').textContent;           // The name of the item
    var itemQuantity = parseInt(self.value);                                        // The new item quantity it should be
    var itemPrice, itemImgSrc, itemHref, itemDesc;                                  // Declare other item details to be used when updating the new item

    // Get current session storage
    var cartContents = JSON.parse(sessionStorage.getItem('cart-contents'));
    cartContents.forEach(item => {
        var arr = Object.entries(item);
        arr.forEach(el => {
            // Find the item name inside session storage
            if (el[0] == 'name' && el[1] == itemName) {
                // Get position of item in cart list
                index = cartContents.indexOf(item);

                // Get other details of the same item
                arr.forEach(el2 => {
                    if (el2[0] == 'price') { itemPrice = el2[1] }
                    if (el2[0] == 'imgsrc') { itemImgSrc = el2[1] }
                    if (el2[0] == 'href') { itemHref = el2[1] }
                    if (el2[0] == 'desc') { itemDesc = el2[1] }
                });

                // Replace the original item with the new updated item
                cartContents[index] = { name: itemName, price: itemPrice, quantity: itemQuantity, imgsrc: itemImgSrc, href: itemHref, desc: itemDesc }

                // Update the new item to session storage
                sessionStorage.setItem('cart-contents', JSON.stringify(cartContents));
            }
        });
    });

}