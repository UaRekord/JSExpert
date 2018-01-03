//const, мы ведь ничего переопределять не будем
const btn = document.getElementById("play");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const result = document.getElementById("result");
//стрелочная теперь, она простая можно и так записать
const getPlayerResult = () => Math.floor((Math.random() * 3) + 1);
const printResult = (gameResult) => result.innerHTML = gameResult; 

function runGame() {
    player1.innerHTML = getNameById(getPlayerResult());
    player2.innerHTML = getNameById(getPlayerResult());
    printResult(determineWinner(player1.innerHTML, player2.innerHTML));
    
    function determineWinner(firstPlayer, secondPlayer) {
        let resultGame = "";
        if (firstPlayer === secondPlayer) {
            resultGame = "ничья";
        }
        else if (((firstPlayer === "камень") && (secondPlayer === "ножницы")) || ((firstPlayer === "ножницы") && (secondPlayer === "бумага")) || ((firstPlayer === "бумага") && (secondPlayer === "камень"))) {
            resultGame = "Выиграл первый игрок";
        }
        else {
            resultGame = "Выиграл второй игрок";
        }
        return resultGame;
    }
}

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

btn.addEventListener("click", runGame);
