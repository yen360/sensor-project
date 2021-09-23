var sensor = require('node-dht-sensor')
/**
 * Import the database module that we created earlier
 */
const databaseOperations = require('./database-operations')

/*
Instantiate the cache. In this case its a simple variable stored in local memory
*/
const cache = {
  temperature: 0,
  humidity: 0
}

/*
Run a function to get the sensor readings every 2 seconds (the same sampling rate as our sensor)
*/
setInterval(() => {
  sensor.read(22, 4, function(err, temperature, humidity) {
    if (err) {
      return console.error(err)
    }
    /**
     * In addition to storing the readings in our cache, we also store them in our database, using the methods that we exported from our module
     */
    databaseOperations.insertReading('temperature', temperature)
    databaseOperations.insertReading('humidity', humidity)
    cache.temperature = temperature.toFixed(1)
    cache.humidity = humidity.toFixed(1)
  })
}, 2000)

/*
The functions that we expose only return the cached values, and don't make a call to the sensor interface everytime
*/
module.exports.getTemperature = () => cache.temperature
module.exports.getHumidity = () => cache.humidity
