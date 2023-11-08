import React from "react";
function customModal({ isOpen, closeModal, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">
          Close
        </button>
        {children}
      </div>
    </div>
  );
}

export default customModal;
