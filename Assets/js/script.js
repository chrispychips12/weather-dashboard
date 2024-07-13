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



