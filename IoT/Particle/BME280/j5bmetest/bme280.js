// Require the Grow.js build and johnny-five library.
var GrowInstance = require('Grow.js');
var five = require('johnny-five');
var ascii = require('ascii-codes');
var Particle = require("particle-io");


// Create a new board object
var board = new five.Board({
    io: new Particle({
        token: process.env.PARTICLE_TOKEN,
        deviceId: process.env.PARTICLE_DEVICE_ID
    })
});

// When board emits a 'ready' event run this start function.
board.on('ready', function start() {
    var multi = new five.Multi({
        controller: "BME280"
    });

    // Create a new grow instance.
    var grow = new GrowInstance({
        host: 'IP_ADDRESS_OF_GROW-IOT_SERVER', // localhost:3000 by default
        port: 3000,
        name: 'BME280', // The display name for the thing.
        username: 'jake2@gmail.com', // The username of the account you want this device to be added to.
        actions: {
            temp_data: {
                name: 'Temperature sensor',
                template: 'sensor',
                type: 'temperature',
                schedule: 'every 2 seconds',
                function: function () {
                    // // Send value to Grow-IoT
                    grow.log({
                      type: 'temperature',
                      value: multi.temperature.celsius
                    });
                }
            },
            barometric: {
                name: 'Barometric pressure sensor',
                template: 'sensor',
                type: 'barometric',
                schedule: 'every 2 seconds',
                function: function () {
                    // // Send value to Grow-IoT
                    grow.log({
                      type: 'barometric',
                      value: multi.barometer.pressure
                    });
                }
            },
            humidity: {
                name: 'Barometric pressure sensor',
                template: 'sensor',
                type: 'humidity',
                schedule: 'every 2 seconds',
                function: function () {
                    // // Send value to Grow-IoT
                    grow.log({
                      type: 'humidity',
                      value: multi.hygrometer.relativeHumidity
                    });
                }
            }
        }
    });
});
