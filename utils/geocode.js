const request = require("request")


const geocode = (address, callback) => {
    const latlong_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYW51cmFnNDkiLCJhIjoiY2tlYjB5c3ViMDNwODMxbXR2dWdrc3oxdCJ9.bHT2akotb22DRi_atQcIDQ&limit=1"

    request({ url: latlong_url, json: true }, (error, { body }) => {
        if (error) {
            callback("unable to connect", undefined)
        }
        else if (body.features.length == 0) {
            callback("unable to find location", undefined)
        }

        else {
            const [long, lat] = (body.features[0].center)
            const location = body.features[0].place_name
            callback(undefined, { long, lat, location })
        }
    })
}


module.exports = geocode