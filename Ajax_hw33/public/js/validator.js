'use strict';
const Validator = function (login, password) {
    //форма ввода и сообщение сверху
    const alertMessage = document.querySelector('.alert'),
          alert = ['Поля не повинні бути пустими!', 'Невірний формат e-mail!', 'Пароль повинен мати не меньше 8 символів', 'Перевірте коректність логіну та пароля!'],
            //регулярка по стандарту HTML5
          emailRegular = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    // ___________ private ______________
    const createAlertMessage = (str) => {
        alertMessage.classList.remove('hide');
        return alertMessage.innerHTML = str;
    };

    function isValid(login, password) { // проверка корректности заполнения полей формы
        let storageLogin = localStorage.getItem('login'),
            storagePassword = localStorage.getItem('password');
        if (login == '' || password == '') {
            createAlertMessage(alert[0]);
            return false;
        }
        else if (!login.match(emailRegular)) {
            createAlertMessage(alert[1]);
            return false;
        }
        else if (password.length < 8) {
            createAlertMessage(alert[2]);
            return false;
        }
        else if (login == storageLogin && password == storagePassword) {
             return true;
        }
        else {
            createAlertMessage(alert[3]);
            return false;
        }
    }
    //_______________ Public __________________
    return {
        isValid: isValid
    }
}