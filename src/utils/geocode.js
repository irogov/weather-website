const request = require("postman-request")

const geocode = (adress, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(adress) + ".json?access_token=pk.eyJ1Ijoic3RhcmlrMTExMTExIiwiYSI6ImNrZnV3NnZkZzFhd3IyeG5wb29vajk2Mm8ifQ.Z-5af9YwJ9Twoj014WPBRA"
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback("Unable to connect to location service")
        } else if (response.body.features.length === 0) {
            callback("No matching location")
        } else {
            
            const latitude = response.body.features[0].center[1]
            const longitude = response.body.features[0].center[0]
            const location = response.body.features[0].place_name
            const data = {
                latitude: latitude,
                longitude: longitude,
                location: location
            }
            callback(undefined, data)
        }
    })
}



module.exports.geocode = geocode
