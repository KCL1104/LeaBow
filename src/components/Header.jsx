import React, { useState } from 'react';

const Header = ({ address }) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Format address for display (e.g. 0x1a2b...3c4d)
  const formatAddress = (address) => {
    if (!address || address.length < 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="header">
      <div className="logo">Smart Wallet</div>
      <div 
        className="wallet-address" 
        onClick={copyAddress}
        style={{ cursor: 'pointer' }}
      >
        {copied ? 'Copied!' : formatAddress(address)}
      </div>
    </div>
  );
};

export default Header;