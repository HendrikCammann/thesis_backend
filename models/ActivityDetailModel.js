"use strict";

module.exports = {
    ActivityDetailModel: class {
        constructor(id, description, date, controls, categorization, average_data, base_data, max_data, map, distance_efforts, laps, similar_activities, splits) {
            this.id = id;
            this.description = description;
            this.date = date;
            this.controls = controls;
            this.categorization = categorization;
            this.average_data = average_data;
            this.base_data = base_data;
            this.max_data = max_data;
            this.map = map;
            this.distance_efforts = distance_efforts;
            this.laps = laps;
            this.similar_activities = similar_activities;
            this.splits = splits;
        }
    },

    ActivityDetailCategorization: class {
        constructor(type, activity_type) {
            this.type = type;
            this.activity_type = activity_type;
        }
    },

    ActivityDetailsSplits: class {
        constructor(metric, standard) {
            this.metric = metric;
            this.standart = standard;
        }
    },

    ActivityDetailMap: class {
        constructor(map, start_latlng, end_latlng) {
            this.map = map;
            this.start_latlng = start_latlng;
            this.end_latlng = end_latlng;
        }
    },

    ActivityDetailMaxData: class {
        constructor(heartrate, speed) {
            this.heartate = heartrate;
            this.speed = speed;
        }
    },

    ActivityDetailControls: class {
        constructor(has_heartrate) {
            this.has_heartrate = has_heartrate;
        }
    },

    ActivityDetailBaseData: class {
        constructor(calories, distance, duration, elevation_up, elevation_down, elevation_gain, suffer_score) {
            this.calories = calories;
            this.distance = distance;
            this.duration = duration;
            this.elevation_up = elevation_up;
            this.elevation_down = elevation_down;
            this.elevation_gain = elevation_gain;
            this.suffer_score = suffer_score;

        }
    },

    ActivityDetailAverageData: class {
        constructor(heartrate, speed, cadence) {
            this.heartrate = heartrate;
            this.speed = speed;
            this.cadence = cadence;
        }
    }
};