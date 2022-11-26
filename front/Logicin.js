async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username.length === 0 || password.length === 0) {
        alert("Fields cannot be empty. Please try again.");
        return;
    }

    var res = false;

    await fetch(url + "/users/find-user/" + username, { method: 'GET', mode: 'cors' })
        .then(response => response.json())
        .then((result) => {
            res = result;
        })
        .catch(error => {
            console.error('Error:', error);
        });

    console.log(res);

    if (res) {
        var pass = "";

        await fetch(url + "/users/match-credentials/" + username, { method: 'GET', mode: 'cors' })
            .then(response => response.json())
            .then((result) => {
                pass = result[0];
            })
            .catch(error => {
                console.error('Error:', error);
            });

        if (pass === password) {
            location.href = 'search.html';
            return;
        } else {
            alert("The credentials entered did not match any records. Please try again.");
            document.getElementsByClassName("password").value = "";
            return;
        }
    } else {
        alert("That username does not exist. Please try again.");
        return;
    }
}

async function createUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username.length === 0 || password.length === 0) {
        alert("Fields cannot be empty. Please try again.");
        return;
    }

    var res = false;

    await fetch(url + "/users/find-user/" + username, { method: 'GET', mode: 'cors' })
        .then(response => response.json())
        .then((result) => {
            res = result;
        })
        .catch(error => {
            console.error('Error:', error);
        });

    console.log(res);

    if (res) {
        alert("Sorry! The username " + " is taken. Please try another.");
        return;
    }

    await fetch(url + "/users/new-user/",
        {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ "username": username, "password": password }),
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

function getPasswordByUsername(username) {
    const req = new XMLHttpRequest();
    req.open('GET', url + "/users/match-credentials/" + username);
    req.send();
    req.onreadystatechange = (e) => {
        console.log(req.responseText);
        document.getElementsByClassName("response-text").innerText = req.responseText;
    };
    console.log("test" + document.getElementsByClassName("response-text").innerText);
    return document.getElementsByClassName("response-text").innerText;
}
