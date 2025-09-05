import React from 'react';

const ConfirmationModal = ({ title, message, onConfirm, onClose, confirmText = 'Delete', isConfirming }) => {
    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{message}</p>
                <div className="modal-action">
                    <button onClick={onClose} className="btn" disabled={isConfirming}>Cancel</button>
                    <button onClick={onConfirm} className="btn btn-error" disabled={isConfirming}>
                        {isConfirming ? <span className="loading loading-spinner"></span> : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;