/* 
*  Схема инициализации приложения
*/
let user = {
    login: 'testmail@mailbox.sl',
    password: '12345678'
};

let validatorModule = new Validator();

let galleryModule = new BaseGallery();
//let galleryModule = new ExtendedGallery();


let loginForm = new LoginForm(user, validatorModule, galleryModule);
loginForm.initComponent();