var isGuest;
var email;
var password;

window.onload = () => {
    isGuest = localStorage.getItem("isGuest");
    if (!isGuest) {
        email = localStorage.getItem("email");
        password = localStorage.getItem("password");
    }
};