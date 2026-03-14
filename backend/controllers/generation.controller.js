

const { fetchActualData } = require("../services/actual.service");
const { fetchForecastData } = require("../services/forecast.service");
const { processData } = require("../services/processing.service");
const { parseHorizon } = require("../utils/dateUtils");


exports.getGenerationData = async (req, res) => {
    try {
        const { start, end, horizon, stats = "true", hourly = "false" } = req.query;

        if (!start || !end) {
            return res.status(400).json({
                error: "Missing required parameters: start and end",
            });
        }

        const startDate = new Date(start);
        const endDate = new Date(end);

        if (isNaN(startDate) || isNaN(endDate)) {
            return res.status(400).json({
                error: "Invalid date format. Use ISO 8601, e.g. 2024-01-01T00:00:00Z",
            });
        }

        if (startDate >= endDate) {
            return res.status(400).json({
                error: "start must be before end",
            });
        }

        const horizonHours = parseHorizon(horizon);
        const includeStats = stats !== "false";
        const includeHourly = hourly === "true";

        const [actualData, forecastData] = await Promise.all([
            fetchActualData(start, end),
            fetchForecastData(start, end),
        ]);

        const result = processData(actualData, forecastData, horizonHours, {
            includeStats,
            includeHourly,
        });
        console.log("Actual records:", actualData.length);
        console.log("Forecast records:", forecastData.length);
        return res.status(200).json(result);
    } catch (error) {
        console.error("[generation.controller] Error:", error.message);

        // Surface upstream API errors with a helpful message
        if (error.response) {
            return res.status(502).json({
                error: "Upstream API error",
                status: error.response.status,
                detail: error.response.data,
            });
        }

        if (error.code === "ECONNABORTED") {
            return res.status(504).json({ error: "Upstream API timed out" });
        }

        return res.status(500).json({ error: "Internal server error" });
    }
};