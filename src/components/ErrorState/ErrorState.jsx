import React from "react";

import "./ErrorState.css";

function ErrorState({
    title = "Something Went Wrong",
    message = "We couldn't load the requested information.",
    onRetry
}) {

    return (
        <div className="error-state">

            <div className="error-state-icon">
                !
            </div>


            <h3>
                {title}
            </h3>


            <p>
                {message}
            </p>


            {onRetry && (
                <button
                    type="button"
                    className="error-retry"
                    onClick={onRetry}
                >
                    Try Again
                </button>
            )}

        </div>
    );
}

export default ErrorState;