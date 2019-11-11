const mongoose = require('mongoose');
//require chalk module to give colors to console text
const chalk = require('chalk');

const dbURL = 'mongodb://localhost/blog';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    // keepAlive: true, 
    // keepAliveInitialDelay: 300000
};

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

//export this function and imported by server.js
module.exports = () => {
    mongoose.connect(dbURL, options);

    mongoose.connection.on('connected', () => {
        console.log(connected("Mongoose default connection is open to ", dbURL));
    });

    mongoose.connection.on('error', err => {
        console.log(error("Mongoose default connection has occured "+err+" error"));
    });

    mongoose.connection.on('disconnected', () => {
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });
}