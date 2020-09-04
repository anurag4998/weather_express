const request = require("request")

const forecast = (long, lat, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=a2f8067642768a07bcdd48955ee7d41c&query=" + encodeURIComponent(lat) + "," + encodeURIComponent(long)
    request({ url, json: true }, (error, { body }) => {
        if (error)
            callback("unable to connect", undefined)
        else if (body.error) {
            callback("unable to find location", undefined)
        }
        else
            callback(undefined, `Looks like it is ${body.current.weather_descriptions[0]} out there` + `. It is currently ${body.current.temperature} degrees.`)
    })
}

module.exports = forecast