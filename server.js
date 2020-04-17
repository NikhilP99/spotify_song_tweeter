const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')

var spotify = require('./spotify')
var twitter = require('./twitter')

var access_token;
var refresh_token;
var song_url;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//spotify: login
app.get('/login', (req,res)=> {
    let client_id = ""
    let url_encoded_redirect_url = ""
    let url = "https://accounts.spotify.com/authorize?client_id=" + client_id + "&response_type=code&redirect_uri=" + url_encoded_redirect_url + "&scope=user-read-private%20user-read-email%20user-library-read%20user-read-currently-playing%20user-read-playback-state"
    res.redirect(url)
})
//spotify: callback
app.get('/response', async (req,res) => {
    var code = req.query.code
    console.log(code.trim())
    var tokens = await spotify.get_token(code.trim())
    access_token = tokens.access_token
    refresh_token = tokens.refresh_token
    console.log({access_token, refresh_token})
    res.redirect('http://localhost:5000/get_random')
})
//spotify: get new access token
async function get_new_token(refresh_token){
    var response = await spotify.refresh_token(refresh_token)
    console.log(response, "refreshed token")
    access_token = response.access_token
}
//spotify: get random song
async function get_song(){
    await get_new_token(refresh_token)
    var response = await spotify.random_song(access_token.trim())
    song_url = response.items[0].track.external_urls.spotify


    var msg = "Behold..today's random song from my library. Let me know if you like it. " + song_url 
    twitter.tweeter(msg)

    //var time = 24*60*60*1000 //24hours
    setTimeout(get_song, 30*1000);
}

app.get('/get_random', async (req,res)=>{
    get_song()
    // await get_new_token(refresh_token)
    // var response = await spotify.random_song(access_token.trim())
    // song_url = response.items[0].track.external_urls.spotify
    res.send('working...hopefully')
})

app.listen(5000, () => {
    console.log("Server is listening to port:", 5000)
})

































// http_proxy=http://172.16.2.30:8080/
// ftp_proxy=ftp://172.16.2.30:8080/
// all_proxy=socks://172.16.2.30:8080/
// https_proxy=http://172.16.2.30:8080/
// no_proxy=localhost,127.0.0.0,127.0.1.1,127.0.1.1,local.home


// Acquire::http::Proxy "http://172.16.2.30:8080/";
// Acquire::https::Proxy "http://172.16.2.30:8080/";

// app.get('/refresh', async (req,res)=>{
//     var response = await spotify.refresh_token(refresh_token)
//     access_token = response.access_token
//     res.send(response)
// })