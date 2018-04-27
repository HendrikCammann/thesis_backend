"use strict";

module.exports = {
    ActivityModel: class {
        constructor(id, name, date, controls, average_data, base_data, max_data, categorization, map, details, streams, zones) {
            this.id = id;
            this.name = name;
            this.date = date;
            this.controls = controls;
            this.average_data = average_data;
            this.base_data = base_data;
            this.max_data = max_data;
            this.categorization = categorization;
            this.map = map;
            this.details = details;
            this.streams = streams;
            this.zones = zones;
        }
    },

    ActivityMap: class {
        constructor(map, start_latlng, end_latlng) {
            this.map = map;
            this.start_latlng = start_latlng;
            this.end_latlng = end_latlng;
        }
    },

    ActivityCategorization: class {
        constructor(cluster_anchor_month, cluster_anchor_year, cluster_anchors, type, activityType) {
            this.cluster_anchor_month = cluster_anchor_month;
            this.cluster_anchor_year = cluster_anchor_year;
            this.cluster_anchors = cluster_anchors;
            this.type = type;
            this.activityType = activityType;
        }
    },

    ActivityMaxData: class {
        constructor(heartrate, speed) {
            this.heartate = heartrate;
            this.speed = speed;
        }
    },

    ActivityBaseData: class {
        constructor(distance, duration, elevation_up, elevation_down, elevation_gain, suffer_score) {
            this.distance = distance;
            this.duration = duration;
            this.elevation_up = elevation_up;
            this.elevation_down = elevation_down;
            this.elevation_gain = elevation_gain;
            this.suffer_score = suffer_score;
        }
    },

    ActivityAverageData: class {
        constructor(heartrate, speed, cadence) {
            this.heartrate = heartrate;
            this.speed = speed;
            this.cadence = cadence;
        }
    },

    ActivityControls: class {
        constructor(has_heartrate) {
            this.has_heartrate = has_heartrate;
        }
    }
};