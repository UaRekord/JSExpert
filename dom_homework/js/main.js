'use strict'
var first = document.querySelector('.first-group').classList,
    second = document.querySelector('.second-group').classList,
    third = document.querySelector('.third-group').classList;
    
const determineHowToBuild = () => document.getElementById("type-selector").value; // определяю метод построения галереи
const addHttp = (param) => "http://" + param; // преобразование URL
const truncDesc = (param) => param.substr(0, 15) + "..."; // обрезаю описание
const getDate = (ms) => moment(ms).format("YYYY-MM-DD HH:mm"); // форматирую дату
const showModal = () => {   //показываю модальное окно, если пользователь не выбрал как строить галерею
    document.getElementById('window').style.display = "block";  //html код и css стили я добавил заранее
    document.getElementById('wrap').style.display = "block";
}
const closeModal = () => {   //закрываю модальное окно, если пользователь не выбрал как строить галерею
    document.getElementById('window').style.display = "none";  //html код и css стили я добавил заранее
    document.getElementById('wrap').style.display = "none";
}
// считаю количество элементов для показа галереи
function determineItemsCount(arr) {
    let count = document.getElementById('line-selector').value;
    (count != 0) ? count *= 3 : count = arr.length;
    return count;
}

//скрываю все блоки 
function hideAll() {
    first.add('hide');
    second.add('hide');
    third.add('hide');
}

//выдергиваем данные из массива для галереи
function getConvertedArray(arr) {
    return arr.map(function (item) {
        return {
            name: item.name,
            url: addHttp(item.url),
            description: truncDesc(item.description),
            date: getDate(item.date)
            }
    });
}

//replace метод
function replace(arr) {
    let resultHTML = "",
        replaceItemTemplate = '<div class="col-sm-3 col-xs-6">\
    <img src="$url" alt="$name" class="img-thumbnail">\
    <div class="info-wrapper">\
    <div class="text-muted">$name</div>\
    <div class="text-muted top-padding">$description</div>\
    <div class="text-muted">$date</div>\
    </div>\
    </div>';
    for (let i = 0; i < determineItemsCount(arr); i++) {
        resultHTML += replaceItemTemplate
            .replace(/\$name/gi, arr[i].name)
            .replace("$url", arr[i].url)
            .replace("$description", arr[i].description)
            .replace("$date", arr[i].date);
        // console.log(resultHTML); все консоль логи в отладочных целях глянуть что там 
    }
    return resultHTML;
}

function rawStrings(arr) {
    let resultHTML = "";
       for (let i = 0; i < determineItemsCount(arr); i++) {
       let secondItemTemplate = `<div class="col-sm-3 col-xs-6">
   <img src="${arr[i].url}" alt="${arr[i].name}" class="img-thumbnail">
    <div class="info-wrapper">
       <div class="text-muted">${arr[i].name}</div>
       <div class="text-muted top-padding">${arr[i].description}</div>
      <div class="text-muted">${arr[i].date}</div>
    </div>
   </div>`;
       resultHTML += secondItemTemplate;
    //   console.log(resultHTML + "\n");
    }
    //   console.log(resultHTML + "\n");
    return resultHTML;
}

// createElement, append  и тд, довольно муторный способ
function createElem(arr) {
    var resultHTML = "",
        divBootstrap,
        image,
        infoWrapper,
        textMuted,
        textMutedTP,
        container = document.getElementById('third-line');

    container.innerHTML = ""; // очистка контейнера, без нее картинки добавляются по многу раз
              
    for (let i = 0; i < determineItemsCount(arr); i++) {
        divBootstrap = document.createElement('div');
        divBootstrap.className = "col-sm-3 col-xs-6";

        // создаю все элементы, присваиваю классы, пишу содержимое 
        image = document.createElement('img');
        image.className = "img-thumbnail";
        image.src = arr[i].url;
        image.alt = arr[i].name;
       
        infoWrapper = document.createElement('div');
        infoWrapper.className = "info-wrapper";

        textMuted = document.createElement('div');
        textMuted.className = "text-muted";
               
        textMutedTP = document.createElement('div');
        textMutedTP.className = "text-muted top-padding";
        textMutedTP.innerHTML = arr[i].description;

        // сборка
        container.appendChild(divBootstrap);
        divBootstrap.appendChild(image);
        divBootstrap.appendChild(infoWrapper);
        infoWrapper.appendChild(textMuted);
        textMuted.innerHTML = arr[i].date;
        infoWrapper.appendChild(textMutedTP);
        infoWrapper.appendChild(textMuted.cloneNode(true));
        textMuted.innerHTML = arr[i].name;
    }
 }

(function () {
    let btn = document.getElementById('play'),
        closeWindow = document.getElementById('wrap'),
        closeSymbol = document.querySelector('.close'),
        closeBtn = document.querySelector('.closebtn');

    
    function init() {
        
    // запускаете необходимую логику
    let firstBlock = document.querySelector('#first-line'),
        secondBlock = document.querySelector('#second-line'),
        thirdBlock = document.querySelector('#third-line'),
        newArr = getConvertedArray(data);
    
    hideAll(); //прячем все блоки, с помощью toggle показываем нужный

    switch (determineHowToBuild()) { //в зависимости от выбранного способа запускаем нужную функцию из вышеописанных
        case "1":
            first.toggle('hide'); // переключаю класс hide
            firstBlock.innerHTML = replace(newArr);
            break;
        case "2":
            second.toggle('hide');
            secondBlock.innerHTML = rawStrings(newArr);
            break;
        case "3":
            third.toggle('hide');
            createElem(newArr);
            break;
        default:
            showModal();
        }
}

btn.addEventListener("click", init);
closeWindow.addEventListener("click", closeModal);
closeSymbol.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);
})()