/*
    Assignment 2020/2021
    Course:         AACS1483 - Web Design and Development
    Website Name:   Lo'vest 69 Restaurant
    Author:         Thong So Xue
    Filename:       payment.js

    Function:   Show or hide the 'Pay Online' or 'Cash on Delivery' overlay.
                Change the input form according to which payment method is chosen above. 
                Hover animation for the submit button.
                Uploads cart contents to the bought lists and clear the cart when submitting the payment. 
                Uploads certain input contents to cache to be used in the receipts page. 
*/

// Run after the document is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Show or hide the 'Pay Online' or 'Cash on Delivery' overlay
    s1BtnsClickAction();

    // Hover animation for the submit button
    s2sub3BtnsAnimation();

});

// Show or hide the 'Pay Online' or 'Cash on Delivery' overlay
function s1BtnsClickAction() {
    var s1Btns1div = document.querySelectorAll('#s1-btns-1 > div');
    var s1Gray = document.querySelector('#slide1');
    var s2Method = document.querySelector('#slide2-sub1 #currentMethod');
    var s2chgMethod = document.querySelector('#slide2-sub1 #changeMethod');
    var s2CardSet = document.querySelector('#slide2-sub2 #payDetails');

    s1Btns1div.forEach(btn => {
        btn.addEventListener('click', function () {
            s1Gray.classList.add('notAppear');
            s2Method.textContent = btn.textContent;
            if (btn.textContent == 'Pay Online') {
                s2CardSet.style.display = 'block';
                s2CardSet.querySelectorAll('select, input').forEach(el => {
                    el.setAttribute('required', true);
                })
            } else if (btn.textContent == 'Cash on Delivery') {
                s2CardSet.style.display = 'none';
                s2CardSet.querySelectorAll('select, input').forEach(el => {
                    el.removeAttribute('required');
                })
            }
        })
    })

    s2chgMethod.addEventListener('click', function () {
        s1Gray.classList.remove('notAppear');
    })
}

// Hover animation for the submit button
function s2sub3BtnsAnimation() {
    var sub3btnGrp = document.querySelector('#slide2-sub3 #submit-btn-grp');
    var sub3SubmitBtn = sub3btnGrp.querySelector('#submit-confirm');
    var sub3TotalBtn = sub3btnGrp.querySelector('#submit-total');

    sub3TotalBtn.addEventListener('mouseover', function () {
        sub3SubmitBtn.classList.add('totalHovered');
        sub3TotalBtn.classList.add('totalHovered');
    })

    sub3TotalBtn.addEventListener('mouseout', function () {
        sub3SubmitBtn.classList.remove('totalHovered');
        sub3TotalBtn.classList.remove('totalHovered');
    })
}

// Uploads cart contents to bought lists and remove all cart contents. Also gets the entered info to be used in the receipts page. 
function submitForm() {

    // Inform user form is submitted
    alert('Form Submitted!');

    // Create empty cache storage
    var boughtItemsCache = [];
    // Get previous bought items 
    var boughtList = JSON.parse(sessionStorage.getItem('bought-items'));
    var cartContents = JSON.parse(sessionStorage.getItem('cart-contents'));

    // Create empty array if storage is empty
    if (boughtList == null) {
        boughtList = [];
    }

    var custName = document.querySelector('#custNameField').value;
    let custMain = document.querySelector('#custAddressField').value;
    let custCity = document.querySelector('#custCityField').value;
    let custState = document.querySelector('#custStateField').value;
    let custZip = document.querySelector('#custZipField').value;

    ['Kuala Lumpur', 'Labuan', 'Putrajaya'].forEach(el => {
        if (custState == el)
            custState = 'Wilayah Persekutuan ' + custState;
    })

    var custAddress = custMain + ', ' + custZip + ', ' + custCity + ', ' + custState + '.';

    // Get the current date and time
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var datetime = date + ' ' + time;
    var absTime = today.getTime();

    boughtDetailsCache = {'name': custName, 'address': custAddress, 'date': date};

    // Copy cart contents to bought items
    cartContents.forEach(item => {
        var arr = Object.entries(item);
        var itemName, itemPrice, itemQuantity;
        arr.forEach(el => {
            if (el[0] == 'name') { itemName = el[1] }
            if (el[0] == 'price') { itemPrice = el[1] }
            if (el[0] == 'quantity') { itemQuantity = el[1] }
        })
        var newItem = { 'name': itemName, 'price': itemPrice, 'quantity': itemQuantity };
        var newEntry = { 'item': newItem, 'datetime': datetime, 'absTime': absTime };
        boughtList[boughtList.length] = newEntry;
        boughtItemsCache[boughtItemsCache.length] = newItem;
    });

    // Update bought items and clear cart contents
    sessionStorage.setItem('bought-items', JSON.stringify(boughtList));
    sessionStorage.setItem('cart-contents', JSON.stringify([]));
    sessionStorage.setItem('bought-items-cache', JSON.stringify(boughtItemsCache));     // For payment-complete.html use
    sessionStorage.setItem('bought-details-cache', JSON.stringify(boughtDetailsCache)); // For payment-complete.html use

    // Play Page Transition Animation
    // Get 69 Logo; Get White screen dropdown
    var logo = document.querySelector('#navLogo');
    var pgTrans = document.querySelector('#page-transition');

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
        });
    }, 400);

    // Redirect to the receipts page when the page transition animation is done
    setTimeout(function () {
        document.forms[0].submit();
        window.location.href = "payment-complete.html";
    }, 1000);
}