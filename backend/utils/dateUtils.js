
const subtractHours = (date, hours) => {
    const d = new Date(date);
    d.setTime(d.getTime() - hours * 60 * 60 * 1000);
    return d;
};


const floorToHalfHour = (date) => {
    const d = new Date(date);
    const minutes = d.getMinutes();
    d.setMinutes(minutes < 30 ? 0 : 30, 0, 0);
    return d;
};


const toTimestampKey = (date) => {
    const d = new Date(date);
    // Strip seconds + ms for consistent key
    d.setSeconds(0, 0);
    return d.toISOString();
};


const isInRange = (date, start, end) => {
    const t = new Date(date).getTime();
    return t >= new Date(start).getTime() && t <= new Date(end).getTime();
};

const parseHorizon = (raw) => {
    const h = parseFloat(raw);
    return isNaN(h) ? 0 : Math.max(0, Math.min(h, 48));
};

module.exports = {
    subtractHours,
    floorToHalfHour,
    toTimestampKey,
    isInRange,
    parseHorizon,
};