import React from "react";

import "./Modal.css";

function Modal({
    isOpen,
    title,
    children,
    onClose,
    width = "500px"
}) {

    if (!isOpen) {
        return null;
    }


    return (
        <div className="modal-overlay">

            <div
                className="common-modal"
                style={{
                    maxWidth: width
                }}
            >

                <div className="modal-header">

                    <h3>
                        {title}
                    </h3>


                    <button
                        type="button"
                        className="modal-close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                <div className="modal-body">
                    {children}
                </div>

            </div>

        </div>
    );
}

export default Modal;