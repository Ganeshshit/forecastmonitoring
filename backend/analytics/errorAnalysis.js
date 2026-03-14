
const signedError = (actual, forecast) => forecast - actual;

const absoluteError = (actual, forecast) => Math.abs(forecast - actual);


const percentageError = (actual, forecast) => {
    if (actual === 0) return null;
    return ((forecast - actual) / actual) * 100;
};


const percentile = (sorted, p) => {
    if (sorted.length === 0) return 0;
    if (sorted.length === 1) return sorted[0];
    const idx = (p / 100) * (sorted.length - 1);
    const lo = Math.floor(idx);
    const hi = Math.ceil(idx);
    const frac = idx - lo;
    return sorted[lo] * (1 - frac) + sorted[hi] * frac;
};


const computeStats = (mergedData) => {
    if (!mergedData.length) {
        return {
            count: 0,
            meanError: null,
            medianError: null,
            p99Error: null,
            meanAbsoluteError: null,
            rmse: null,
        };
    }

    const errors = mergedData.map((d) => d.error);
    const absErrors = mergedData.map((d) => Math.abs(d.error));

    // Sort for percentile calculations
    const sortedErrors = [...errors].sort((a, b) => a - b);
    const sortedAbsErrors = [...absErrors].sort((a, b) => a - b);

    const mean = (arr) => arr.reduce((s, v) => s + v, 0) / arr.length;

    const rmse = Math.sqrt(
        errors.reduce((s, e) => s + e * e, 0) / errors.length
    );

    return {
        count: mergedData.length,
        meanError: +mean(errors).toFixed(2),
        medianError: +percentile(sortedErrors, 50).toFixed(2),
        p10Error: +percentile(sortedErrors, 10).toFixed(2),
        p90Error: +percentile(sortedErrors, 90).toFixed(2),
        p99Error: +percentile(sortedErrors, 99).toFixed(2),
        meanAbsoluteError: +mean(absErrors).toFixed(2),
        p90AbsoluteError: +percentile(sortedAbsErrors, 90).toFixed(2),
        rmse: +rmse.toFixed(2),
    };
};


const errorByHour = (mergedData) => {
    const groups = {};

    for (const d of mergedData) {
        const hour = new Date(d.time).getUTCHours();
        if (!groups[hour]) groups[hour] = [];
        groups[hour].push(d.error);
    }

    return Object.entries(groups)
        .map(([hour, errs]) => ({
            hour: parseInt(hour),
            meanError: +(errs.reduce((s, e) => s + e, 0) / errs.length).toFixed(2),
            count: errs.length,
        }))
        .sort((a, b) => a.hour - b.hour);
};

module.exports = {
    signedError,
    absoluteError,
    percentageError,
    computeStats,
    errorByHour,
    percentile,
};