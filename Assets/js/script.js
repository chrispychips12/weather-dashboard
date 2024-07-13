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
    const apiKey = '8ec6240ebaa16f40c4eac9dff82f8e9b'; // API key
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`; // API url

    fetch(geoUrl)
        .then(response => response.json()) // get response in json format
        .then(data => {
            if (data.length > 0) { // if city is found
                const { lat, lon } = data[0]; // get latitude and longitude
                const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`; // API url

                fetch(weatherUrl) // get weather data
                    .then(response => response.json()) 
                    .then(data => {
                        displayCurrentWeather(data); // display current weather
                        displayForecast(data); // display forecast
                    });
            } else {
                alert('City not found'); // if city is not found, show alert
            }
        });
}

function displayCurrentWeather(data) { // display current weather using data from API
    const currentWeather = data.list[0]; // get current weather using list from API
    const weatherDetails = ` 
        <p>City: ${data.city.name}</p>
        <p>Date: ${new Date(currentWeather.dt * 1000).toLocaleDateString()}</p> 
        <p>Temperature: ${currentWeather.main.temp} °C</p>
        <p>Humidity: ${currentWeather.main.humidity} %</p>
        <p>Wind Speed: ${currentWeather.wind.speed} m/s</p>
    `; // show weather details and add to weatherDetails
    document.getElementById('current-weather-details').innerHTML = weatherDetails; // display weather details and append to current-weather-details
}

