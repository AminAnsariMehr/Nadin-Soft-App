import { userData } from "./../app.js";

const themeSwitchIcon = document.getElementById("themeSwitcher");
const renameInput = document.getElementById("renameInput");
const profileAvatarQuestion = document.getElementById("profileAvatarQuestion");
const profileUrlLabel = document.getElementById("profileUrlLabel");
const avatarUrlInput = document.getElementById("profileAvatarUrlInput");
const userAvatarImage = document.getElementById("userAvatarImage");
const urlCloseIcon = document.getElementById("avatarUrlCloseIcon");
const profileUserName = document.getElementById("profileUserNameDisplay");
const userGenderIcon = document.getElementById("userGenderIcon");
const saveSettingBtn = document.getElementById("saveSettingBtn");
const profileForm = document.getElementById("profileForm");
const customProfileUrl = localStorage.getItem("customProfileUrl");
const { username, gender } = userData;

window.addEventListener("load", () => {
    profileUserName.innerText = username;
    renameInput.placeholder = username;
    userAvatarImage.src = customProfileUrl ? customProfileUrl : `./assets/decorations/${gender}.png`;

    if (gender !== "male") {
        userGenderIcon.classList.remove("fa-mars");
        userGenderIcon.classList.add("fa-venus");
        userGenderIcon.style.color = "deeppink";
    }
});

const activeCustomAvatar = () => {
    profileAvatarQuestion.style.left = "110%";
    profileUrlLabel.style.transform = "translateY(-45px)";
    urlCloseIcon.style.right = "12px";
    avatarUrlInput.style.transform = "translate(0, -110%)";
};

const inactiveCustomAvatar = () => {
    profileAvatarQuestion.style.left = "0%";
    profileUrlLabel.style.transform = "translateY(0px)";
    urlCloseIcon.style.right = "-20px";
    avatarUrlInput.style.transform = "translate(0, 0)";
};

const switchTheme = () => {
    const rootElem = document.documentElement;
    let dataTheme = rootElem.getAttribute("data-theme");
    let newTheme;
    newTheme = dataTheme === "light" ? "dark" : "light";
    rootElem.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
};

const saveNewSetting = e => {
    if (renameInput.value) {
        userData.username = renameInput.value;
        localStorage.setItem("userData", JSON.stringify(userData));
    }

    if (avatarUrlInput.value) {
        localStorage.setItem("customProfileUrl", avatarUrlInput.value);
    }

    if (renameInput.value || avatarUrlInput.value) {
        location.reload();
    }
    e.preventDefault();
};

themeSwitchIcon.addEventListener("click", switchTheme);
profileUrlLabel.addEventListener("click", activeCustomAvatar);
urlCloseIcon.addEventListener("click", inactiveCustomAvatar);
profileForm.addEventListener("submit", e => {
    saveNewSetting(e);
});
