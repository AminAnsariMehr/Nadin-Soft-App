const welcomeSlide = document.getElementById("welcomeSlide");
const welcomeGoBtn = document.getElementById("welcomeGoBtn");
const userDataForm = document.getElementById("userDataForm");
const usernameInput = document.getElementById("loginUserNameInput");
const radioButtons = document.querySelectorAll(".loginPage__userGenderRadio");
const userData = {};

// switch welcome slide
welcomeGoBtn.addEventListener("click", () => {
    welcomeSlide.style.transform = "translate(100%)";
    userDataForm.style.transform = "translate(100%)";
})
