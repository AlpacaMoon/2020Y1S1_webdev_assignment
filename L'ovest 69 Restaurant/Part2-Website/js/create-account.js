/*
    Assignment 2020/2021
    Course:         AACS1483 - Web Design and Development
    Website Name:   Lo'vest 69 Restaurant
    Author:         Tan Eng Lip
    Filename:       register.js

    function:       To validate the data input and store in session storage.

*/
function register() {
    var Input_username = document.getElementById("input_username").value;
    var Input_email = document.getElementById("input_email").value;
    var Input_gender = document.getElementById("input_gendertype").value;
    var Input_password = document.getElementById("input_password").value;


    if (Input_username == "") {
        alert("Please enter your username.");
        document.getElementById("input_username").focus();
        return false;
    }
    else if (Input_email == "") {
        alert("Please enter your email.");
        document.getElementById("input_email").focus();
        return false;
    }
    else if (Input_gender == "") {
        alert("Please enter your gender.");
        document.getElementById("input_gendertype").focus();
        return false;
    }
    else if (Input_password == "") {
        alert("Please enter your password.");
        document.getElementById("input_password").focus();
        return false;
    }
    else {
        sessionStorage.setItem("create_username", Input_username);
        sessionStorage.setItem("create_password", Input_password);
        window.location.href = "login.html";
    }

}
