const { toTimestampKey } = require("./dateUtils");

const buildForecastIndex = (forecasts) => {

    const index = new Map();

    for (const f of forecasts) {

        const key = toTimestampKey(f.startTime);

        if (!index.has(key)) {
            index.set(key, []);
        }

        index.get(key).push(f);
    }

    for (const list of index.values()) {
        list.sort(
            (a, b) => new Date(b.publishTime) - new Date(a.publishTime)
        );
    }

    return index;
};


const getValidForecast = (index, actualTime, horizonHours) => {

    const key = toTimestampKey(actualTime);

    const forecasts = index.get(key);

    if (!forecasts) return null;

    const cutoff =
        new Date(actualTime).getTime() - horizonHours * 3600 * 1000;

    for (const f of forecasts) {

        const publish = new Date(f.publishTime).getTime();

        if (publish <= cutoff) {
            return f;
        }
    }

    return null;
};

module.exports = {
    buildForecastIndex,
    getValidForecast
};