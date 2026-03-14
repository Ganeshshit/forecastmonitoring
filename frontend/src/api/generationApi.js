import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
    timeout: 15000,
});

function toISO(dtLocal) {
    if (!dtLocal) return undefined;
    if (dtLocal.endsWith("Z")) return dtLocal;
    return dtLocal.length === 16 ? dtLocal + ":00Z" : dtLocal + "Z";
}

export const getGenerationData = async (params) => {
    const normalized = {
        ...params,
        start: toISO(params.start),
        end: toISO(params.end),
    };
    const res = await api.get("/api/generation", { params: normalized });
    return res.data;
};