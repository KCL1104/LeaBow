import React from 'react';

const TabNavigation = ({ activeTab, onTabChange, tabs = [] }) => {
  // Default tabs if none provided
  const defaultTabs = [
    { id: 'transactions', label: 'Activity' },
    { id: 'send', label: 'Send' },
    { id: 'receive', label: 'Receive' },
    { id: 'settings', label: 'Settings' }
  ];

  const tabsToShow = tabs.length > 0 ? tabs : defaultTabs;

  return (
    <div className="nav-tabs">
      {tabsToShow.map(tab => (
        <div
          key={tab.id}
          className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default TabNavigation;