const apiKey = '7a9901a359cee7cdbf3ecb0aea6192c0'; // Replace with your API key

let weatherObj;
let citiesObj;
const suggestionUl = document.querySelector('.suggestion ul');
let lists = [suggestionUl];
const cityNameDom = document.querySelector('#cityName');
const searchIcon = document.querySelector('#searchIcon');
const cityVal = document.querySelector('.city-name');
const tempVal = document.querySelector('.temp');
const cloudVal = document.querySelector('.clouds');
const pressureVal = document.querySelector('.pressure');
const windVal = document.querySelector('.wind');
let searchFlag = false;
function startCity() {
  let cityName = 'Cairo';
  let apiKey = '7a9901a359cee7cdbf3ecb0aea6192c0';
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
  )
    .then(response => response.json())
    .then(data => {
      // Handle the weather data here
      weatherObj = data;
      if (weatherObj) {
        cityVal.innerHTML = `${weatherObj.name}, ${weatherObj.sys.country}`;
        tempVal.innerHTML = `<i class="fa-solid fa-temperature-three-quarters"></i> temperature : ${weatherObj.main.temp}°C`;
        windVal.innerHTML = `   <i class="fa-solid fa-wind"></i> Wind : ${weatherObj.wind.speed} m/s`;
        cloudVal.innerHTML = ` <i class="fa-solid fa-cloud"></i> Clouds : ${weatherObj.clouds.all}%`;
        pressureVal.innerHTML = ` <i class="fa-solid fa-person-arrow-down-to-line"></i> pressure : ${weatherObj.main.pressure} hPa`;
      }
    })
    .catch(error => {
      // Handle any errors here
      console.error(error);
    });
}

// Cities api
fetch(
  `https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json`
)
  .then(response => response.json())
  .then(data => {
    // Handle the weather data here
    citiesObj = data;
  })
  .catch(error => {
    // Handle any errors here
    console.error(error);
  });
cityNameDom.addEventListener('keyup', filterSearch);
function filterSearch(e) {
  if (e.key != 'Enter') {
    const cityName = e.target.value;
    suggestionUl.innerHTML = '';
    let firstCity = citiesObj.filter(city =>
      city.name.toLowerCase().startsWith(cityName.toLowerCase())
    );
    let firstFiveCities = firstCity.slice(0, 5);
    firstFiveCities.map(city => {
      let RegEx = new RegExp(cityName, 'i');
      let searchFilter = city.name.replace(
        RegEx,
        `<span class="highLight" data-city="${city.name}">${cityName}</span>`
      );
      suggestionUl.innerHTML += `<li class="bg-white mx-3 p-2 text-secondary d-flex" data-city="${city.name}">
 ${searchFilter}, ${city.country}
</li>`;
    });
    lists = document.querySelectorAll('li');
  }
}

lists.forEach(
  list =>
    list.addEventListener('click', e => {
      console.log(e.target.dataset.city);
      searchFlag = true;
      cityNameDom.value = e.target.dataset.city;
      suggestionUl.innerHTML = '';
    }),
  true
);
searchIcon.addEventListener('click', weatherHandler);
cityNameDom.addEventListener('keypress', e => {
  if (e.key == 'Enter') {
    e.preventDefault();
    weatherHandler();
    suggestionUl.innerHTML = '';
  }
});
function weatherHandler() {
  let cityName = cityNameDom.value ? cityNameDom.value : 'Cairo';
  let apiKey = '7a9901a359cee7cdbf3ecb0aea6192c0';
  if (searchFlag) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    )
      .then(response => response.json())
      .then(data => {
        // Handle the weather data here
        weatherObj = data;

        if (weatherObj) {
          cityVal.innerHTML = `${weatherObj.name}, ${weatherObj.sys.country}`;
          tempVal.innerHTML = `<i class="fa-solid fa-temperature-three-quarters"></i> temperature : ${weatherObj.main.temp}°C`;
          windVal.innerHTML = `   <i class="fa-solid fa-wind"></i> Wind : ${weatherObj.wind.speed} m/s`;
          cloudVal.innerHTML = ` <i class="fa-solid fa-cloud"></i> Clouds : ${weatherObj.clouds.all}%`;
          pressureVal.innerHTML = ` <i class="fa-solid fa-person-arrow-down-to-line"></i> pressure : ${weatherObj.main.pressure} hPa`;
        }
      })
      .catch(error => {
        // Handle any errors here
        console.error(error);
      });
  }
}
