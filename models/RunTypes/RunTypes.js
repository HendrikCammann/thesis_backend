"use strict";

module.exports = {
    RunTypes: {
        All: 'All',
        Run: 'Run',
        LongRun: 'LongRun',
        ShortIntervals: 'ShortIntervals',
        LongIntervals: 'LongIntervals',
        Competition: 'Competition',
        Regeneration: 'Regeneration',
        Uncategorized: 'Uncategorized',
    },

    applyRunType: function(runType) {
        switch (runType) {
            case 0:
                return module.exports.RunTypes.Run;
            case 1:
                return module.exports.RunTypes.Competition;
            case 2:
                return module.exports.RunTypes.LongRun;
            case 3:
                return module.exports.RunTypes.ShortIntervals;
            default:
                return module.exports.RunTypes.Uncategorized;
        }
    }
};