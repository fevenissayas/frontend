"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../styles/style.css");
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('registerForm');
    var validateEmail = function (email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    var validatePassword = function (password) {
        return password.length >= 8;
    };
    var validateForm = function (e) {
        e.preventDefault();
        var _a = form.elements, email = _a.email, password = _a.password;
        var isValid = true;
        // Validate Email
        if (!validateEmail(email.value)) {
            email.classList.add('is-invalid');
            showErrorMessage(email, "Please enter a valid email address.");
            isValid = false;
        }
        else {
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
            hideErrorMessage(email);
        }
        // Validate Password
        if (!validatePassword(password.value)) {
            password.classList.add('is-invalid');
            showErrorMessage(password, "Password must be at least 8 characters long.");
            isValid = false;
        }
        else {
            password.classList.remove('is-invalid');
            password.classList.add('is-valid');
            hideErrorMessage(password);
        }
        if (isValid) {
            // Here you would typically send the form data to your server
            console.log('Form is valid, submitting...', {
                email: email.value,
                password: password.value
            });
            // Reset form after successful submission
            form.reset();
            Array.from(form.elements).forEach(function (element) {
                // Type assertion to HTMLInputElement
                var inputElement = element;
                if (inputElement instanceof HTMLInputElement) {
                    inputElement.classList.remove('is-valid');
                }
            });
        }
        else {
            // Focus on the first invalid field
            var firstInvalid = form.querySelector('.is-invalid');
            firstInvalid === null || firstInvalid === void 0 ? void 0 : firstInvalid.focus();
        }
    };
    var showErrorMessage = function (input, message) {
        var errorMessage = input.nextElementSibling;
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.classList.add('d-block');
        }
    };
    var hideErrorMessage = function (input) {
        var errorMessage = input.nextElementSibling;
        if (errorMessage) {
            errorMessage.classList.remove('d-block');
        }
    };
    form.addEventListener('submit', validateForm);
});
