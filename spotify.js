// const axios = require('axios')
var request = require('request');

module.exports.get_token = (code) => {

    return new Promise(function(resolve,reject){
        console.log('exchanging code for token')
        var options = {
            'method': 'POST',
            'url': 'https://accounts.spotify.com/api/token',
            'headers': {
                'Authorization': '', //"Basic *<base64 encoded client_id:client_secret>*"
                'Content-Type': 'application/x-www-form-urlencoded',
                'grant_type': 'authorization_code',
                'Accept': 'application/json'
            },
            form: {
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': '',
                'client_id': '',
                'client_secret': ''
            }
            };
        request(options, function (error, response,body) { 
        if (error) reject(error);
        var parsed_body = JSON.parse(body)
        // console.log(parsed_body)
        resolve(parsed_body)
        });
    })
}


module.exports.refresh_token = (ref_token) => {

    return new Promise(function(resolve, reject){
        console.log('refreshing token')
        var options = {
        'method': 'POST',
        'url': 'https://accounts.spotify.com/api/token',
        'headers': {
            'Authorization': '',//"Basic *<base64 encoded client_id:client_secret>*"
            'Content-Type': 'application/x-www-form-urlencoded',
            'grant_type': 'refresh_token'
        },
        form: {
            'grant_type': 'refresh_token',
            'refresh_token': ref_token
        }
        };
        request(options, function (error, response, body) { 
        if (error) reject(error)
        var parsed_body = JSON.parse(body)
        console.log(parsed_body)
        resolve(parsed_body)
        });
    })
   
}



module.exports.random_song = (access_token) => {
    return new Promise(function(resolve,reject){

        var random = Math.floor(Math.random() * 160) + 1    //currently 160 songs in library

        var options = {
        'method': 'GET',
        'url': 'https://api.spotify.com/v1/me/tracks?market=ES&limit=1&offset=' + random,
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        }
        };
        request(options, function (error, response, body) { 
            if (error) reject(error);
            var parsed_body = JSON.parse(body)
            console.log(parsed_body)
            resolve(parsed_body)
        });

    })
}


