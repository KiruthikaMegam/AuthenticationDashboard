
import React, { useState } from "react";
import "./PasswordInput.css";

function PasswordInput({
    label = "Password",
    name = "password",
    value,
    onChange,
    placeholder = "Enter password",
    error = "",
    required = false,
    autoComplete = "current-password"
}) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="password-input-group">
            <label htmlFor={name}>
                {label}

                {required && (
                    <span className="password-required">
                        *
                    </span>
                )}
            </label>

            <div
                className={
                    error
                        ? "password-wrapper password-error"
                        : "password-wrapper"
                }
            >
                <span className="password-icon" aria-hidden="true">
                    •
                </span>

                <input
                    id={name}
                    name={name}
                    type={visible ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    required={required}
                    aria-invalid={Boolean(error)}
                    aria-describedby={
                        error ? `${name}-error` : undefined
                    }
                />

                <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setVisible((previous) => !previous)}
                    aria-label={
                        visible
                            ? `Hide ${label.toLowerCase()}`
                            : `Show ${label.toLowerCase()}`
                    }
                >
                    {visible ? "Hide" : "Show"}
                </button>
            </div>

            {error && (
                <span
                    id={`${name}-error`}
                    className="password-error-text"
                    role="alert"
                >
                    {error}
                </span>
            )}
        </div>
    );
}

export default PasswordInput;
