/* 
*  Схематическое изображение класса Галереи
*/
class BaseGallery {
    constructor() {
        this.tempArr = [];
        this.galleryBlock = document.getElementById('gallery');
        this.byName = document.getElementById('dropdown-name');
        this.byDate = document.getElementById('dropdown-date');
        this.typeOfSorting = 'acs';
    }

    getServerData() {
        const url = 'http://localhost:3000/cars';
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.tempArr = this.prepareInputArray(response);
                this.sorting(this.tempArr);
                this.buildingGallery();
            });
    }
    
    truncDesc(param) {
            return param.substr(0, 15) + "...";
    }// обрезаю описание

    addHttp(param) {
            param = "http://" + param;
            return param;
        }// преобразование URL

    getDate(ms) {
            return moment(ms).format("YYYY-MM-DD HH:mm");
        } // форматирую дату

    getConvertedArray(item) {
            return {
                name: item.name,
                url: this.addHttp(item.url),
                description: this.truncDesc(item.description),
                date: this.getDate(item.date),
                id: item.id
            }
        }
     
    rawStrings(item) {
        let secondItemTemplate;
        secondItemTemplate = `<div class="col-md-4">
        <div class="card mb-4 box-shadow">
            <img class="card-img-top" alt="${item.name}" src="${item.url}">
            <div class="card-body">
		    <h3>${item.name}</h3>
            <p class="card-text">${item.description}</p>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                    <button type="button" class="btn btn-outline-secondary" data-id="${item.id}">View</button>
                </div>
                <small class="text-muted">${item.date}</small>
            </div>
        </div>
      </div>
   </div>`;
        return secondItemTemplate;
    }

    prepareInputArray(arr) {
        let newArr = [];
        newArr = arr.map(a => Object.assign({}, a)); // клонирую массив
        for (let key in newArr) {
            newArr[key] = this.getConvertedArray(newArr[key]);
        }
        return newArr;
    }

    buildingGallery() {
        let result = '';
        for (let key in this.tempArr) {
            result += this.rawStrings(this.tempArr[key]);
        }
        this.galleryBlock.innerHTML = result;
    }

   sorting(arr) { // обработчик селект-боксов
       this.galleryBlock.innerHTML = ""; // обнуляю содержимое галереи
       if (localStorage.getItem('sorting')) {
            this.typeOfSorting = localStorage.getItem('sorting');
       }
        switch (this.typeOfSorting) { //в зависимости от выбранного способа запускаем нужную функцию из вышеописанных
            case "acs": // сортировка по имени от А до Я
                arr.sort((a, b) => (a.name > b.name));
                break;
            case "desc": // сортировка по имени от Я до А
                arr.sort((a, b) => (a.name < b.name));
                break;
            case "new": // сортировка по дате сначала новые
                arr.sort((a, b) => (a.date < b.date));
                break;
            case "old": // сортировка по дате сначала старые
                arr.sort((a, b) => (a.date > b.date));
                break;
            default:
                return;
        }
   }

    initEventListeners() {
        this.byDate.addEventListener("click", this.sortingHandler.bind(this));
        this.byName.addEventListener("click", this.sortingHandler.bind(this));
    }

    sortingHandler() {
        let sortItem = event.target.getAttribute('data-type');
        if (!!sortItem) {
           this.typeOfSorting = sortItem;
           localStorage.setItem('sorting', this.typeOfSorting);
           this.sorting(this.tempArr);// подготовка данных для галереи
           this.buildingGallery();
        }    
    }
        
    init() {
        this.initEventListeners.call(this);
        this.getServerData();
     }
}


 let ExtendedGallery = function () {
        BaseGallery.apply(this);
        this.property = {};
    }
    ExtendedGallery.prototype = {

        initListeners: function () {
            BaseGallery.prototype.initListeners.apply(this);
        },

        addImage: function () {
            // новый метод которого нет у родителя
        }

}
// код функции наследования можно найти архиве, который содержится 
// в материалах к сессии 29 (практический пример)
// service.inheritance(BaseGallery, ExtendedGallery);