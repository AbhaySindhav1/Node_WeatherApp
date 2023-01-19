const request = require('request')



const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b94e5f25c4d28ec40e2ef1cf6f0eafee&query=' + latitude + ',' + longitude 

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        }
         else if (response.body.error) {
            console.log(response.body.error);
            callback('Unable to find ', undefined)
        }
         else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.")
        }
    })
}

module.exports = forecast