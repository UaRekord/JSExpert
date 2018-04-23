/* 
*  Схематическое изображение класса Логин формы
*/

const LoginForm = function (user, validatorModule, galleryModule) {	
	this.validator = validatorModule;
    this.gallery = galleryModule;
    this.inputObj = user;
    this.enterButton = document.getElementById('enterButton');
    this.exitButton = document.getElementById('exitButton');
    this.aboutUserMenu = document.getElementById('aboutUser');
    this.aboutUserBlock = document.getElementById('aboutUserBlock');
    this.galleryMenu = document.getElementById('galleryMenu');
    this.galleryBlock = document.getElementById('mainGalleryBlock');
    this.loginForm = document.getElementById('loginForm');
    this.loginAboutUser = document.getElementById('loginAboutUser');
    this.passwordInput = document.getElementById('passwordAboutUser'),
    this.inputEmail = document.getElementById('inputEmail'),
    this.inputPassword = document.getElementById('inputPassword');
}

LoginForm.prototype = {

	initComponent: function (){
        this.setLogAndPass(this.inputObj);
        this.initEventListeners();
        this.router();
        this.gallery.init();
    },

    router: function () {
        (!localStorage.getItem('logged')) && this.loginForm.classList.remove('hide');
        if (localStorage.getItem('location') == 'gallery') {
            this.loginForm.classList.add('hide');
            this.showGallery();
        }
        else if (localStorage.getItem('location') == 'aboutUser') {
            this.loginForm.classList.add('hide');
            this.exitButton.classList.remove('hide');
            this.aboutUserBlock.classList.remove('hide');
            this.aboutUserMenu.classList.add('font-weight-bold');
        }
    },

    setLogAndPass: function () {
        for (let key in this.inputObj) {
            localStorage.setItem(key, this.inputObj[key]);
        }
        this.loginAboutUser.value = localStorage.getItem('login');
        this.passwordInput.value = localStorage.getItem('password').replace(/./g, '*');
    },

    validateUserData: function () {
        if (this.validator.isValid(this.inputEmail.value, this.inputPassword.value)) {
            localStorage.setItem('location', 'gallery');
            localStorage.setItem('logged', true);
            this.showGallery();
            this.loginForm.classList.toggle('hide');
        }
    },

    showGallery: function () {
        if (localStorage.getItem('logged')) {
            this.exitButton.classList.remove('hide');
            this.galleryMenu.classList.add('font-weight-bold');
            this.galleryBlock.classList.remove('hide');
            this.aboutUserBlock.classList.add('hide');
        }
    },

    showGalleryHandler: function () {
        this.showGallery();
        if (localStorage.getItem('logged')) {
            localStorage.setItem('location', 'gallery');
            this.galleryMenu.classList.add('font-weight-bold');
            this.aboutUserMenu.classList.remove('font-weight-bold');
        }
    },

    initEventListeners: function () {
        this.enterButton.addEventListener("click", () => {
            event.preventDefault();
            this.validateUserData();
        }),

        this.exitButton.addEventListener("click", () => {
            localStorage.removeItem('logged');
            localStorage.removeItem('location');
            this.loginForm.classList.remove('hide');
            this.exitButton.classList.add('hide');
            this.galleryBlock.classList.add('hide');
            this.aboutUserBlock.classList.add('hide');
            this.galleryMenu.classList.remove('font-weight-bold');
            this.aboutUserMenu.classList.remove('font-weight-bold');
        }),

        this.galleryMenu.addEventListener("click", this.showGalleryHandler.bind(this));

        this.aboutUserMenu.addEventListener("click", () => {
            if (localStorage.getItem('logged')) {
                localStorage.setItem('location', 'aboutUser');
                this.aboutUserMenu.classList.add('font-weight-bold');
                this.galleryMenu.classList.remove('font-weight-bold');
                this.galleryBlock.classList.add('hide');
                this.aboutUserBlock.classList.remove('hide');
            }

        });
    }
}

