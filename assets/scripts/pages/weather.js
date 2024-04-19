import { data } from "./../data.js";

const temperatureNumber = document.getElementById("temperatureNumber");
const dateData = document.getElementById("dateData");
const windSpeedNumber = document.getElementById("windSpeedNumber");
const windDirectionNumber = document.getElementById("windDirectionNumber");
const windDirectionArrow = document.getElementById("windArrow");
const windDirectionUnit = document.getElementById("windDirectionUnit");
const windSpeedUnit = document.getElementById("windSpeedUnit");
const dailyIcon = document.getElementById("dailyStatusIcon");
const dailyStatusTitle = document.getElementById("dailyStatusTitle");
const cityName = document.getElementById("cityName");
const searchForm = document.getElementById("weatherSearchBox");

window.addEventListener("load", () => setData());
searchForm.addEventListener("submit", function (e) {
    const searchInput = this.children[1];
    setData(searchInput.value);
    searchInput.value = "";
    e.preventDefault();
});

function setData(city = "Tehran") {
    getData(city)
        .then(data => {
            const currentWeather = data.data.current_weather;
            const currentWeatherUnits = data.data.current_weather_units;
            const isDay = currentWeather.is_day;

            temperatureNumber.innerText = Math.round(currentWeather.temperature);
            dateData.innerText = data.date;
            windSpeedNumber.innerText = currentWeather.windspeed;
            windSpeedUnit.innerText = currentWeatherUnits.windspeed;
            windDirectionNumber.innerText = currentWeather.winddirection;
            windDirectionUnit.innerText = currentWeatherUnits.winddirection;
            windDirectionArrow.style.transform = `rotate(${currentWeather.winddirection}deg)`
            cityName.innerText = city;

            if (isDay === 0) {
                dailyIcon.classList.remove("fa-sun");
                dailyStatusTitle.innerText = "Night";
            } else {
                dailyIcon.classList.remove("fa-moon");
                dailyStatusTitle.innerText = "Day";
            }
        })
        .catch(error => {
            alert("City name is invalid");
        });
}

async function getData(city) {
    const { lat, lng } = findCity(city.toLowerCase());
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}8&longitude=${lng}&current_weather=true`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const date = new Date().toLocaleString("default", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });
    return { data, date };
}

function findCity(city) {
    for (const item of data) {
        if (city === item.city.toLowerCase()) {
            return { lat: item.lat, lng: item.lng };
        }
    }
}
