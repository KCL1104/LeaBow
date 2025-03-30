import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, maxWidth = '90%', width = '320px' }) => {
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    
    // Prevent body scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Stop click propagation to prevent closing when clicking on modal content
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal-content"
        style={{
          width: width,
          maxWidth: maxWidth
        }}
        onClick={handleContentClick}
      >
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;