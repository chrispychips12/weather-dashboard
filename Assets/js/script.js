// https://openweathermap.org/forecast5
// https://developers.google.com/maps/documentation/javascript/get-api-key
// https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys

document.getElementById('search-button').addEventListener('click', function () { // search button
    const city = document.getElementById('city-input').value;
    if (city) { // if city is not empty 
        getWeather(city); // get weather data for the city
        addToHistory(city); // add city to history
    }
});

function getWeather(city) {
    document.body.classList.add('loading'); // Add loading cursor
    const apiKey = '8ec6240ebaa16f40c4eac9dff82f8e9b'; // API key
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`; // API url

    fetch(geoUrl)
        .then(response => response.json()) // get response in json format
        .then(data => {
            if (data.length > 0) { // if city is found
                const { lat, lon } = data[0]; // get latitude and longitude
                const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`; 

                fetch(weatherUrl) // get weather data
                    .then(response => response.json()) 
                    .then(data => {
                        displayCurrentWeather(data); // display current weather
                        displayForecast(data); // display forecast
                        document.body.classList.remove('loading'); // Remove loading cursor
                    });
            } else {
                alert('City not found'); // if city is not found, show alert
                document.body.classList.remove('loading'); // Remove loading cursor
            }
        }).catch(() => {
            document.body.classList.remove('loading'); // Remove loading cursor in case of error
        });
}

function displayCurrentWeather(data) { // display current weather using data from API and get current weather using list from API
    const currentWeather = data.list[0]; 
    const weatherDetails = ` 
        <p>City: ${data.city.name}</p>
        <p>Date: ${new Date(currentWeather.dt * 1000).toLocaleDateString()}</p> 
        <p>Temperature: ${currentWeather.main.temp} °C</p>
        <p>Humidity: ${currentWeather.main.humidity} %</p>
        <p>Wind Speed: ${currentWeather.wind.speed} m/s</p>
    `; // show weather details and add to weatherDetails
    document.getElementById('current-weather-details').innerHTML = weatherDetails; // display weather details and append to current-weather-details
}

function displayForecast(data) { // function to display forecast
    const forecastDetails = data.list.slice(1, 6).map(day => { // get forecast details for next 5 days
        return `
            <div class="forecast-day">
                <p>${new Date(day.dt * 1000).toLocaleDateString()}</p>
                <p><img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="weather icon"></p>
                <p>Temp: ${day.main.temp} °C</p>
                <p>Humidity: ${day.main.humidity} %</p>
                <p>Wind: ${day.wind.speed} m/s</p>
            </div>
        `;
    }).join(''); 
    document.getElementById('forecast-details').innerHTML = forecastDetails; // display forecast details and append to forecast-details
}

function addToHistory(city) { // function to add city to history section 
    let history = JSON.parse(localStorage.getItem('searchHistory')) || []; // get search history from local storage
    if (!history.includes(city)) { // if city is not in history
        history.push(city); // add city to history
        localStorage.setItem('searchHistory', JSON.stringify(history)); // set search history to local storage
        displayHistory(); // 
    }
}

function displayHistory() { // function to display history
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];// get search history from local storage
    const historyList = history.map(city => `
        <div class="card mb-2">
            <div class="card-body">
                <h5 class="card-title">${city}</h5>
            </div>
        </div>`).join(''); // create history list with cards
    document.getElementById('history-list').innerHTML = historyList; // display history list and append to history-list
    document.querySelectorAll('#history-list .card').forEach(item => { // add event listener to history list
        item.addEventListener('click', function () { // on click
            document.body.classList.add('loading'); // Add loading cursor
            getWeather(this.querySelector('.card-title').textContent); // get weather data for the city
        });
    });
}

displayHistory(); 