var recentSearches = JSON.parse(localStorage.getItem("searches")) || [];
//console.log(recentSearches);
var searchHistory = document.getElementById("recently-viewed");
//default city
getWeather("Riverside")
//fetches data from the Weather API
function getWeather(city) {
    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=949e4d910374477340798e31903cc1ea&units=imperial";
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            localStorage.setItem("city", JSON.stringify(data)
            );

            console.log(data)
            //grabs inputed current city
            var currentCity = document.getElementById("current-city");

            currentCity.textContent = city;
            setCurrentWeather(data.list[0]);
            setForecast(data.list);
        });
}

//function to set current days forecast
function setCurrentWeather(weather) {
    //sets date, converts the date from unix
    var forecastDate = weather.dt;
    var convertTimeMilli = forecastDate * 1000;
    var dateTime = new Date(convertTimeMilli);
    var newDate = dateTime.toLocaleDateString("en-US", { dateStyle: "short" });
    var currentDate = document.getElementById("current-date");
    currentDate.innerHTML = newDate;
    //sets current icon for the current weather
    var iconParagraphId = weather.weather[0].icon;
    var iconLink = "https://openweathermap.org/img/wn/" + iconParagraphId + ".png";
    var iconHTML = '<img src="' + iconLink + '">';


    var currentIcon = document.getElementById("current-icon");
    currentIcon.innerHTML = iconHTML;
//sets current temp
    var currentTemperature = document.getElementById("current-temperature");
    currentTemperature.textContent = "Temperature: " + weather.main.temp;
    var currentWind = document.getElementById("current-wind");
    currentWind.textContent = "Wind: " + weather.wind.speed + "MPH";

    var currentHumidity = document.getElementById("current-humidity");
    currentHumidity.textContent = "Humidity: " + weather.main.humidity + " %";
}

// loop for the entire week of data
function setForecast(forecast) {
    for (var i = 0; i < forecast.length; i += 8) {
        console.log(forecast[i]);
        setForecastDay(forecast[i], i / 8 + 1);
    }
}
//5 Day forecast
function setForecastDay(weather, dayNumber) {
//icon for the forecast
    var iconParagraph = document.createElement("p");
    var iconParagraphId = weather.weather[0].icon;
    var iconLink = "https://openweathermap.org/img/wn/" + iconParagraphId + ".png";
    //console.log(iconLink);

    var iconHTML = '<img src="' + iconLink + '">';
    //console.log(iconHTML);

    var forecastParagraph = document.createElement("p");
    var forecastDate = weather.dt;
    //console.log(forecastDate);

    var convertTimeMilli = forecastDate * 1000;
    var dateTime = new Date(convertTimeMilli);
    var newDate = dateTime.toLocaleDateString("en-US", {dateStyle: "short"});
    //console.log(newDate);

    var day = document.getElementById("day-" + dayNumber);

    var dayList = [];
    var titleParagraph = document.createElement("p");
    console.log(iconHTML);
    titleParagraph.innerHTML = newDate + iconHTML;
    dayList.push(titleParagraph);
    day.replaceChildren(...dayList);

    //Temp data
    var tempParagraph = document.createElement("p");
    tempParagraph.textContent = "Temp: " + weather.main.temp;
    dayList.push(tempParagraph);
    day.replaceChildren(...dayList);
    //Wind data

    var windParagraph = document.createElement("p");
    windParagraph.textContent = "Wind: " + weather.wind.speed + " MPH";
    dayList.push(windParagraph);
    day.replaceChildren(...dayList);
   
    //humidity data
    var humidityParagraph = document.createElement("p");
    humidityParagraph.textContent = "Humidity: " + weather.main.humidity + " %";
    dayList.push(humidityParagraph);
    day.replaceChildren(...dayList);
}
//addes event listener for submit button
var searchForm = document.getElementById("search-form");
var city = document.getElementById("city");
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var searchCity = city.value.trim();
    executeSearch(searchCity);
    addRecentSearch(searchCity);
});
// addss the recently searched cities to buttons
function addRecentSearch(city) {
    var recentButton = document.createElement("button");
    recentButton.textContent = city;
    recentButton.addEventListener("click", function () {
        executeSearch(city);
        console.log(recentButton);
    });
    searchHistory.appendChild(recentButton);
    
}
// adds the searched cities into the local storage
function executeSearch(searchCity) {
    recentSearches.push(searchCity);
    localStorage.setItem("searches", JSON.stringify(recentSearches));
    getWeather(searchCity);
}


