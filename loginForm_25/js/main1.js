'use strict';
const logIn = new LoginService();

logIn.setLogAndPass({
    login: 'testmail@mailbox.sl',
    password: 'aeg64z4#sv5'
});

logIn.initEventListeners();