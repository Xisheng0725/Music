var client_id = ""; // Your client id
var client_secret = ""; // Your secret
var redirect_uri = "http://127.0.0.1:5500/front/index.html"; // Your redirect uri

const auth = "https://accounts.spotify.com/authorize";


function onPageLoad() {

}

function request() {
    client_id = document.getElementById("client_id").value;
    client_secret = document.getElementById("client_secret").value;
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret);

    let url = auth;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    console.log(url);
    window.location.href = url;
}