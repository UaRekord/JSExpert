const btn = document.getElementById("play");

//объявлю в глобалке, чтоб удобнее выводить було
var newArr = [];

// 5. делаете первую букву большой, остальные маленькие
const firstLetter = (param) => param.charAt(0).toUpperCase() + param.substr(1).toLowerCase();

//6. Для поля url: добавить перед ним «http://»
const addHttp = (param) => "http://" + param;

//7.  делаете обрезание до 15 символов. После добавляем многоточие (…)
const truncDesc = (param) => param.substr(0, 15) + "...";

// 8_9.Для поля date: 
const getDate = (ms) => moment(ms).format("YYYY-MM-DD HH:mm");

//10. Для поля params: из значений ключей сформировать строку типа «true=>80»
// функция будет работоспособна для любого количества элементов объекта params
const convertParams = (params) => `${params.status}=>${params.progress}`;

//12. Теперь с помощью функции filter вам необходимо выбрать только те элементы у которых isVisible == true
const filterByIsVisible = (item) => item.isVisible;

//13. вывод
const output = (array) => console.table(array);

function getConvertedArray(arr) {
    return arr.map(function (item) {
        return {
            name: firstLetter(item.name),
            url: addHttp(item.url),
            description: truncDesc(item.description),
            date: getDate(item.date),
            params: convertParams(item.params),
            isVisible: item.params.status
        }
    });
 
}

function transform() {

    //1. вырезать 6-й элемент массива. Массив должен стать короче на один элемент
    data.splice(5, 1);

    //клонирую массив. Я понимаю, что это не самый оптимальный способ, 
    //но на чистом JS работает железобетонно для любого уровня вложенности объектов в массив.
    newArr = JSON.parse(JSON.stringify(data));
    
    //2. избавьтесь от ключа id
    newArr.forEach(function (item, index) {
        delete item.id;
    });

    //3. По новому массиву объектов, полученному с помощью функции forEach пройдитесь методом map()
    //4. преобразоваем его поля по следующим правилам и выводим
     output(getConvertedArray(newArr).filter(filterByIsVisible));
    //можно посмотреть вывод не заходя в консоль
    //document.getElementById("result").innerHTML = JSON.stringify((newArr), null, "<br>");
}

btn.addEventListener("click", transform);

