"use strict";

module.exports = {
    ClusterItem: class {
        constructor(name, id, individual, timeRange) {
            this.name = name;
            this.id = id;
            this.individual = individual;
            this.timeRange = timeRange;
        }
    }
};