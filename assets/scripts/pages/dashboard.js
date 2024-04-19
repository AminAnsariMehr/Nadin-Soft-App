import { userData } from "./../app.js";

const hourElement = document.getElementById("hourCircle");
const minuteElement = document.getElementById("minuteCircle");
const secondElement = document.getElementById("secondCircle");
const todayIndicator = document.getElementById("currentTodayDisplay");
const userMessageElement = document.getElementById("dashboardUserMessage");
const time = new Date();
const currentHour = time.getHours();
const currentMinute = time.getMinutes();

window.addEventListener("load", () => {
    displayToday();
    checkDisplayUserMessage();

    // Dynamic Message based on current hour
    setTimeout(() => {
        checkDisplayUserMessage();
        setInterval(checkDisplayUserMessage, 3600 * 1000);
    }, 3600 * 1000 - (60 - currentMinute) * 60 * 1000);

    // Dynamic weekday
    setTimeout(() => {
        displayToday();
        setInterval(displayToday, 86400 * 1000);
    }, 86400 * 1000 - (24 - currentHour) * 60 * 60 * 1000);
});


function displayToday() {
    todayIndicator.innerText = new Date().toLocaleString("default", {
        weekday: "long",
    });
}

function checkDisplayUserMessage() {
    const currentHour = new Date().getHours();
    const username = userData.username;
    const userMessage = [
        { time: currentHour >= 4 && currentHour < 11, message: "Good Morning " + username },
        { time: currentHour >= 11 && currentHour < 14, message: "Good Day " + username },
        { time: currentHour >= 14 && currentHour < 16, message: "Good Afternoon " + username },
        { time: currentHour >= 16 && currentHour < 19, message: "Good Evening" },
        { time: currentHour >= 19 || currentHour < 4, message: "Good Night " + username },
    ];

    userMessage.forEach(element => {
        if (element.time) {
            userMessageElement.innerText = element.message;
        }
    });
}

setInterval(() => {
    // ---------- Analog Clock ----------
    const day = new Date();
    const hourValue = day.getHours() * 30;
    const minuteValue = day.getMinutes() * 6;
    const secondValue = day.getSeconds() * 6;
    hourElement.style.transform = `rotateZ(${hourValue + minuteValue / 12}deg)`;
    minuteElement.style.transform = `rotateZ(${minuteValue}deg)`;
    secondElement.style.transform = `rotateZ(${secondValue}deg)`;

    // ---------- Digital Clock ----------
    const hoursDigitalElement = document.getElementById("hours");
    const minutesDigitalElement = document.getElementById("minutes");
    const secondsDigitalElement = document.getElementById("seconds");
    const Am_PmDigitalElement = document.getElementById("am_pm");

    let D_HoursElValue = day.getHours();
    const D_MinutesElValue = day.getMinutes();
    const D_SecondsElValue = day.getSeconds();

    hoursDigitalElement.innerHTML = D_HoursElValue;
    minutesDigitalElement.innerHTML = D_MinutesElValue;
    secondsDigitalElement.innerHTML = D_SecondsElValue;
    D_HoursElValue >= 12 ? (Am_PmDigitalElement.innerHTML = "PM") : null;
    D_HoursElValue >= 13 ? (D_HoursElValue = D_HoursElValue - 12) : null;
    D_SecondsElValue < 10 ? (secondsDigitalElement.innerHTML = "0" + `${D_SecondsElValue}`) : null;
    D_MinutesElValue < 10 ? (minutesDigitalElement.innerHTML = "0" + `${D_MinutesElValue}`) : null;
    D_HoursElValue < 10 ? (hoursDigitalElement.innerHTML = "0" + `${D_HoursElValue}`) : null;
}, 1000);
