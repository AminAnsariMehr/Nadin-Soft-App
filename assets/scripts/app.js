const isLogin = localStorage.getItem("isLogin");
const userData = JSON.parse(localStorage.getItem("userData"));

if (!isLogin) {
    location.replace("login.html");
}

export { userData };
