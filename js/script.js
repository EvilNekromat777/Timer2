// =============  Функционал для таймера =========
const deadline = '2021-10-01';

// Функция определяет разницу между дедлайном и нашим текущим временем
function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()), // создаем переменную куда получаем кол-во миллисекунд дедлайна минус кол-во миллисекунд текущего времени
          days = Math.floor(t / (1000 * 60 * 60 * 24)), // вычисляем сколько дней осталось до дедлайна
          // Math.floor - округление до ближайшего целого числа
          // 1000 * 60 - получаем кол-во миллисекунд в одной минуте
          // 1000 * 60 * 60 - получаем кол-во миллисекунд в одном часе
          // 1000 * 60 * 60 * 24 - получаем кол-во миллисекунд в сутках
          hours = Math.floor((t / (1000 * 60 * 60) % 24)), // вычисляем сколько часов осталось до дедлайна
          // 1000 * 60 * 60 - получаем кол-во миллисекунд в одном часе 
          // (t / (1000 * 60 * 60) % 24 - чтобы не было 26 часов, а было 1 день и 2 часа, получаем остаток от деления на 24
          minutes = Math.floor((t / 1000 / 60) % 60), // вычисляем сколько минут осталось до дедлайна
          seconds = Math.floor((t / 1000) % 60); // вычисляем сколько секунд осталось до дедлайна

          return {  // создаем объект и возвращаем его из функции
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
          };
}

// Функция будет проверять одно число или два, и если одно то будет подставлять ноль
function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

// Функция устанавливает время на страницу
function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);

          updateClock(); // запускаем ее здесь, чтобы не было мигания верстки на странице

           // Функция обновляет наш таймер каждую секунду
           function updateClock() {
               const t = getTimeRemaining(endtime);

               days.innerHTML = getZero(t.days);
               hours.innerHTML = getZero(t.hours);
               minutes.innerHTML = getZero(t.minutes);
               seconds.innerHTML = getZero(t.seconds);

               if (t.total <= 0) {   // остановим нашу функцию когда время истечет
                 clearInterval(timeInterval);
               }
           }
}

setClock('.timer', deadline);