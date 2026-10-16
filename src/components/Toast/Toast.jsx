import React from "react";
import { useToast } from "../../context/ToastContext";

import "./Toast.css";

function Toast() {

    const {
        toast,
        hideToast
    } = useToast();


    if (!toast) {
        return null;
    }


    return (
        <div
            className={`toast-container toast-${toast.type}`}
        >

            <div className="toast-icon">

                {toast.type === "success" && "✓"}

                {toast.type === "error" && "!"}

                {toast.type === "warning" && "!"}

                {toast.type === "info" && "i"}

            </div>


            <div className="toast-content">

                <strong>
                    {
                        toast.type.charAt(0).toUpperCase()
                        + toast.type.slice(1)
                    }
                </strong>

                <span>
                    {toast.message}
                </span>

            </div>


            <button
                type="button"
                className="toast-close"
                onClick={hideToast}
            >
                ×
            </button>

        </div>
    );
}

export default Toast;