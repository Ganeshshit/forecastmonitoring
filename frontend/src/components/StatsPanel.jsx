function fmt(val) {
    if (val == null) return "—";
    return Math.round(val).toLocaleString();
}

const STAT_DEFS = [
    { key: "meanError", label: "Mean Error", accent: "accent-blue", desc: "Avg signed error" },
    { key: "medianError", label: "Median Error", accent: "accent-purple", desc: "50th percentile" },
    { key: "meanAbsoluteError", label: "MAE", accent: "accent-teal", desc: "Mean absolute error" },
    { key: "rmse", label: "RMSE", accent: "accent-amber", desc: "Root mean sq. error" },
    { key: "p90Error", label: "P90 Error", accent: "accent-red", desc: "90th percentile" },
    { key: "p99Error", label: "P99 Error", accent: "accent-red", desc: "99th percentile" },
    { key: "p90AbsoluteError", label: "P90 Abs Error", accent: "accent-amber", desc: "90th pct absolute" },
    { key: "count", label: "Data Points", accent: "accent-green", desc: "Records in range" },
];

export default function StatsPanel({ stats }) {
    if (!stats) return null;

    return (
        <div className="card">
            <div className="card-header">
                <span className="card-title">Forecast Error Statistics</span>
                <span className="card-label">{stats.count?.toLocaleString()} records</span>
            </div>

            <div className="stats-grid">
                {STAT_DEFS.map(({ key, label, accent, desc }) => (
                    <div key={key} className={`stat-card ${accent}`}>
                        <span className="stat-label">{label}</span>
                        <span className="stat-value">{fmt(stats[key])}</span>
                        <span className="stat-unit">{key === "count" ? "records" : "MW — " + desc}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}