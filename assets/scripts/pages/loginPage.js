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

// submit user data Login
userDataForm.addEventListener("submit", e => {
    if (usernameInput.value.trim()) {
        userData.username = usernameInput.value;
        radioButtons.forEach(element => {
            if (element.checked) {
                userData.gender = element.value;
            }
        });
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("isLogin", 1)
        location.replace("index.html");
    } else {
        alert("Please fill all fields!")
    }
    e.preventDefault();
});
