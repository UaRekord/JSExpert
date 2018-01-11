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
function convertParams(params) {
    let converted = "";
    for (key in params) {
        converted += params[key] + "=>"; 
    }
    return converted.slice(0, -2);
}

/* 11. Создать новое поле isVisible. Переложить в это поле значение поля params.status
 У меня на 10м шаге уже нету поля params.status. Поэтому усложню функцию, чтоб она работала
в любом месте кода, if - сработает если есть param.status, тернарник - если нету */

function createisVisible(item) {
    let element = item.isVisible; 
        tmpParam = item.params;
    if ((element === undefined) && (tmpParam.status !== undefined)) {
        element = tmpParam.status;
    }
    else {
        tmpParam.slice(0, - 4) == "true" ? element = true : element = false;
    }
    return element;
}
//12. Теперь с помощью функции filter вам необходимо выбрать только те элементы у которых isVisible == true
const filterByIsVisible = (item) => (item.isVisible) ? true : false;

//13. вывод
const output = (array) => console.table(array);

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
    //4. преобразоваем его поля по следующим правилам
    newArr.map(function (item, index) {
        item.name = firstLetter(item.name);
        item.url = addHttp(item.url);
        item.description = truncDesc(item.description);
        item.date = getDate(item.date);
        item.params = convertParams(item.params);
        item.isVisible = createisVisible(item);
        
    });

    newArr = newArr.filter(filterByIsVisible);
    output(newArr);
    //можно посмотреть вывод не заходя в консоль
    //document.getElementById("result").innerHTML = JSON.stringify((newArr), null, "<br>");
}

btn.addEventListener("click", transform);

