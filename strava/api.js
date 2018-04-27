const strava = require('strava-v3');

return module.exports = {
    /**
     * Gets all activities from STRAVA
     * @param page
     * @param per_page
     * @param accessToken
     * @param cb
     */
    getActivities: function (page, per_page, accessToken, cb) {
        let activities = [];
        strava.athlete.listActivities({
            access_token: accessToken,
            page: page,
            per_page: per_page
        }, function (err, payload, limits) {
            if (!err) {
                activities = [...activities, ...payload];
                if (payload.length === per_page) {
                    page++;
                    module.exports.getActivities(page, per_page, accessToken, cb)
                } else {
                    cb(activities);
                }
            }
            else {
                console.log(err);
            }
            if (limits) {
                // console.log(limits);
            }
        });
    },

    /**
     * Gets a single activity with base data from STRAVA
     * @param activityId
     * @param accessToken
     * @param cb
     */
    getActivity: function (activityId, accessToken, cb) {
        strava.activities.get({
            access_token: accessToken,
            id: activityId
        }, function (err, payload, limits) {
            if (!err) {
                cb(payload);
            }
            else {
                console.log(err);
            }
            if (limits) {
                // console.log(limits);
            }
        });
    },

    /**
     * Gets a single athlete from STRAVA
     * @param athletheId
     * @param accessToken
     */
    getAthlete: function (athletheId, accessToken) {
        strava.athlete.get({
            access_token: accessToken,
            id: athletheId
        }, function(err, payload, limits) {
            if (!err) {
                console.log('athlete', payload);
            }
            else {
                console.log(err);
            }
            if (limits) {
                // console.log(limits);
            }
        });
    },

    /**
     * Gets heartrate, pace, etc. zones for a single activity
     * @param activityId
     * @param accessToken
     * @param cb
     */
    getActivityZones: function(activityId, accessToken, cb) {
        strava.activities.listZones({
            access_token: accessToken,
            id: activityId
        }, function (err, payload, limits) {
            if (!err) {
                cb(payload);
            }
            else {
                console.log(err);
            }
            if (limits) {
                // console.log(limits);
            }
        });
    },

    /**
     * Gets heartrate, pace, etc. streams for a single activity
     * @param activityId
     * @param streams
     * @param accessToken
     * @param cb
     */
    getActivityStreams: function (activityId, streams, accessToken, cb) {
        strava.streams.activity({
            access_token: accessToken,
            id: activityId,
            types: streams
        }, function (err, payload, limits) {
            if (!err) {
                cb(payload);
            }
            else {
                console.log(err);
            }
            if (limits) {
                // console.log(limits);
            }
        });
    }
};
