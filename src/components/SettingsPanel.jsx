import React, { useState, useEffect } from 'react';

const SettingsPanel = () => {
  const [networkType, setNetworkType] = useState('mainnet');
  const [gasPreference, setGasPreference] = useState('standard');
  const [currency, setCurrency] = useState('usd');
  const [notification, setNotification] = useState(true);
  const [theme, setTheme] = useState('highContrast');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  
  // Load settings from storage
  useEffect(() => {
    chrome.storage.local.get(
      ['networkType', 'gasPreference', 'currency', 'notification', 'theme'],
      (data) => {
        if (data.networkType) setNetworkType(data.networkType);
        if (data.gasPreference) setGasPreference(data.gasPreference);
        if (data.currency) setCurrency(data.currency);
        if (data.notification !== undefined) setNotification(data.notification);
        if (data.theme) setTheme(data.theme);
      }
    );
  }, []);
  
  const handleSaveSettings = () => {
    setLoading(true);
    
    // In a real app, you would save these settings to Chrome's storage
    chrome.storage.local.set({
      networkType,
      gasPreference,
      currency,
      notification,
      theme
    }, () => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };
  
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your wallet? This will clear all your settings.')) {
      chrome.storage.local.clear(() => {
        window.location.reload();
      });
    }
  };
  
  return (
    <div className="transactions">
      <div className="transactions-header">Settings</div>
      <div style={{ padding: '20px' }}>
        <div className="form-group">
          <label className="form-label">Network</label>
          <select 
            className="form-input"
            value={networkType}
            onChange={(e) => setNetworkType(e.target.value)}
          >
            <option value="mainnet">Mainnet</option>
            <option value="goerli">Goerli Testnet</option>
            <option value="sepolia">Sepolia Testnet</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Gas Price Preference</label>
          <select 
            className="form-input"
            value={gasPreference}
            onChange={(e) => setGasPreference(e.target.value)}
          >
            <option value="slow">Slow (Cheaper)</option>
            <option value="standard">Standard</option>
            <option value="fast">Fast (More Expensive)</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Currency Display</label>
          <select 
            className="form-input"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
            <option value="jpy">JPY</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Theme</label>
          <select 
            className="form-input"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="highContrast">High Contrast (Black & White)</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
        
        <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
          <input 
            type="checkbox" 
            id="notifications"
            checked={notification}
            onChange={(e) => setNotification(e.target.checked)}
            style={{ marginRight: '10px', accentColor: '#000000' }}
          />
          <label htmlFor="notifications" style={{ cursor: 'pointer' }}>
            Enable transaction notifications
          </label>
        </div>
        
        <div className="form-group" style={{ marginTop: '24px' }}>
          <button 
            className="form-button"
            onClick={handleSaveSettings}
            disabled={loading}
          >
            {loading ? 'Saving...' : saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>
        
        <div className="form-group" style={{ marginTop: '24px' }}>
          <button 
            className="form-button"
            style={{ backgroundColor: '#000000' }}
            onClick={handleReset}
          >
            Reset Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;