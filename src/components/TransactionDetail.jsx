import React from 'react';

const TransactionDetail = ({ transaction, onClose }) => {
  if (!transaction) return null;

  // Generate transaction hash for display
  const txHash = transaction.hash || '0x' + Array(64).fill(0).map(() => 
    Math.floor(Math.random() * 16).toString(16)).join('');

  return (
    <div style={{ padding: '10px' }}>
      <div style={{ 
        padding: '15px 0', 
        borderBottom: '1px solid #000000',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          backgroundColor: '#000000',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '12px',
          fontSize: '18px'
        }}>
          {transaction.type === 'receive' ? '↓' : 
           transaction.type === 'send' ? '↑' : 
           transaction.type === 'swap' ? '⇄' : '•'}
        </div>
        <div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#000000' }}>
            {transaction.name}
          </div>
          <div style={{ 
            fontSize: '14px', 
            color: '#000000',
            opacity: 0.7
          }}>
            {transaction.date} • Confirmed
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '8px',
          color: '#000000'
        }}>
          <div style={{ opacity: 0.7 }}>Amount</div>
          <div style={{ fontWeight: '600' }}>
            {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(4)} ETH
          </div>
        </div>
        
        {transaction.type === 'send' && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            marginBottom: '8px',
            color: '#000000'
          }}>
            <div style={{ opacity: 0.7 }}>To</div>
            <div style={{ fontWeight: '500' }}>0x71C7...976F</div>
          </div>
        )}
        
        {transaction.type === 'receive' && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            marginBottom: '8px',
            color: '#000000'
          }}>
            <div style={{ opacity: 0.7 }}>From</div>
            <div style={{ fontWeight: '500' }}>0x4B20...02db</div>
          </div>
        )}
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: '8px',
          color: '#000000'
        }}>
          <div style={{ opacity: 0.7 }}>Fee</div>
          <div style={{ fontWeight: '500' }}>
            {transaction.type === 'send' ? '0.000421 ETH' : 'N/A'}
          </div>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          color: '#000000'
        }}>
          <div style={{ opacity: 0.7 }}>Transaction Hash</div>
          <div style={{ 
            fontWeight: '500',
            maxWidth: '140px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {txHash}
          </div>
        </div>
      </div>
      
      <button 
        className="form-button secondary"
        onClick={() => window.open(`https://etherscan.io/tx/${txHash}`, '_blank')}
      >
        View on Etherscan
      </button>
    </div>
  );
};

export default TransactionDetail;