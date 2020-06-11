const request = require("request");
const chalk = require("chalk");

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZmFjZTA0IiwiYSI6ImNrOXM1OWYwbTByY2kzbW1ycWEwbWdwaTEifQ.Paa1R7VXZLy7uS0P9vnWyw&limit=1"

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback("Check Internet Connection", undefined);
        } else if (response.body.features.length === 0) {
            callback("Try another search", undefined);
        } else {
            callback(error, {
                lat: response.body.features[0].center[0],
                lon: response.body.features[0].center[1],
                placeName: response.body.features[0].place_name,
            });
        }
    });
}

const geoLocation = (lat, lon, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=f80ededec1e2e00321607837f9c52cbc&query=" + lon + "," + lat + "&units=f";
    request({url: url, json: true}, (error, response) => {
        if(error){
            return callback("No Internet Connection", undefined);
        } else if(response.body.error){
            return callback("Invalid request", undefined);
        } else {
            callback(undefined, {
                lat: lat,
                lon: lon,
                name: response.body.location.region,
                current: response.body.current
            });
        }
    });
}

module.exports = {
    geoCode: geoCode,
    geoLocation: geoLocation
}