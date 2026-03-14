const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const generationRoutes = require("./routes/generation.routes");

const app = express();

// Security headers
app.use(helmet());

// CORS — 
app.use(
    cors({
        origin: [
            "http://localhost:5173", // Vite dev server
            "http://localhost:3000",
            'https://forecastmonitoring.vercel.app/', // Set in .env for production
        ].filter(Boolean),
        methods: ["GET"],
    })
);

app.use(express.json());

app.use("/api/generation", generationRoutes);

app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, _next) => {
    console.error("[server] Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});

module.exports = app; 