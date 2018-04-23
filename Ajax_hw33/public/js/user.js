'use strict';
const UserFactory = () => ({
    showButton: document.getElementById('showButton'),
    backButton: document.getElementById('backAboutUser'),
    passwordInput: document.getElementById('passwordAboutUser'),

    showHidePass: function () {
        if (showButton.getAttribute('data-state') == 'close') { //  на звездочки и наоборот
            this.passwordInput.value = localStorage.getItem('password');
            showButton.innerHTML = 'Спрятать пароль';
            showButton.setAttribute('data-state', 'open');
            showButton.classList.toggle('btn-danger');
            showButton.classList.toggle('btn-success');
        }
        else {
            showButton.innerHTML = 'Показать пароль';
            this.passwordInput.value = this.passwordInput.value.replace(/./g, '*');
            showButton.setAttribute('data-state', 'close');
            showButton.classList.toggle('btn-danger');
        }
    },

    initEventListeners: function () {
        this.backButton.addEventListener("click", () => {
            loginForm.showGalleryHandler();
        });
        showButton.addEventListener("click", this.showHidePass.bind(this));
    }
});

let userModule = UserFactory();
userModule.initEventListeners();