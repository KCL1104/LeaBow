import React, { useState, useEffect, useCallback } from 'react';

const Notification = ({ type, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose();
      }, 300);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div className="notification" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s' }}>
      {message}
    </div>
  );
};

const NotificationManager = () => {
  const [notifications, setNotifications] = useState([]);
  
  const addNotification = useCallback((notification) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, ...notification }]);
  }, []);
  
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);
  
  // Helper functions to add specific types of notifications
  const showSuccess = useCallback((message) => {
    addNotification({ type: 'success', message });
  }, [addNotification]);
  
  const showError = useCallback((message) => {
    addNotification({ type: 'error', message });
  }, [addNotification]);
  
  const showInfo = useCallback((message) => {
    addNotification({ type: 'info', message });
  }, [addNotification]);
  
  // Expose the notification functions to the global scope
  useEffect(() => {
    window.notifications = {
      show: addNotification,
      success: showSuccess,
      error: showError,
      info: showInfo
    };
    
    return () => {
      delete window.notifications;
    };
  }, [addNotification, showSuccess, showError, showInfo]);
  
  return (
    <>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </>
  );
};

export default NotificationManager;