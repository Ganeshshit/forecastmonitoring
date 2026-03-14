import { useState } from "react";

export default function Filters({ onApply }) {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const apply = () => {
        if (!start || !end) return;
        onApply({ start, end });
    };

    const handleKey = (e) => {
        if (e.key === "Enter") apply();
    };

    return (
        <div className="filters-row">
            <div className="field">
                <label htmlFor="start-time">Start Time</label>
                <input
                    id="start-time"
                    type="datetime-local"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    onKeyDown={handleKey}
                />
            </div>

            <div className="field">
                <label htmlFor="end-time">End Time</label>
                <input
                    id="end-time"
                    type="datetime-local"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    onKeyDown={handleKey}
                />
            </div>

            <button className="btn-apply" onClick={apply}>
                Apply Filter
            </button>
        </div>
    );
}