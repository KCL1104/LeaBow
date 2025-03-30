import React from 'react';

const TransactionList = ({ transactions, onTransactionClick }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="transactions">
        <div className="transactions-header">Transaction History</div>
        <div className="transaction-list">
          <div style={{ padding: '20px', textAlign: 'center', color: '#000000', opacity: 0.7 }}>
            No transactions yet
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="transactions">
      <div className="transactions-header">Transaction History</div>
      <div className="transaction-list">
        {transactions.map(transaction => (
          <div 
            key={transaction.id} 
            className="transaction-item"
            onClick={() => onTransactionClick && onTransactionClick(transaction)}
          >
            <div className="transaction-info">
              <div className="transaction-name">{transaction.name}</div>
              <div className="transaction-date">{transaction.date}</div>
            </div>
            <div className="transaction-amount">
              {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(4)} ETH
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;