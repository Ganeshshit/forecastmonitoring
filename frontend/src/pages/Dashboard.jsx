import { useState } from "react";
import Filters from "../components/Filters";
import HorizonSlider from "../components/HorizonSlider";
import ChartCard from "../components/ChartCard";
import StatsPanel from "../components/StatsPanel";
import Loader from "../components/Loader";
import useGenerationData from "../hooks/useGenerationData";

export default function Dashboard() {
    const [filters, setFilters] = useState({});
    const [horizon, setHorizon] = useState(4);

    const { data, stats, loading, error } = useGenerationData({ ...filters, horizon });

    const hasFilters = filters.start && filters.end;

    return (
        <div className="page-body">

            {/* Filters Card */}
            <div className="card">
                <div className="card-header">
                    <span className="card-title">Filters</span>
                    {hasFilters && (
                        <span className="card-label">
                            {new Date(filters.start).toLocaleDateString("en-GB")} →{" "}
                            {new Date(filters.end).toLocaleDateString("en-GB")} · {horizon}h horizon
                        </span>
                    )}
                </div>
                <Filters onApply={setFilters} />
                <HorizonSlider onChange={setHorizon} />
            </div>

            {/* State rendering */}
            {loading && <Loader />}

            {error && (
                <div className="error-banner">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>Error loading data: {error}</span>
                </div>
            )}

            {!loading && <ChartCard data={data} />}

            {!loading && stats && <StatsPanel stats={stats} />}

        </div>
    );
}