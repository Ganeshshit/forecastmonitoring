import { useState } from "react";

export default function HorizonSlider({ onChange }) {
    const [value, setValue] = useState(4);

    const handle = (e) => {
        const v = Number(e.target.value);
        setValue(v);
        onChange(v);
    };

    const pct = (value / 48) * 100;

    return (
        <div className="horizon-wrapper">
            <div className="horizon-header">
                <span className="horizon-label">Forecast Horizon</span>
                <span className="horizon-value">{value}h</span>
            </div>

            <input
                type="range"
                className="horizon-slider"
                min="0"
                max="48"
                step="1"
                value={value}
                onChange={handle}
                style={{
                    background: `linear-gradient(to right, #3b82f6 ${pct}%, rgba(255,255,255,0.08) ${pct}%)`,
                }}
            />

            <div className="horizon-ticks">
                <span>0h</span>
                <span>12h</span>
                <span>24h</span>
                <span>36h</span>
                <span>48h</span>
            </div>
        </div>
    );
}