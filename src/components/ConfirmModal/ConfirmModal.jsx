import React from "react";

import Modal from "../Modal/Modal";

import "./ConfirmModal.css";

function ConfirmModal({
    isOpen,
    title = "Confirm Action",
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    loading = false
}) {

    return (
        <Modal
            isOpen={isOpen}
            title={title}
            onClose={onCancel}
            width="430px"
        >

            <div className="confirm-content">

                <div className="confirm-icon">
                    !
                </div>


                <p>
                    {message}
                </p>


                <div className="confirm-actions">

                    <button
                        type="button"
                        className="confirm-cancel"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        {cancelText}
                    </button>


                    <button
                        type="button"
                        className="confirm-button"
                        onClick={onConfirm}
                        disabled={loading}
                    >

                        {loading ? (
                            <>
                                <span className="confirm-spinner" />
                                Processing...
                            </>
                        ) : (
                            confirmText
                        )}

                    </button>

                </div>

            </div>

        </Modal>
    );
}

export default ConfirmModal;