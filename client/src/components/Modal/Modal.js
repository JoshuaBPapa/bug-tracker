import React from 'react';

import DarkOverlay from '../DarkOverlay/DarkOverlay';

const Modal = ({ children, isModalOpen, closeModal }) => {
  if (!isModalOpen) {
    return null;
  }

  return (
    <>
      <DarkOverlay
        clicked={closeModal}
        overlayClass="modal" />
      <div className="Modal">
        <button onClick={closeModal}>
          Close
        </button>
        {children}
      </div>
    </>
  );
};

export default Modal;