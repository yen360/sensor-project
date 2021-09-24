var sensor = require('node-dht-sensor')
const databaseOperations = require('./database-operations')
/**
 * Import the notify function from the notifier module
 */
const {notify} = require('./notifier')

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
    if (cache.temperature !== temperature) {
      notify(temperature, 'temperature')
    }
    if (cache.humidity !== humidity) {
      notify(humidity, 'humidity')
    }
    cache.temperature = temperature
    cache.humidity = humidity
  })
}, 2000)

/*
The functions that we expose only return the cached values, and don't make a call to the sensor interface everytime
*/
module.exports.getTemperature = () => cache.temperature
module.exports.getHumidity = () => cache.humidity
