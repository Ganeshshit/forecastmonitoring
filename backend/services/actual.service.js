const axios = require("axios");
const { ACTUAL_API, WIND_FUEL_TYPE } = require("../config/apiConfig");

const fetchActualData = async (start, end) => {

    const response = await axios.get(ACTUAL_API, {
        params: {
            from: start,
            to: end,
            format: "json"
        }
    });

    const records = response.data.data || [];

    const wind = records.filter(r => r.fuelType === WIND_FUEL_TYPE);

    return wind.map(r => ({
        startTime: r.startTime,
        generation: Number(r.generation)
    }));
};

module.exports = { fetchActualData };