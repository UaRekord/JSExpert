'use strict';
const enterButton = document.getElementById('enterButton'),
      backButton = document.getElementById('backAboutUser'),
      showButton = document.getElementById('showButton');

function initEventListeners() {
    enterButton.addEventListener("click", loginService.initComponent);
    backButton.addEventListener("click", loginService.back);
    showButton.addEventListener("click", loginService.showHidePass);
}

loginService.setLogAndPass({
    login: 'testmail@mailbox.sl',
    password: 'aeg64z4#sv5'
});

initEventListeners();