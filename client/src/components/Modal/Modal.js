import React from 'react';

import DarkOverlay from '../DarkOverlay/DarkOverlay';

import cross from '../../assets/icons/cross.png';

const Modal = ({ title, children, isModalOpen, closeModal }) => {
  if (!isModalOpen) {
    return null;
  }

  return (
    <>
      <DarkOverlay
        clicked={closeModal}
        overlayClass="modal" />
      <div className="Modal">
        <div className="modal-header">
          <span className="modal-title">
            {title}
          </span>
          <button onClick={closeModal}>
            <img src={cross} alt="cancel cross" />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;