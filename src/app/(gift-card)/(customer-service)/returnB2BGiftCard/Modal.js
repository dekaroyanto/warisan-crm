import React from "react";

function Modal({ isOpen, closeModal, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={closeModal} className="close-button">
          Close
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
