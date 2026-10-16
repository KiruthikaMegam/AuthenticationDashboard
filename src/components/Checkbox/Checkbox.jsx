import React from "react";
import "./Checkbox.css";

function Checkbox({
    checked,
    onChange,
    label,
    name
}) {

    return (
        <label className="common-checkbox">

            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
            />

            <span className="checkbox-box">
                {checked && "✓"}
            </span>

            <span className="checkbox-text">
                {label}
            </span>

        </label>
    );
}

export default Checkbox;