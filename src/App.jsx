import React, { useState } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  
  // Mock data
  const walletData = {
    address: '0x1a2b...3c4d',
    balance: 1.24567,
    transactions: [
      { id: 1, name: 'Received ETH', amount: 0.5, date: '2025-03-29', type: 'receive' },
      { id: 2, name: 'Sent ETH', amount: -0.2, date: '2025-03-28', type: 'send' },
      { id: 3, name: 'Gas Fee', amount: -0.01, date: '2025-03-28', type: 'fee' }
    ]
  };

  const handleSendClick = () => {
    alert('Send button clicked');
  };

  const handleReceiveClick = () => {
    alert('Receive button clicked');
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {/* Header */}
      <div className="header">
        <h1 style={{ margin: 0, fontSize: '24px' }}>Smart Wallet</h1>
        <div style={{ fontSize: '14px' }}>{walletData.address}</div>
      </div>

      {/* Balance */}
      <div className="balance-section">
        <div style={{ color: '#000000', fontSize: '14px', marginBottom: '8px' }}>Total Balance</div>
        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#000000' }}>
          {walletData.balance.toFixed(4)} <span style={{ fontSize: '14px' }}>ETH</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="actions">
        <button 
          className="action-button"
          onClick={handleSendClick}
        >
          Send
        </button>
        <button 
          className="action-button"
          onClick={handleReceiveClick}
        >
          Receive
        </button>
      </div>

      {/* Tabs */}
      <div className="nav-tabs">
        <div 
          className={`nav-tab ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => handleTabClick('transactions')}
        >
          Activity
        </div>
        <div 
          className={`nav-tab ${activeTab === 'tokens' ? 'active' : ''}`}
          onClick={() => handleTabClick('tokens')}
        >
          Tokens
        </div>
        <div 
          className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => handleTabClick('settings')}
        >
          Settings
        </div>
      </div>

      {/* Content */}
      {activeTab === 'transactions' && (
        <div className="transactions">
          <div className="transactions-header">Transaction History</div>
          {walletData.transactions.map(tx => (
            <div key={tx.id} className="transaction-item">
              <div>
                <div style={{ fontWeight: '500', color: '#000000' }}>{tx.name}</div>
                <div style={{ fontSize: '12px', color: '#000000', opacity: 0.7 }}>{tx.date}</div>
              </div>
              <div style={{ fontWeight: '600', color: '#000000' }}>
                {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(4)} ETH
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'tokens' && (
        <div className="transactions">
          <div className="transactions-header">Tokens</div>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            Your tokens will appear here
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="transactions">
          <div className="transactions-header">Settings</div>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            Settings options will appear here
          </div>
        </div>
      )}
    </div>
  );
};

export default App;