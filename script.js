const   time = document.querySelector('.time'),
        dateNow = document.querySelector('.dateNow'),
        greeting = document.querySelector('.greeting'),
        name = document.querySelector('.name'),
        focus = document.querySelector('.focus');
        town = document.querySelector('.town'),
        blockquote = document.querySelector('blockquote'),
        figcaption = document.querySelector('figcaption'),
        currency = document.querySelector('.currency'),
        weatherIcon = document.querySelector('.weather-icon'),
        temperature = document.querySelector('.temperature'),
        weatherDescription = document.querySelector('.weather-description'),
        feels_like = document.querySelector('.feels-like'),
        wind = document.querySelector('.wind'),
        pressure = document.querySelector('.pressure'),
        humidity = document.querySelector('.humidity');


function showTime() {
    let today = new Date(),
      hour = today.getHours(),
      min = today.getMinutes(),
      sec = today.getSeconds();
      time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
      setTimeout(showTime, 1000);
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
  }

showTime();

function getDay() {
    let date = new Date(),
        dayName = date.getDay();
        dayNumber = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear();

    const arrDay = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const arrMonth = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    dateNow.innerHTML = `${arrDay[dayName]} ${dayNumber} ${arrMonth[month]} ${year}`;        
}

getDay();

function setBgGreet() {
    let today = new Date(),
      hour = today.getHours();
  
    if (hour > 6 && hour < 12) {
      // Morning
      document.body.style.backgroundImage =
        "url('images/morning.jpg')";
      greeting.textContent = 'Доброе утро, ';
      document.body.style.color = 'black';
    } else if (hour > 12 && hour < 18) {
      // Afternoon
      document.body.style.backgroundImage =
        "url('images/day.jpg')";
      greeting.textContent = 'Добрый день, ';
      document.body.style.color = 'white';
    } else if (hour > 18 && hour < 24) {
      // Evening
      document.body.style.backgroundImage =
        "url('images/evening.jpg')";
      greeting.textContent = 'Добрый вечер, ';
      document.body.style.color = 'white';
    } else if (hour > 0 && hour < 6) {
        document.body.style.backgroundImage =
        "url('images/night.jpg')";
      greeting.textContent = 'Доброй ночи, ';
      document.body.style.color = 'white';
    }
  }

  setBgGreet();


async function getWeather() {
    const locationUrl = `https://ipinfo.io/?token=3b4a9ada9d746b`; 
    const dataLocation = await fetch(locationUrl);
    const location = await dataLocation.json();
    town.textContent = location.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${town.textContent}&lang=ru&appid=35144f3ffd8b50ad98e331dcd36e6fff&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.ceil(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    feels_like.textContent = `Ощущается как ${Math.round(data.main.feels_like)}°C`;
    wind.textContent = `Ветер ${Math.floor(data.wind.speed)} м/с`;
    pressure.textContent = `Давление ${Math.ceil(data.main.pressure/1.333)} мм.рт.ст`;
    humidity.textContent = `Влажность ${data.main.humidity}%`;
  }

  document.addEventListener('DOMContentLoaded', getWeather);

async function getQuote() {  
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=ru`;
    const res = await fetch(url);
    const data = await res.json();
    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;
    
  }
  document.addEventListener('DOMContentLoaded', getQuote);


async function getCourse() {
    const url = `https://openexchangerates.org/api/latest.json?app_id=f7819e4dbae941ce897689bcadc5f19b`;
    const res = await fetch(url);
    const course = await res.json();
    console.log(course);
    currency.textContent = `
                            USD = ${(course.rates.RUB).toFixed(3)}
                            EUR=${(course.rates.RUB/course.rates.EUR).toFixed(3)}                     
                            `;
}

document.addEventListener('DOMContentLoaded', getCourse);

function getName() {
    if (localStorage.getItem('name') === null) {
      name.textContent = '[Enter Name]';
    } else {
      name.textContent = localStorage.getItem('name');
    }
  }

  getName();
  
  // Set Name
  function setName(e) {
    if (e.type === 'keypress') {
      // Make sure enter is pressed
      if (e.which == 13 || e.keyCode == 13) {
        localStorage.setItem('name', e.target.innerText);
        name.blur();
      }
    } else {
      localStorage.setItem('name', e.target.innerText);
    }
  }
  
  // Get Focus
  function getFocus() {
    if (localStorage.getItem('focus') === null) {
      focus.textContent = '[Enter Focus]';
    } else {
      focus.textContent = localStorage.getItem('focus');
    }
  }

  getFocus();
  
  // Set Focus
  function setFocus(e) {
    if (e.type === 'keypress') {
      // Make sure enter is pressed
      if (e.which == 13 || e.keyCode == 13) {
        localStorage.setItem('focus', e.target.innerText);
        focus.blur();
      }
    } else {
      localStorage.setItem('focus', e.target.innerText);
    }
  }

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);