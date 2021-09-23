var sensor = require('node-dht-sensor')

/*
Instantiate the cache. In this case its a simple variable stored in local memory
*/
const cache = {
  temperature: null,
  humidity: null
}

/*
Run a function to get the sensor readings every 2 seconds (the same sampling rate as our sensor)
*/
setInterval(() => {
  sensor.read(22, 4, function(err, temperature, humidity) {
    if (err) {
      return console.error(err)
    }
    /*
    Set the values of the cache on receiving new readings
    */
    cache.temperature = temperature.toFixed(1)
    cache.humidity = humidity.toFixed(1)
  })
}, 2000)

/*
The functions that we expose only return the cached values, and don't make a call to the sensor interface everytime
*/
module.exports.getTemperature = () => cache.temperature
module.exports.getHumidity = () => cache.humidity
