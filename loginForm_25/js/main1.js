'use strict';
const enterButton = document.getElementById('enterButton'),
      backButton = document.getElementById('backAboutUser'),
      showButton = document.getElementById('showButton');

const logIn = new LoginService();

function initEventListeners() {
    enterButton.addEventListener("click", logIn.initComponent);
    backButton.addEventListener("click", logIn.back);
    showButton.addEventListener("click", logIn.showHidePass);
}

logIn.setLogAndPass({
    login: 'testmail@mailbox.sl',
    password: 'aeg64z4#sv5'
});

initEventListeners();