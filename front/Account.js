var email="example@gmail.com";
var password="placeholder";
var censoredPassword;
var passwordShown=false;

window.onload = ()=> {
    // fetch password from prev page
    // fetch email from prev page
    censorPassword();    
    console.log("entered");
    document.getElementById('email').innerHTML = email+"<br>";
    document.getElementById('password').innerHTML = censoredPassword+"<br>";
};

function showHidePass() {
    if (passwordShown) {
        document.getElementById('showHidePass').innerHTML="Show Password";
        document.getElementById('password').innerHTML=censoredPassword+"<br>";
    } else {
        document.getElementById('showHidePass').innerHTML="Hide Password";
        document.getElementById('password').innerHTML=password+"<br>";
    }
    passwordShown=!passwordShown;
}

function censorPassword() {
    censoredPassword=password.charAt(0);
    for (let i=1; i<password.length; ++i) {
        censoredPassword+="*";
    }
}

function changePassword() {

}