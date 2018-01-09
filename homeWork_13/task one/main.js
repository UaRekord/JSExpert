'use strict';
function game() { //заворачиваю весь код в функцию и экранирую от внеешней среды
    var first = 0,
        second = 0,
        total = 0,
        ending = "",
        result = "";
    const element = document.getElementById("result");
    //Сделать функцию для получения случайных чисел getRndNumber
    const getRndNumber = () => Math.floor((Math.random() * 6) + 1);

    //Сделать одну функцию которая будет склеивать все строки в одну
    const setResult = (...rest) => rest.join("");

    //Сделать функцию для определения совпадений
    const isNumberEqual = (a, b) => (a === b) ? setResult("Выпал дубль ", first, " : ", second, "<br>") : "";

    //Сделать функцию для определения разницы
    const isBigDifference = (a, b) => {
        if ((a < 3 && second > 4) || (b > 4 && a < 3)) {
            return setResult("Большой разброс между костями. Разница составляет: ", Math.abs(second - first), "<br>");
        }
        else {
            return "";
        }
    }
    //бизнес-логика
    (function run() { //Создать главную самозапускающуюся функцию run() в которой будет выполняться основной код (цикл)
        for (let i = 0; i < 15; i++) {
            if (i == 8 || i == 13) {
                continue;
            }
            //Значение каждой переменной, в которую мы записываем,
            //какая выпала кость получать с помощью вызова этой функции
            first = getRndNumber();
            second = getRndNumber();

            result += setResult("Первая кость: ", first, " Вторая кость: ", second, "<br>");
            result += isNumberEqual(first, second);
            result += isBigDifference(first, second);

            total += first + second;
        }
        if ((total % 10) == 1) {
            ending = "очко";
        }
        else if (((total % 10) == 2) || ((total % 10) == 3) || ((total % 10) == 4)) {
            ending = "очка";
        }
        else {
            ending = "очков";
        }
        result += (total > 100) ? setResult("Победа, вы набрали ", total, " ", ending) : setResult("Вы проиграли, у Вас ", total, " ", ending);

        element.innerHTML = result;
    }());

}

game();
