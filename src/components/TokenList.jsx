import React, { useState } from 'react';

// Simple Token component
const Token = ({ token, onClick }) => {
  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: '1px solid #000000',
        cursor: 'pointer'
      }}
      onClick={() => onClick(token)}
    >
      <div style={{ 
        width: '32px', 
        height: '32px', 
        borderRadius: '50%', 
        backgroundColor: '#000000',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        marginRight: '12px'
      }}>
        {token.symbol.substring(0, 2)}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: '500', color: '#000000' }}>{token.name}</div>
        <div style={{ fontSize: '12px', color: '#000000', opacity: 0.7 }}>{token.symbol}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontWeight: '600', color: '#000000' }}>
          {parseFloat(token.balance).toFixed(token.symbol === 'ETH' ? 4 : 2)}
        </div>
        <div style={{ fontSize: '12px', color: '#000000', opacity: 0.7 }}>
          ${parseFloat(token.usdValue).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

const TokenList = ({ tokens = [], onTokenSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Default tokens if none provided
  const defaultTokens = [
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', balance: '1.24567', usdValue: '3245.89' },
    { id: 'usdc', name: 'USD Coin', symbol: 'USDC', balance: '215.75', usdValue: '215.75' },
    { id: 'link', name: 'Chainlink', symbol: 'LINK', balance: '10.5', usdValue: '158.34' },
    { id: 'uni', name: 'Uniswap', symbol: 'UNI', balance: '5.2', usdValue: '35.88' }
  ];

  const tokensToDisplay = tokens.length > 0 ? tokens : defaultTokens;

  // Filter tokens based on search term
  const filteredTokens = tokensToDisplay.filter(token => 
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total portfolio value
  const totalValue = tokensToDisplay.reduce((sum, token) => sum + parseFloat(token.usdValue), 0);

  return (
    <div className="transactions">
      <div className="transactions-header">Tokens</div>
      <div style={{ padding: '16px', borderBottom: '1px solid #000000' }}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ color: '#000000', opacity: 0.7, marginBottom: '4px', fontSize: '14px' }}>
            Total Balance
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#000000' }}>
            ${totalValue.toFixed(2)}
          </div>
        </div>
        
        <div className="form-group">
          <input 
            type="text"
            className="form-input"
            placeholder="Search tokens"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {filteredTokens.length > 0 ? (
          filteredTokens.map(token => (
            <Token 
              key={token.id} 
              token={token} 
              onClick={onTokenSelect || (() => {})} 
            />
          ))
        ) : (
          <div style={{ 
            padding: '24px', 
            textAlign: 'center', 
            color: '#000000',
            opacity: 0.7,
            fontSize: '14px'
          }}>
            No tokens found
          </div>
        )}
      </div>
      
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <button 
          className="form-button"
          onClick={() => {
            // This would open a token import modal in a real app
            if (window.notifications) {
              window.notifications.info('Token import functionality would go here');
            }
          }}
        >
          Add Token
        </button>
      </div>
    </div>
  );
};

export default TokenList;