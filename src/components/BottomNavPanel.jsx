import React from 'react';

const BottomNavPanel = ({ activeTab, onTabChange }) => {
  // Define the navigation items for the bottom panel
  const navItems = [
    { id: 'assets', label: 'Assets', icon: '💰' },
    { id: 'trade', label: 'Trade', icon: '↔️' },
    { id: 'explorer', label: 'Explorer', icon: '🔍' }
  ];

  return (
    <div className="bottom-nav-panel">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`bottom-nav-button ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => onTabChange(item.id)}
        >
          <div className="bottom-nav-icon">{item.icon}</div>
          <div className="bottom-nav-label">{item.label}</div>
        </button>
      ))}
    </div>
  );
};

export default BottomNavPanel;