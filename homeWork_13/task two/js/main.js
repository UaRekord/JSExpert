//const, мы ведь ничего переопределять не будем
const btn = document.getElementById("play");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");

//стрелочная теперь, она простая можно и так записать
const getPlayerResult = () => Math.floor((Math.random() * 3) + 1);

function runGame() {
    let firstPlayer = getPlayerResult(),
        secondPlayer = getPlayerResult();

    //2. На экран вывести полученную текстовую строку для каждого из игроков.
    player1.innerHTML = getNameById(firstPlayer);
    player2.innerHTML = getNameById(secondPlayer);

    printResult(determineWinner(firstPlayer, secondPlayer));

    /*3. Написать функцию (determineWinner), которая будет принимать два числа,
    предварительно полученные в функции getPlayerResult и принимать решение, кто из игроков выиграл.
    тут логика элеиентарная
    */

    function determineWinner(firstPlayer, secondPlayer) {
        let resultGame;
        if (firstPlayer === secondPlayer) {
            resultGame = 0;
        }
        else if (((firstPlayer === 1) && (secondPlayer === 2)) || ((firstPlayer === 2) && (secondPlayer === 3)) || ((firstPlayer === 3) && (secondPlayer === 1))) {
            resultGame = 1;
        }
        else {
            resultGame = 2;
        }
       return resultGame;
    }
/* Вместо того чтоб выводить на экран случайное число как в примере вам необходимо
добавить функцию (getNameById) которая будет принимать это число и возвращать слово «камень»,
«ножницы», или «бумага», согласно словарю указанному выше.
4. Результатом выполнения функции determineWinner должно быть число, номер игрока, который выиграл.
То есть эта функция должна возвращать номер игрока который выиграл*/

    function getNameById(num) {
        let name = "";
        switch (num) {
            case 1: name = "камень";
                break;
            case 2: name = "ножницы";
                break;
            default: name = "бумага";
        }
        return name;
    }
    /* 5. Функция printResult должна принять номер игрока, который выиграл и напечатать
    в div Id result текстовое сообщение типа: «выиграл первый игрок» номер игрока надо вывести словами.*/

    function printResult(input) {
        const result = document.getElementById("result");
        let output = "Выиграл ",
            ending = "игрок";
        switch (input) {
            case 1: output += "первый " + ending;
                break;
            case 2: output += "второй " + ending;
                break;
            default: output = "Ничья, нажмите кнопку 'Играть' еще раз";
        }
        result.innerHTML = output;
        return;
    }
}

btn.addEventListener("click", runGame);
