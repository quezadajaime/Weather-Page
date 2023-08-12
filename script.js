var recentSearches = JSON.parse(localStorage.getItem("searches")) ||[];
console.log(recentSearches);
var apiKey="949e4d910374477340798e31903cc1ea";

var searchHistory = document.getElementById("recent-viewed");

getWeather("Riverside")

function getWeather(city) {
var url = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apiKey}`;
console.log();
fetch (url)
	.then(function (response) {
	return response.json();
})
	.then(function (data) {
	console.log(data);
	localStorage.setItem("city", JSON.stringify(data)
);

	console.log(data)
	var currentCity = document.getElementById("current-city");

	currentCity.textContent = city;
	setCurrentWeather(data.list[0]);
	setForecast(data.list);
});
}


function setCurrentWeather(weather) {
var forecastDate = weather.dt;
console.log(forecastDate);
var convertTimeMilli = forecastDate * 1000;
var dateTime = new Date(convertTimeMilli);
var newDate = dateTime.toLocalDateString("en-US", dateStyle, "short");
console.log(newDate);
var currentDate = document.getElementById( "current-date");
currentDate.innerHTML = newDate;

var iconParagraphId = weather.weather[0].icon;
variconLink = "https://openweathermap.org/img/wn/" + iconParagraphId + ".png";

console.log(iconLink);

var iconHTML = '<img scr="' + iconLink + '">';
console.log(iconHTML);

var currentIcon = document.getElementById("current-icon");

currentIcon.innerHTML = iconHTML;

console.log(weather.main.temp);

var currentTemperature = document.getElementById("current-temperature");

var currentWind = document.getElementById("current-wind");
	currentWind.textContent = "wind: " + weather.wind.speed + "MPH";

var currentHumidity = document.getElementById("current-humidity");
	currentHumidity.textContent = "humidity: " + weather.main.humidity + " %";
}


function setForecast(forecast) {
	for (var i = 0; i < forecast.length; i += 8) {
	console.log(forecast[i]);
	setForecastDay(forecast[i], i/ 8 + 1);
  }
}

function setForecastDay(weather, dayNumber) {

var iconParagraph = document.createElement("p");
var iconParagraphId = weather.weather[0].icon;
var iconLink = "https   " + iconParagraphId + ".png";
	console.log(iconLink);
var iconHtml = '<img src="' + iconLink + '">';
	console.log(iconHTML);
var forecastParagraph = document.createElement("p");
var forecastDate = weather.dt;
console.log(forecastDate);
var convertTimeMilli = forecaseDate * 1000;
var dateTime = new Date(convertTimeMilli);
var newDate = dateTime.toLocalDataString("en-US", {
dataStyle: "short" });
	console.log(newDate);
var day = doument.getElementById("day-" + dayNumber);

var dayList = [];
var titleParagraph = dcument.createElement("p");
	console.log(iconHTML);
titleParagraph.innerHTML = newDate + iconHTML;
dayList.push(titleParagraph);
day.replaceChildren(...dayList);

var windParagraph = document.createElement("p");
windParagraph.textContent = "wind: "+ weather.wind.speed + " MPH";
	dayList.push(windParagraph);
	day
}
