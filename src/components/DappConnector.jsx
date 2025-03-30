import React, { useState } from 'react';

const DappConnector = ({ dappInfo, onConnect, onDismiss }) => {
  const [permissions, setPermissions] = useState({
    viewAddress: true,
    sendTransactions: true,
    signMessages: true
  });
  
  const handlePermissionChange = (permission) => {
    setPermissions(prev => ({
      ...prev,
      [permission]: !prev[permission]
    }));
  };
  
  const handleConnect = () => {
    onConnect(permissions);
  };
  
  const siteName = dappInfo?.siteName || 'Unknown site';
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        backgroundColor: '#FFFFFF', 
        padding: '15px', 
        borderRadius: '4px', 
        marginBottom: '20px',
        border: '2px solid #000000'
      }}>
        <div style={{ fontSize: '18px', fontWeight: '500', marginBottom: '5px', color: '#000000' }}>
          {siteName}
        </div>
        <div style={{ fontSize: '14px', color: '#000000', opacity: 0.7 }}>
          wants to connect to your wallet
        </div>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontWeight: '500', marginBottom: '10px', color: '#000000' }}>Permissions:</div>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input 
            type="checkbox" 
            id="viewAddress"
            checked={permissions.viewAddress}
            onChange={() => handlePermissionChange('viewAddress')}
            style={{ marginRight: '10px', accentColor: '#000000' }}
          />
          <label htmlFor="viewAddress" style={{ color: '#000000' }}>View wallet address</label>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input 
            type="checkbox" 
            id="sendTransactions"
            checked={permissions.sendTransactions}
            onChange={() => handlePermissionChange('sendTransactions')}
            style={{ marginRight: '10px', accentColor: '#000000' }}
          />
          <label htmlFor="sendTransactions" style={{ color: '#000000' }}>Send transactions (requires approval)</label>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input 
            type="checkbox" 
            id="signMessages"
            checked={permissions.signMessages}
            onChange={() => handlePermissionChange('signMessages')}
            style={{ marginRight: '10px', accentColor: '#000000' }}
          />
          <label htmlFor="signMessages" style={{ color: '#000000' }}>Sign messages (requires approval)</label>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          className="form-button" 
          style={{ flex: 1 }}
          onClick={handleConnect}
        >
          Connect
        </button>
        
        <button 
          className="form-button secondary" 
          style={{ flex: 1 }}
          onClick={onDismiss}
        >
          Cancel
        </button>
      </div>
      
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#000000', opacity: 0.7, textAlign: 'center' }}>
        You can revoke these permissions at any time from the Settings tab.
      </div>
    </div>
  );
};

export default DappConnector;