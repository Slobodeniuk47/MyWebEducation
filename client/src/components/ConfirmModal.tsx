import React from 'react';
import './ConfirmModal.css';

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="yes" onClick={onConfirm}>Так</button>
          <button className="no" onClick={onCancel}>Скасувати</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
