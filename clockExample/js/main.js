(function () {
    let current = new Date(),
        date2019 = new Date('1/1/2019'); //создаю объект с датой и кладу в переменную
    

    function getDayOfWeek(date) { // определяю день недели
        let dayOfWeek = ['понеділок', 'вівторок', 'середа', 'четвер', "п'ятниця", 'субота', 'неділя'];
        return dayOfWeek[date - 1];
    }

    function getCurrentMonth(date) { // определяю месяц
        let months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];
        return months[date];
    }

    function getCurrentTime() {
        let currentTime = new Date();
        document.getElementById('time').innerHTML = `Поточний час: ${currentTime.toTimeString().substr(0, 9)}`;
    }

    document.getElementById('today').innerHTML = `Сьогодні ${getDayOfWeek(current.getDay())}, ${current.getDate()} ${getCurrentMonth(current.getMonth())} ${current.getFullYear()} року`;
    setInterval(getCurrentTime, 1000); 
    document.getElementById('rest').innerHTML = `До 2019 року залишилось ${Math.floor((date2019 - current) / 1000 / 60 / 60 / 24)} днів`;
    
}())