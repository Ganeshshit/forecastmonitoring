

module.exports = {
    ACTUAL_API: "https://data.elexon.co.uk/bmrs/api/v1/datasets/FUELHH",
    FORECAST_API: "https://data.elexon.co.uk/bmrs/api/v1/datasets/WINDFOR",


    API_TIMEOUT: 15000,

    CACHE_TTL: 60,
    WIND_FUEL_TYPE: "WIND",

    MIN_HORIZON_HOURS: 0,
    MAX_HORIZON_HOURS: 48,
    DATA_RESOLUTION_MINUTES: 30,
};