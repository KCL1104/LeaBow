import React from 'react';

const AppLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="app-loader">
      <div className="loader"></div>
      <div style={{ 
        color: '#000000', 
        fontSize: '16px',
        fontWeight: '500'
      }}>
        {message}
      </div>
    </div>
  );
};

export default AppLoader;