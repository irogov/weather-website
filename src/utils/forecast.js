const request = require("postman-request")

const forecast = ({latitude, longitude}, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=05af85b530bff4a2cf4d8cfa858461b9&query="+latitude+","+longitude+"&units=m"
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback("There's an error")
        } else if (response.body.error) {
            callback("Can't find location")
        } else {
            const {temperature, feelsLike} = response.body.current
            // const temperature = response.body.current.temperature
            // const feelsLike = response.body.current.feelslike
            const data = {
                temperature,
                feelsLike
            }
            callback(undefined, data)
        }
    })

}

module.exports.forecast = forecast