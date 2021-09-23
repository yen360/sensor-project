const express = require('express')
const path = require('path')
const app = express()
const getCachedSensorReadings = require('./get-cached-sensor-readings')

/*
We now utilize the synchronous methods exported from the 'get-cached-sensor-readings' module
*/
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/temperature', function (req, res) {
  res.send(getCachedSensorReadings.getTemperature() + '°C')
})

app.get('/humidity', function (req, res) {
  res.send(getCachedSensorReadings.getHumidity() + '%')
})

app.listen(3000, function () {
  console.log('Server listening on port 3000')
})
