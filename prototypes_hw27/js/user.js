'use strict';
const User = function () {
    this.showButton = document.getElementById('showButton');
    this.backButton = document.getElementById('backAboutUser');
    this.passwordInput = document.getElementById('passwordAboutUser');
}

    User.prototype = {

        showHidePass: function () {
            if (this.showButton.getAttribute('data-state') == 'close') { //  на звездочки и наоборот
                this.passwordInput.value = localStorage.getItem('password');
                this.showButton.innerHTML = 'Спрятать пароль';
                this.showButton.setAttribute('data-state', 'open');
                this.showButton.classList.toggle('btn-danger');
                this.showButton.classList.toggle('btn-success');
            }
            else {
                this.showButton.innerHTML = 'Показать пароль';
                this.passwordInput.value = this.passwordInput.value.replace(/./g, '*');
                this.showButton.setAttribute('data-state', 'close');
                this.showButton.classList.toggle('btn-danger');
                this.showButton.classList.toggle('btn-success');
            }
        },

        initEventListeners: function () { 
            this.backButton.addEventListener("click", () => {
                loginForm.showGalleryHandler();
            });
            showButton.addEventListener("click", this.showHidePass.bind(this));
        }
    }

    let userModule = new User();
    userModule.initEventListeners();
    