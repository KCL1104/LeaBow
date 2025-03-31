import React, { useState } from 'react';
import BottomNavPanel from './components/BottomNavPanel';
import Header from './components/Header';
import BalanceCard from './components/BalanceCard';
import ActionButtons from './components/ActionButtons';
import TabNavigation from './components/TabNavigation';
import TransactionList from './components/TransactionList';
import TokenList from './components/TokenList';
import SettingsPanel from './components/SettingsPanel';
import Trade from './Trade';
import Explorer from './Explorer';

const App = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [currentPage, setCurrentPage] = useState('assets');
  
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

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  // Render different pages based on current selection
  if (currentPage === 'trade') {
    return <Trade onNavigate={handleNavigation} />;
  }

  if (currentPage === 'explorer') {
    return <Explorer onNavigate={handleNavigation} />;
  }

  // Main Assets page (default)
  return (
    <div className="app-container">
      {/* Header */}
      <Header address={walletData.address} />

      {/* Balance */}
      <BalanceCard balance={walletData.balance} />

      {/* Action Buttons */}
      <ActionButtons
        onSendClick={handleSendClick}
        onReceiveClick={handleReceiveClick}
      />

      {/* Tabs */}
      <TabNavigation
        activeTab={activeTab}
        onTabChange={handleTabClick}
        tabs={[
          { id: 'transactions', label: 'Activity' },
          { id: 'tokens', label: 'Tokens' },
          { id: 'settings', label: 'Settings' }
        ]}
      />

      {/* Content */}
      {activeTab === 'transactions' && (
        <TransactionList 
          transactions={walletData.transactions}
          onTransactionClick={() => {}}
        />
      )}

      {activeTab === 'tokens' && (
        <TokenList />
      )}

      {activeTab === 'settings' && (
        <SettingsPanel />
      )}

      {/* Bottom Navigation Panel */}
      <BottomNavPanel 
        activeTab={currentPage} 
        onTabChange={handleNavigation} 
      />
    </div>
  );
};

export default App;