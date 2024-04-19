const isLogin = localStorage.getItem("isLogin");
const userData = JSON.parse(localStorage.getItem("userData"));

if (!isLogin) {
    location.replace("login.html");
}

// Menu Section
const menu = document.getElementById("menu");
menu.addEventListener("click", e => {
    if (!e.target.classList.contains("menu")) {
        let target = e.target.classList.contains("menuItem") ? e.target : e.target.parentElement;
        for (const element of menu.children) {
            document.getElementById(element.dataset.targetPage).classList.remove("showPage");
            element.classList.remove("activePage");
        }
        document.getElementById(target.dataset.targetPage).classList.add("showPage");
        target.classList.add("activePage");
    }
});

// check active theme mode
let theme = localStorage.getItem("theme");
if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
}

export { userData };
