var sensor = require('node-dht-sensor')
var admin = require('firebase-admin')

/**
 * Read the JSON key that was downloaded from firebase, in this case, it has
 * been placed in the "/home/pi" directory, and named "firebase-key.json"
 * You can change this to the location where your key is.
 *
 * Remember, this key should not be accessible by the public, and so should not
 * be kept inside the repository
 */
const serviceAccount = require('/home/pi/sensor-project-74518-firebase-adminsdk-4xyti-8e6855e096.json')

/**
 * The firebase admin SDK is initialized with the key and the project URL
 * Change the "databaseURL" to match that of your application.
 * Once the admin object is initialized, it will have access to all the
 * functionality that firebase provides, and can now write to the database
 */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sensor-project-74518-default-rtdb.asia-southeast1.firebasedatabase.app"
})

/**
 * Initialize the database, and create refs for the temperature
 * and humidity keys on our database. This is very similar to the refs we
 * created on the client side.
 */
const db = admin.database()
const temperatureRef = db.ref('temperature')
const humidityRef = db.ref('humidity')

/**
 * Create a task that runs after a fixed interval of time
 *
 * Here, we have set the interval to be slightly longer than it was
 * before. This is to account for the delay that may occur in the network,
 * since we are not running the databas eon the local machine anymore.
 * If you find that the application is not communicating with firebase
 * as fast as you would like, try increasing this interval based on your
 * network speed.
 */
setInterval(() => {
  /**
   * Retrieve sensor readings
   */
  sensor.read(22, 4, function(err, temperature, humidity) {
    if (err) {
      /**
       * If any error comes up, log it to the console and return from this
       * function call
       */
      return console.error(err)
    }

    temperatureRef.set(temperature)
    humidityRef.set(humidity)
  })
}, 4000)
