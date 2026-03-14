const axios = require("axios");

const FORECAST_API = "https://data.elexon.co.uk/bmrs/api/v1/datasets/WINDFOR";

const fetchForecastData = async (start, end) => {

    const response = await axios.get(FORECAST_API, {
        params: {
            from: start,
            to: end,
            format: "json"
        }
    });

    const records = response.data.data || [];

    return records.map(r => ({
        startTime: r.startTime,
        publishTime: r.publishTime,
        generation: Number(r.generation)
    }));
};

module.exports = { fetchForecastData };