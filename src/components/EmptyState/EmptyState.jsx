import React from "react";

import "./EmptyState.css";

function EmptyState({
    title = "No Data Found",
    message = "There is no information available right now.",
    actionText,
    onAction
}) {

    return (
        <div className="empty-state">

            <div className="empty-icon">
                ∅
            </div>


            <h3>
                {title}
            </h3>


            <p>
                {message}
            </p>


            {actionText && (
                <button
                    type="button"
                    className="empty-action"
                    onClick={onAction}
                >
                    {actionText}
                </button>
            )}

        </div>
    );
}

export default EmptyState;