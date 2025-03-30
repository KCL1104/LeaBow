import React from 'react';

const BalanceCard = ({ balance }) => {
  // Format balance to 4 decimal places
  const formattedBalance = parseFloat(balance).toFixed(4);
  
  return (
    <div className="balance-section">
      <div className="balance-label">Total Balance</div>
      <div className="balance">
        {formattedBalance} <span className="currency">ETH</span>
      </div>
      {/* Display USD equivalent if needed */}
      {/* <div className="balance-usd">≈ $2,045.87 USD</div> */}
    </div>
  );
};

export default BalanceCard;