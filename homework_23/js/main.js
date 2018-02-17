'use strict';
(function () {
    let newArr = [],
        delCount = 0,
        tempArr = [];
    const btn = document.getElementById('play'),
        closeWrap = document.getElementById('wrap'),
        closeWindow = document.getElementById('window').classList,
        closeSymbol = document.querySelector('.close'),
        closeBtn = document.querySelector('.closebtn'),
        secondBlock = document.querySelector('#second-line');
    const addHttp = (param) => "http://" + param; // преобразование URL
    const truncDesc = (param) => param.substr(0, 15) + "..."; // обрезаю описание
    const getDate = (ms) => moment(ms).format("YYYY-MM-DD HH:mm"); // форматирую дату
    // переделано по рекомендации Евгения, использованы классы Bootstrap
    const showModal = () => {   //показываю модальное окно, если закончились картинки
        closeWindow.add('show');  //html код и css стили я добавил заранее
        closeWrap.classList.add('show');
    }
    const closeModal = () => {   //закрываю модальное окно, если пользователь не выбрал как строить галерею
        closeWindow.remove('show');  //html код и css стили я добавил заранее
        closeWrap.classList.remove('show');
    }
    const determineItemsCount = (count, length) => `Блоков загружено: ${count} шт., осталось: ${length} шт.`; // считаю количество элементов для показа галереи

    //выдергиваем данные из массива для галереи
    function getConvertedArray(item) {
        return {
            name: item.name,
            url: addHttp(item.url),
            description: truncDesc(item.description),
            date: getDate(item.date),
            id: item.id
        }
    }

   function rawStrings(item) {
        let secondItemTemplate; 
        secondItemTemplate = `<div class="col-sm-4 col-md-3 col-xs-6" id="box">
        <div class="contain thumbnail">
        <img src="${item.url}" alt="${item.name}">
        <div class="info-wrapper">
           <div class="text-muted">${item.name}</div>
           <div class="text-muted top-padding">${item.description}</div>
          <div class="text-muted">${item.date}</div>
          <div class="btn btn-danger btn-delete" id="${item.id}">Видалити</div>
        </div>
     </div>
   </div>`;
        return secondItemTemplate;
    }

    function startListeners() {
        document.querySelector('#second-line').addEventListener("click", hideElement);
        btn.addEventListener("click", init);
        closeWrap.addEventListener("click", closeModal);
        closeSymbol.addEventListener("click", closeModal);
        closeBtn.addEventListener("click", closeModal);
        document.querySelector('#type-selector').addEventListener("change", Sorting);
        document.querySelector('#type-selector').addEventListener("click", Sorting);
    }

    function hideElement() {
        let target = event.target;
        
        if (target.classList.contains('btn')) {
            target.parentNode.parentNode.parentNode.remove(); // убираю ноду из HTML
            delCount++;
            btn.classList.remove('disabled');
            document.getElementById('deleteCount').innerHTML = `Удалено блоков: ${delCount}`;
            for (let key in newArr) {
                if (target.id == newArr[key].id) {
                    tempArr.push(newArr[key]);
                    newArr.splice(key, 1);
                }
            }
        }
    }

    function Sorting() { // обработчик селект-бокса
        let val = document.querySelector('#type-selector').value;
        secondBlock.innerHTML = ""; // обнуляю содержимое галереи
        switch (val) { //в зависимости от выбранного способа запускаем нужную функцию из вышеописанных
            case "1": // сортировка по имени от А до Я
                newArr.sort((a, b) => (a.name > b.name));
                localStorage.setItem('value', '1');
                break;
            case "2": // сортировка по имени от Я до А
                newArr.sort((a, b) => (a.name < b.name));
                localStorage.setItem('value', '2');
                break;
            case "3": // сортировка по дате сначала новые
                newArr.sort((a, b) => (a.date < b.date));
                localStorage.setItem('value', '3');
                break;
            case "4": // сортировка по дате сначала старые
                newArr.sort((a, b) => (a.date > b.date));
                localStorage.setItem('value', '4');
                break;
            default:
                return;
        }
        for (let key in newArr) {       
            secondBlock.innerHTML += rawStrings(newArr[key]); //строю новую галерею 
        }
    }
    // здесь сортировка наоборот, чтобы удалять элементы с конца массива и добавлять в конец массива
    function prepareInputArray(arr) {
        let val = localStorage.getItem('value'),
            tempArray = arr.map(a => Object.assign({}, a)); // клонирую массив
        switch (val) { //в зависимости от выбранного способа запускаем нужную функцию из вышеописанных
            case "2": // сортировка по имени от А до Я
                tempArray.sort((a, b) => (a.name > b.name));
                break;
            case "1": // сортировка по имени от Я до А
                tempArray.sort((a, b) => (a.name < b.name));
                break;
            case "4": // сортировка по дате сначала новые
                tempArray.sort((a, b) => (a.date < b.date));
                break;
            case "3": // сортировка по дате сначала старые
                tempArray.sort((a, b) => (a.date > b.date));
                break;
            default:
        }
        document.querySelector('#type-selector').value = val;
        for (let key in tempArray) {
            tempArray[key] = getConvertedArray(tempArray[key]);
        }
        return tempArray;
    }

    function init() {
        let countBlock = document.getElementById('count');
        if (tempArr.length > 0) {
            newArr.push(tempArr[tempArr.length - 1]);
            tempArr.pop();
            secondBlock.innerHTML += rawStrings(newArr[newArr.length - 1]);
            countBlock.innerHTML = determineItemsCount(newArr.length, tempArr.length);
        }
        else  {
        btn.classList.add('disabled');
            showModal();
        }
}
    startListeners();
    tempArr = prepareInputArray(data);// подготовка данных для галереи
}());