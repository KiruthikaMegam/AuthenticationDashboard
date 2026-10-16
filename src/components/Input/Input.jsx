import React from "react";
import "./Input.css";

function Input({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder = "",
    error = "",
    disabled = false,
    required = false,
    autoComplete
}) {

    return (
        <div className="common-input-group">

            {label && (
                <label htmlFor={name}>
                    {label}

                    {required && (
                        <span className="required-star">
                            *
                        </span>
                    )}
                </label>
            )}

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                autoComplete={autoComplete}
                className={
                    error
                        ? "common-input input-error"
                        : "common-input"
                }
            />

            {error && (
                <span className="input-error-text">
                    {error}
                </span>
            )}

        </div>
    );
}

export default Input;