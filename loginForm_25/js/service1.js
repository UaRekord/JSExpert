'use strict';
function LoginService() {
   const pass = document.getElementById('passwordAboutUser'),
         buttonShow = document.getElementById('showButton'),
         dangerMessage = document.querySelector('.alert'),
         inputEmail = document.getElementById('inputEmail'),
         inputPassword = document.getElementById('inputPassword'),
         aboutUser = document.querySelector('.aboutUser'),
         mainForm = document.getElementById('mainForm'),
         loginAboutUser = document.getElementById('loginAboutUser'), //регулярка по стандарту HTML5
         emailRegular = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

   let inputObj = {
         login: '',
         password: ''
   };
                    //_________________________ PRIVATE _________________________ 
   // надпись сверху красным, если неправильный ввод в поля формы
   const createDangerMessage = (str) => {
       dangerMessage.classList.remove('hide');
       return dangerMessage.innerHTML = str;

   };
   function isValid() { // проверка корректности заполнения полей формы
       let storageLogin = localStorage.getItem('login'),
           storagePassword = localStorage.getItem('password');
       inputObj.login = inputEmail.value;
       inputObj.password = inputPassword.value;
       if (inputObj.login == '' || inputObj.password == '') {
           createDangerMessage('Поля не повинні бути пустими!');
           return false;
       }
       else if (!inputObj.login.match(emailRegular)) {
           createDangerMessage('Невірний формат e-mail!');
           return false;
       }
       else if (inputObj.login == storageLogin && inputObj.password == storagePassword) {
           return true;
       }
       else {
           createDangerMessage('Перевірте коректність логіну та пароля!');
           return false;
       }
   } 
                    //_________________________ PUBLIC _________________________ 
   this.back = function() { // работает по нажатию кнопки выхода из профиля, возвращает форму ввода логина и пароля
       aboutUser.classList.toggle('hide');
       mainForm.classList.toggle('hide');
       dangerMessage.classList.add('hide');
   }

   this.showHidePass = function() {  //функция скрыть-показать пароль, меняет цвет, текст кнопки и символы пароля
       if (buttonShow.getAttribute('data-state') == 'close') { //  на звездочки и наоборот
            pass.value = inputObj.password;
            buttonShow.innerHTML = 'Спрятать пароль';
            buttonShow.setAttribute('data-state', 'open');
            buttonShow.classList.toggle('btn-danger');
            buttonShow.classList.toggle('btn-success');
       }
       else {
            buttonShow.innerHTML = 'Показать пароль';
            pass.value = inputObj.password.replace(/./g, '*');
            buttonShow.setAttribute('data-state', 'close');
            buttonShow.classList.toggle('btn-danger');
            buttonShow.classList.toggle('btn-success');
       }
   }
   //  сеттер, принимаю объект и кладу в localStorage
   this.setLogAndPass = function(obj) {
        for (var key in this.obj) {
            localStorage.setItem(key, obj[key]);
        }
   }              
   this.initComponent = function() { //логика приложения
            if (isValid()) {
                aboutUser.classList.remove('hide');
                mainForm.classList.add('hide');
                loginAboutUser.value = inputObj.login;
                pass.value = inputObj.password.replace(/./g, '*');
            }   
    }                          
}