/*
    Assignment 2020/2021
    Course:         AACS1483 - Web Design and Development
    Website Name:   Lo'vest 69 Restaurant
    Author:         Tan Eng Lip
    Filename:       login.js

    function:       To validate the data and save in session storage .

*/
function checking() {
    var Create_username=sessionStorage.getItem("create_username");
    var Create_password=sessionStorage.getItem("create_password");
    var username = document.getElementById("username").value;
    var password=document.getElementById("password").value;

    if(username== "") {
        alert("Please enter your username.");
        document.getElementById("username").focus();
        return false;
    }
    else if(password== "") {
        alert("Please enter your password.");
        document.getElementById("password").focus();
        return false;
    }
    else if(Create_username != username) {
        alert("Please enter valid username.");
        document.getElementById("username").focus();
        return false;
    }
    else if(Create_password != password ) {

        alert("Please enter valid password.");
        document.getElementById("password").focus();
        return false;
    }
    else {
        sessionStorage.setItem("userInput",username);
        window.location.href="member-exclusive.html";

    }

}

