import { useEffect, useState, useRef } from "react";
import { getGenerationData } from "../api/generationApi";

export default function useGenerationData(filters) {
    const [data, setData] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const abortRef = useRef(null);

    useEffect(() => {
        if (abortRef.current) abortRef.current.abort();
        abortRef.current = new AbortController();

        const load = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await getGenerationData(filters);

                setData(res.data || []);
                setStats(res.stats || null);
            } catch (err) {
                if (err.name !== "CanceledError" && err.name !== "AbortError") {
                    setError(err.message || "Failed to fetch data");
                }
            } finally {
                setLoading(false);
            }
        };

        if (filters.start && filters.end) {
            load();
        }
    }, [JSON.stringify(filters)]);

    return { data, stats, loading, error };
}