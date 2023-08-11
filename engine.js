//Display the Time

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();

if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let date = document.querySelector("#date");
date.innerHTML = `${day} ${hours}:${minutes}`;

//Submitting and query the city
let cityDisp = document.querySelector("#form");
cityDisp.addEventListener("submit", enterCity);

function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");

  //   cityInput = cityInput.trim;
  let changeHeading = document.querySelector("#city");

  changeHeading.innerHTML = `${cityInput.value}`;

  // console.log(cityInput.value);

  let city = cityInput.value;
  let apiKey = "7c2e159dd4738c5a23459060df0ec123";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  function displayWeather(response) {
    // console.log(response);

    let currentTemp = Math.round(response.data.main.temp);

    // console.log(`${currentTemp}°C `);

    // let city = document.querySelector("#cityInput").value;
    let humidityQuery = response.data.main.humidity;
    let windQuery = response.data.wind.speed;
    let descriptionQuery = response.data.weather[0].description;

    //   console.log(cityQuery);
    //   console.log(humidityQuery);
    //   console.log(windQuery);
    //   console.log(descriptionQuery);

    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = `${currentTemp}`;

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${humidityQuery}`;

    let wind = document.querySelector("#wind");
    wind.innerHTML = `${windQuery}`;

    let description = document.querySelector("#description");
    description.innerHTML = `${descriptionQuery}`;
  }

  axios.get(apiURL).then(displayWeather);
}

//Bonus Points

function currentWeather() {
  function displayWeather(response) {
    console.log(response);
    let currentTemp = Math.round(response.data.main.temp);
    let city = response.data.name;
    let humidityQuery = response.data.main.humidity;
    let windQuery = response.data.wind.speed;
    let descriptionQuery = response.data.weather[0].description;

    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = `${currentTemp}`;

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${humidityQuery}`;

    let wind = document.querySelector("#wind");
    wind.innerHTML = `${windQuery}`;

    let description = document.querySelector("#description");
    description.innerHTML = `${descriptionQuery}`;

    function showPosition(position) {
      console.log(position);
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);

      let lat = position.coords.latitude;
      let long = position.coords.longitude;

      let apiKey = "7c2e159dd4738c5a23459060df0ec123";
      let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

      axios.get(apiURL).then(displayWeather);
    }

    navigator.geolocation.getCurrentPosition(currentWeather);
  }
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentWeather);
