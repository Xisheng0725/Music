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
    document.getElementById('invalid-email').style.color="rgba(0, 0, 0, 0)";
    document.getElementById('invalid-password').style.color="rgba(0, 0, 0, 0)";
    document.getElementById('invalid-password2').style.color="rgba(0, 0, 0, 0)";

    const email = document.getElementById("email").value.toLowerCase();
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    if (email.length === 0 || password.length === 0 || password2.length === 0) {
        alert("Fields cannot be empty. Please try again.");
        return;
    }

    //check if email is valid
    if (!checkValidEmail(email)) {
        document.getElementById('invalid-email').style.color="red";
    } else if (!checkValidPassword(password)) {
        document.getElementById('invalid-password').style.color="red";
        document.getElementById('password2').value="";
    } else if(!checkPasswordsMatch(password, password2)) {
        document.getElementById('invalid-password2').style.color="red";
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
        alert("The email " + " is being used by another account. Please try another.");
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
    localStorage.setItem("isGuest", false);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
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

    var prevWasSpecial = true;
    for (let i=0; i<first.length; ++i) {
        const cur = first.charAt(i).charCodeAt(0);
        // check if cur is a letter or number (or . - _ in certain valid areas)
        if (!prevWasSpecial) {
            if (!((cur>=48 & cur<=57) || (cur>=97 && cur<=122) || cur==45 || cur==46 || cur==95)) {
                return false;
            }
            if (cur==45 || cur==46 || cur==95) {
                prevWasSpecial;
            }
        } else if (prevWasSpecial || i===first.length-1) {
            if (!((cur>=48 & cur<=57) || (cur>=97 && cur<=122))) {
                return false;
            }
            prevWasSpecial=false;
        }
    }

    //validate the section after the @
    const second = email.substring(email.indexOf('@')+1);
    if (second.indexOf('.')!==second.lastIndexOf('.') || second.indexOf('.')===0 || second.indexOf('.')===second.length-1) {
        return false;
    }
    
    const period=second.indexOf('.');

    for (let i=0; i<second.length; ++i) {
        if (i!==period) {
            const cur = second.charAt(i).charCodeAt(0);
            if (!((cur>=48 & cur<=57) || (cur>=97 && cur<=122))) {
                return false;
            }
        }
    }

    return true;
}

function checkValidPassword(password) {
    return (password.length>=6 && password.length<=18);
}

function checkPasswordsMatch(p1, p2) {
    return p1===p2;
}