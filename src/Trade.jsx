import React, { useState } from 'react';
import Header from './components/Header';
import BalanceCard from './components/BalanceCard';
import SwapForm from './components/SwapForm';
import BottomNavPanel from './components/BottomNavPanel';

const Trade = ({ onNavigate }) => {
  // Mock data
  const walletData = {
    address: '0x1a2b...3c4d',
    balance: 1.24567
  };

  const handleSwapSubmit = (swapData) => {
    console.log('Swap submitted:', swapData);
    // This would connect to a real service in a production app
    alert(`Swapping ${swapData.fromAmount} ${swapData.fromToken} to ${swapData.toAmount} ${swapData.toToken}`);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <Header address={walletData.address} />

      {/* Balance */}
      <BalanceCard balance={walletData.balance} />

      {/* Swap Form */}
      <SwapForm onSubmit={handleSwapSubmit} />

      {/* Bottom Navigation */}
      <div style={{ height: '60px' }}></div> {/* Spacer for fixed navigation */}
      <BottomNavPanel activeTab="trade" onTabChange={onNavigate} />
    </div>
  );
};

export default Trade;