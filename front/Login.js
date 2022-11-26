async function login() {
    const email = document.getElementById("email").value.toLowerCase();
    const password = document.getElementById("password").value;

    if (email.length === 0 || password.length === 0) {
        alert("Fields cannot be empty. Please try again.");
        return;
    }

    var res = false;

    await fetch(url + "/users/find-user/" + email, { method: 'GET', mode: 'cors' })
        .then(response => response.json())
        .then((result) => {
            res = result;
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // console.log(res);

    if (res) {
        var pass = "";

        await fetch(url + "/users/match-credentials/" + email, { method: 'GET', mode: 'cors' })
            .then(response => response.json())
            .then((result) => {
                pass = result[0];
            })
            .catch(error => {
                console.error('Error:', error);
            });

        if (pass === password) {
            localStorage.setItem("isGuest", false);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            location.href = 'search.html';
            return;
        } else {
            alert("The credentials entered did not match any records. Please try again.");
            document.getElementsByClassName("password").value = "";
            return;
        }
    } else {
        alert("That email does not exist. Please try again.");
        return;
    }
}

function guestLogin() {
    localStorage.setItem("isGuest", true);
    location.href='search.html';
}

async function createUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    if (email.length === 0 || password.length === 0 || password2.length === 0) {
        alert("Fields cannot be empty. Please try again.");
        return;
    }

    //check if email is valid
    if (!checkValidEmail(email)) {

    }

    var res = false;

    await fetch(url + "/users/find-user/" + email, { method: 'GET', mode: 'cors' })
        .then(response => response.json())
        .then((result) => {
            res = result;
        })
        .catch(error => {
            console.error('Error:', error);
        });

    console.log(res);

    if (res) {
        alert("Sorry! The email " + " is taken. Please try another.");
        return;
    }

    await fetch(url + "/users/new-user/",
        {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ "email": email, "password": password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

    alert("You have successfully created an account!");
    location.href = 'search.html';
    return;
}

function getPasswordByemail(email) {
    const req = new XMLHttpRequest();
    req.open('GET', url + "/users/match-credentials/" + email);
    req.send();
    req.onreadystatechange = (e) => {
        console.log(req.responseText);
        document.getElementsByClassName("response-text").innerText = req.responseText;
    };
    console.log("test" + document.getElementsByClassName("response-text").innerText);
    return document.getElementsByClassName("response-text").innerText;
}

function checkValidEmail(email) {

    if (!email.includes('@')) {
        return false;
    }

    //before the @
    const first=email.substring(0, email.indexOf('@'));

    //validate the section before the @
    if (first.length===0) {
        return false;
    }

    for (let i=0; i<first.length; ++i) {
        const cur = first.charAt(i);

        // check if cur is a letter or number
        if (!((cur>=48 & cur<=57) || (cur>=97 && cur<=122))) {
            return false;
        }
    }

    //validate the section after the @
    
}
