// MessageBox.js
import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

const MessageBox = ({ message, type, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        if (onClose) onClose();
      }, 3000); // Display for 3 seconds

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!show) return null;

  const messageStyles = type === 'success' 
    ? 'bg-green-500' 
    : 'bg-red-500';

  return (
    <div className={`fixed top-4 right-4 p-4 rounded shadow-lg text-white ${messageStyles}`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={() => setShow(false)}>
          <RxCross2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default MessageBox;
