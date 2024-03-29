const stravaApi = require('./strava/api');
const ActivityModel = require('./models/ActivityModel');
const ActivityDetailModel = require('./models/ActivityDetailModel');
const ActivityZoneModel = require('./models/ActivityZoneModel');
const ActivityStreamModel = require('./models/ActivityStreamModel');
const ClusterModel = require('./models/Clusters/ClusterModel');
const FakeData = require('./fake/TrainingCluster');

const RunTypes = require('./models/RunTypes/RunTypes');

const knex = require('knex')(require('./knexfile'));

const stravaConfig = {
    token: '386bced857a83a6a4575b2308a3de25b95fa9116',
    page: 1,
    per_page: 2,
    streams: ['cadence', 'altitude', 'velocity_smooth', 'heartrate'],
};


module.exports = {
    createUser ({ username, password }) {
        console.log(`Add user ${username} with password ${password}`);
        return knex('user').insert({
            username,
            password
        })
    },

    updateDataBase: async function () {
        console.log('Heard it');
        let activities = [];
        stravaApi.getActivities(stravaConfig.page, stravaConfig.per_page, stravaConfig.token, (items) => {
            let oldestDate = null;
            items.reverse().forEach(item => {
                if (item.type === 'Run') {
                    if (oldestDate === null) {
                        oldestDate = item.start_date;
                    }

                    let controls = new ActivityModel.ActivityControls(item.has_heartrate);
                    let avg = new ActivityModel.ActivityAverageData(item.average_heartrate, item.average_speed, item.average_cadence);
                    let base = new ActivityModel.ActivityBaseData(item.distance, item.moving_time, item.elev_high, item.elev_low, item.total_elevation_gain, item.suffer_score);
                    let max = new ActivityModel.ActivityMaxData(item.max_heartrate, item.max_speed);
                    let map = new ActivityModel.ActivityMap(item.map, item.start_latlng, item.end_latlng);

                    let anchor_year = new Date(item.start_date).getFullYear() + '-' + new Date(item.start_date).getMonth();
                    let anchor_month = new Date(item.start_date).getFullYear().toString();
                    let cluster_anchors = [];
                    let baseTimeRange = {
                        start: new Date(oldestDate),
                        end: new Date(),
                    };
                    cluster_anchors.push(new ClusterModel.ClusterItem('All', 1, false, baseTimeRange));

                    let temp = new Date(item.start_date);

                    if (temp <= FakeData.Karlsruhe.range.end && temp >= FakeData.Karlsruhe.range.start) {
                        cluster_anchors.push(FakeData.Karlsruhe.name, 2, true, FakeData.Karlsruhe.range);
                    }
                    if (temp <= FakeData.Barcelona.range.end && temp >= FakeData.Barcelona.range.start) {
                        cluster_anchors.push(FakeData.Barcelona.name, 3, true, FakeData.Barcelona.range);
                    }
                    if (temp <= FakeData.Kandel.range.end && temp >= FakeData.Kandel.range.start) {
                        cluster_anchors.push(FakeData.Kandel.name, 4, true, FakeData.Kandel.range);
                    }
                    if (temp <= FakeData.Hannover.range.end && temp >= FakeData.Hannover.range.start) {
                        cluster_anchors.push(FakeData.Hannover.name, 5, true, FakeData.Hannover.range);
                    }

                    let categorization = new ActivityModel.ActivityCategorization(anchor_month, anchor_year, cluster_anchors, RunTypes.applyRunType(item.workout_type));

                    let activity = new ActivityModel.ActivityModel(item.id, item.name, item.start_date, controls, avg, base, max, categorization, map, null, null, null);
                    activities.unshift(activity);
                }
            });
            knex('activities').truncate().then( function () {
                console.log('dropped');
            });
            activities.map(activity => {
                knex('activities').insert({
                    id: activity.id,
                    name: activity.name,
                    date: activity.date,
                    controls: JSON.stringify(activity.controls),
                    average_data: JSON.stringify(activity.average_data),
                    base_data: JSON.stringify(activity.base_data),
                    max_Data: JSON.stringify(activity.max_data),
                    categorization: JSON.stringify(activity.categorization),
                    map: JSON.stringify(activity.map),
                    details: null,
                    zones: null,
                    streams: null,
                }).then( function (result) {
                    console.log('inserted');     // respond back to request
                })
            });
        });
    },

    fetchDetails: async function () {
        knex.select().from('activities').then(function(result) {
            result.map(item => {
                stravaApi.getActivity(item.id, stravaConfig.token, (activity) => {
                    let categorization = new ActivityDetailModel.ActivityDetailCategorization(activity.type, RunTypes.applyRunType(activity.workout_type));
                    let controls = new ActivityDetailModel.ActivityDetailControls(activity.has_heartrate);
                    let avg = new ActivityDetailModel.ActivityDetailAverageData(activity.average_heartrate, activity.average_speed, activity.average_cadence);
                    let max = new ActivityDetailModel.ActivityDetailMaxData(activity.max_heartrate, activity.max_speed);
                    let base = new ActivityDetailModel.ActivityDetailBaseData(activity.calories, activity.distance, activity.moving_time, activity.elev_high, activity.elev_low, activity.total_elevation_gain, activity.suffer_score);
                    let map = new ActivityDetailModel.ActivityDetailMap(activity.map, activity.start_latlng, activity.end_latlng);
                    let splits = new ActivityDetailModel.ActivityDetailsSplits(activity.splits_metric, activity.splits_standard);

                    let activityDetails = new ActivityDetailModel.ActivityDetailModel(activity.id, activity.description, activity.date, controls, categorization, avg, base, max, map, activity.best_effords, activity.laps, activity.similar_activities, splits)
                    knex('activities')
                        .where('id', '=', item.id)
                        .update({
                            details: JSON.stringify(activityDetails)
                        }).then(function (result) {
                            console.log('inserted details for: ' + item.id);
                        })
                });
            })
        })
    },

    fetchZones: async function () {
        knex.select().from('activities').then(function(result) {
            result.map(item => {
                stravaApi.getActivityZones(item.id, stravaConfig.token, (zones) => {
                    let hr;
                    let pace;
                    zones.map(zone => {
                        switch (zone.type) {
                            case 'heartrate':
                                hr = zone;
                                break;
                            case 'pace':
                                pace = zone;
                                break;
                        }
                    });
                    let activityZones = new ActivityZoneModel.ActivityZoneModel(pace, hr);
                    knex('activities')
                        .where('id', '=', item.id)
                        .update({
                            zones: JSON.stringify(activityZones)
                        }).then(function (result) {
                        console.log('inserted zones for: ' + item.id);
                    })
                });
            })
        })
    },

    fetchStreams: async function () {
        knex.select().from('activities').then(function(result) {
            result.map(item => {
                stravaApi.getActivityStreams(item.id, stravaConfig.streams, stravaConfig.token, (streams) => {
                    let distance;
                    let hr;
                    let pace;
                    let altitude;
                    let cadence;
                    for (let prop in streams) {
                        switch (streams[prop].type) {
                            case 'distance':
                                distance = streams[prop];
                                break;
                            case 'heartrate':
                                hr = streams[prop];
                                break;
                            case 'altidude':
                                altitude = streams[prop];
                                break;
                            case 'cadence':
                                cadence = streams[prop];
                                break;
                            case 'velocity_smooth':
                                pace = streams[prop];
                                break;
                        }
                    }
                    let activityStreams = new ActivityStreamModel.ActivityStreamModel(distance, altitude, hr, cadence, pace);
                    knex('activities')
                        .where('id', '=', item.id)
                        .update({
                            streams: JSON.stringify(activityStreams)
                        }).then(function (result) {
                        console.log('inserted streams for: ' + item.id);
                    })
                });
            })
        })
    }
};