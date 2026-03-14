import {
    AreaChart,
    Area,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
} from "recharts";
import { useMemo } from "react";

function formatTime(t) {
    if (!t) return "";
    const d = new Date(t);
    return d.toLocaleString("en-GB", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

function formatMW(val) {
    if (val == null) return "";
    if (Math.abs(val) >= 1000) return `${(val / 1000).toFixed(1)}k`;
    return `${val}`;
}

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const actual = payload.find((p) => p.dataKey === "actual");
    const forecast = payload.find((p) => p.dataKey === "forecast");
    const error = actual && forecast ? forecast.value - actual.value : null;

    return (
        <div
            style={{
                background: "#1c2330",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "10px",
                padding: "12px 16px",
                fontSize: "12px",
                color: "#e6edf3",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                minWidth: "180px",
            }}
        >
            <div
                style={{
                    color: "#8b949e",
                    marginBottom: "8px",
                    fontFamily: "DM Mono, monospace",
                    fontSize: "11px",
                }}
            >
                {formatTime(label)}
            </div>
            {actual && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        marginBottom: "4px",
                    }}
                >
                    <span style={{ color: "#8b949e" }}>
                        <span
                            style={{
                                display: "inline-block",
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                background: "#3b82f6",
                                marginRight: "6px",
                            }}
                        />
                        Actual
                    </span>
                    <span style={{ fontFamily: "DM Mono, monospace", fontWeight: 500 }}>
                        {actual.value?.toLocaleString()} MW
                    </span>
                </div>
            )}
            {forecast && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        marginBottom: "4px",
                    }}
                >
                    <span style={{ color: "#8b949e" }}>
                        <span
                            style={{
                                display: "inline-block",
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                background: "#22c55e",
                                marginRight: "6px",
                            }}
                        />
                        Forecast
                    </span>
                    <span style={{ fontFamily: "DM Mono, monospace", fontWeight: 500 }}>
                        {forecast.value?.toLocaleString()} MW
                    </span>
                </div>
            )}
            {error !== null && (
                <div
                    style={{
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        marginTop: "8px",
                        paddingTop: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                    }}
                >
                    <span style={{ color: "#8b949e" }}>Error</span>
                    <span
                        style={{
                            fontFamily: "DM Mono, monospace",
                            color: error > 0 ? "#f59e0b" : "#ef4444",
                            fontWeight: 500,
                        }}
                    >
                        {error > 0 ? "+" : ""}
                        {error?.toLocaleString()} MW
                    </span>
                </div>
            )}
        </div>
    );
};

export default function ChartCard({ data }) {
    const chartData = useMemo(() => {
        if (!data || !data.length) return [];
        return data.map((d) => ({
            ...d,
            timeLabel: d.time,
        }));
    }, [data]);

    if (!data || data.length === 0) {
        return (
            <div className="card">
                <div className="empty-state">
                    <svg
                        className="empty-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <path d="M3 3v18h18M7 16l4-4 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="empty-text">Select a date range and apply filter to view data</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-header">
                <span className="card-title">Wind Power Generation — UK National</span>
                <span className="card-label">{data.length} data points</span>
            </div>

            <div className="chart-legend">
                <div className="legend-item">
                    <div className="legend-dot" style={{ background: "#3b82f6" }} />
                    <span>Actual generation</span>
                </div>
                <div className="legend-item">
                    <div className="legend-dot" style={{ background: "#22c55e" }} />
                    <span>Forecasted generation</span>
                </div>
            </div>

            <div className="chart-infobar">
                <span className="chart-meta">Power (MW)</span>
                <span className="chart-meta">Target Time End (UTC)</span>
            </div>

            <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                        <defs>
                            <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255,255,255,0.05)"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="timeLabel"
                            tickFormatter={(t) => formatTime(t)}
                            tick={{ fill: "#4a5568", fontSize: 10, fontFamily: "DM Mono, monospace" }}
                            axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                            tickLine={false}
                            interval="preserveStartEnd"
                        />

                        <YAxis
                            tickFormatter={formatMW}
                            tick={{ fill: "#4a5568", fontSize: 10, fontFamily: "DM Mono, monospace" }}
                            axisLine={false}
                            tickLine={false}
                            width={48}
                        />

                        <Tooltip content={<CustomTooltip />} />

                        <Line
                            type="monotone"
                            dataKey="actual"
                            stroke="#3b82f6"
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{ r: 5, fill: "#3b82f6", stroke: "#0d1117", strokeWidth: 2 }}
                            name="Actual"
                        />

                        <Line
                            type="monotone"
                            dataKey="forecast"
                            stroke="#22c55e"
                            strokeWidth={2}
                            strokeDasharray="6 3"
                            dot={false}
                            activeDot={{ r: 5, fill: "#22c55e", stroke: "#0d1117", strokeWidth: 2 }}
                            name="Forecast"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}