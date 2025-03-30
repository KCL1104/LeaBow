import React, { useState, useEffect } from 'react';

const ReceiveForm = ({ address }) => {
  const [copied, setCopied] = useState(false);
  
  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
    }).catch(err => {
      console.error('Failed to copy address: ', err);
    });
  };
  
  // Generate QR code placeholder
  const QRCodePlaceholder = () => (
    <div style={{ 
      width: '180px', 
      height: '180px', 
      backgroundColor: '#FFFFFF', 
      border: '2px solid #000000',
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      margin: '0 auto 20px'
    }}>
      QR Code
    </div>
  );
  
  return (
    <div className="transactions">
      <div className="transactions-header">Receive ETH</div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <QRCodePlaceholder />
        
        <div style={{ width: '100%', marginBottom: '20px' }}>
          <div className="form-group">
            <label className="form-label">Your Wallet Address</label>
            <div style={{ display: 'flex', border: '2px solid #000000', borderRadius: '4px', overflow: 'hidden' }}>
              <input
                type="text"
                className="form-input"
                style={{ border: 'none', borderRadius: 0, flex: 1 }}
                value={address}
                readOnly
              />
              <button 
                type="button" 
                onClick={copyToClipboard}
                style={{
                  backgroundColor: copied ? '#000000' : '#000000',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0 12px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
        
        <div style={{ fontSize: '14px', color: '#000000', textAlign: 'center' }}>
          <p>Send only ETH and ERC-20 tokens to this address.</p>
          <p>Sending other coins may result in permanent loss.</p>
        </div>
      </div>
    </div>
  );
};

export default ReceiveForm;