"use strict";

module.exports = {
    ActivityStreamModel: class {
        constructor(distance, altitude, heartrate, cadence, speed) {
            this.distance = distance;
            this.altitude = altitude;
            this.heartrate = heartrate;
            this.cadence = cadence;
            this.speed = speed;
        }
    }
};