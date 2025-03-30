import React from 'react';

const ActionButtons = ({ onSendClick, onReceiveClick }) => {
  return (
    <div className="actions">
      <button className="action-button" onClick={onSendClick}>
        Send
      </button>
      <button className="action-button" onClick={onReceiveClick}>
        Receive
      </button>
    </div>
  );
};

export default ActionButtons;