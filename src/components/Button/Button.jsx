import React from "react";
import "./Button.css";

function Button({
    children,
    type = "button",
    variant = "primary",
    loading = false,
    disabled = false,
    onClick,
    className = ""
}) {

    return (
        <button
            type={type}
            className={`common-button ${variant} ${className}`}
            onClick={onClick}
            disabled={disabled || loading}
        >

            {loading ? (
                <>
                    <span className="button-spinner" />
                    Processing...
                </>
            ) : (
                children
            )}

        </button>
    );
}

export default Button;