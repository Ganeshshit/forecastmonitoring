
const { buildForecastIndex, getValidForecast } = require("../utils/forecastFilter");
const { signedError, computeStats, errorByHour } = require("../analytics/errorAnalysis");


const processData = (actualData, forecastData, horizonHours, options = {}) => {
    const { includeStats = true, includeHourly = false } = options;
    const forecastIndex = buildForecastIndex(forecastData);

    const merged = [];

    for (const actual of actualData) {
        const forecast = getValidForecast(
            forecastIndex,
            actual.startTime,
            horizonHours
        );

        if (!forecast) continue;

        const actualMW = actual.generation;
        const forecastMW = forecast.generation;

        merged.push({
            time: actual.startTime,
            actual: actualMW,
            forecast: forecastMW,
            error: signedError(actualMW, forecastMW),
            publishTime: forecast.publishTime, // useful for debugging / analysis
        });
    }

    merged.sort((a, b) => new Date(a.time) - new Date(b.time));

    const result = { data: merged };

    if (includeStats) {
        result.stats = computeStats(merged);
    }

    if (includeHourly) {
        result.hourlyErrors = errorByHour(merged);
    }

    return result;
};

module.exports = { processData };