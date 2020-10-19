const   time = document.querySelector('.time'),
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

function setBgGreet() {
    let today = new Date(),
      hour = today.getHours();
  
    if (hour < 12) {
      // Morning
      document.body.style.backgroundImage =
        "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
      //greeting.textContent = 'Good Morning, ';
    } else if (hour < 18) {
      // Afternoon
      document.body.style.backgroundImage =
        "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
      //greeting.textContent = 'Good Afternoon, ';
    } else {
      // Evening
      document.body.style.backgroundImage =
        "url('https://i.ibb.co/924T2Wv/night.jpg')";
      //greeting.textContent = 'Good Evening, ';
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
    console.log(data); 
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