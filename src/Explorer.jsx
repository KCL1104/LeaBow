import React, { useState } from 'react';
import Header from './components/Header';
import BottomNavPanel from './components/BottomNavPanel';

const Explorer = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('address');
  
  // Mock wallet data
  const walletData = {
    address: '0x1a2b...3c4d'
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    
    // In a real app, this would perform a blockchain lookup
    alert(`Searching for ${searchType}: ${searchTerm}`);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <Header address={walletData.address} />

      {/* Explorer Content */}
      <div className="transactions" style={{ marginBottom: '70px' }}>
        <div className="transactions-header">Blockchain Explorer</div>
        <div style={{ padding: '20px' }}>
          <form onSubmit={handleSearch}>
            <div className="form-group">
              <label className="form-label">Search Blockchain</label>
              <div style={{ display: 'flex', marginBottom: '15px' }}>
                <select 
                  className="form-input" 
                  style={{ width: '30%', borderRight: 'none', borderRadius: '4px 0 0 4px' }}
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="address">Address</option>
                  <option value="transaction">Transaction</option>
                  <option value="block">Block</option>
                  <option value="token">Token</option>
                </select>
                <input
                  type="text"
                  className="form-input"
                  style={{ width: '70%', borderLeft: 'none', borderRadius: '0 4px 4px 0' }}
                  placeholder="Enter address, txn hash, block..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button type="submit" className="form-button">Search</button>
            </div>
          </form>

          <div style={{ marginTop: '30px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Recent Transactions</h3>
            <div style={{ textAlign: 'center', color: '#000000', opacity: 0.7 }}>
              Search for an address or transaction to see details
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavPanel activeTab="explorer" onTabChange={onNavigate} />
    </div>
  );
};

export default Explorer;