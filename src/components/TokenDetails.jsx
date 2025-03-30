import React from 'react';

const TokenDetails = ({ token, onClose, onSend }) => {
  if (!token) return null;

  // Calculate a simple token price chart (mock data)
  const generatePriceData = () => {
    const basePrice = token.symbol === 'ETH' ? 2600 : 
                     token.symbol === 'USDC' ? 1 :
                     token.symbol === 'LINK' ? 15 : 7;
    
    return Array.from({ length: 30 }, (_, i) => {
      // Add some randomness to create a chart
      const volatility = 0.05; // 5% volatility
      const randomFactor = 1 + (Math.random() * volatility * 2 - volatility);
      const trendFactor = 1 + (i * 0.002); // Slight upward trend
      
      return basePrice * randomFactor * trendFactor;
    });
  };

  const priceData = generatePriceData();
  const currentPrice = priceData[priceData.length - 1];
  const yesterdayPrice = priceData[priceData.length - 2];
  const priceChange = currentPrice - yesterdayPrice;
  const priceChangePercent = (priceChange / yesterdayPrice) * 100;

  // Simple chart component
  const SimpleChart = ({ data }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    const points = data.map((value, index) => {
      const x = index * (200 / (data.length - 1));
      const y = 100 - ((value - min) / range) * 80;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width="200" height="100" style={{ margin: '0 auto', display: 'block' }}>
        <polyline
          points={points}
          fill="none"
          stroke="#000000"
          strokeWidth="2"
        />
      </svg>
    );
  };

  return (
    <div style={{ padding: '10px' }}>
      {/* Token Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          borderRadius: '50%', 
          backgroundColor: '#000000',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '20px',
          marginRight: '16px'
        }}>
          {token.symbol.substring(0, 2)}
        </div>
        <div>
          <div style={{ fontSize: '18px', fontWeight: '600', color: '#000000' }}>{token.name}</div>
          <div style={{ fontSize: '14px', color: '#000000', opacity: 0.7 }}>{token.symbol}</div>
        </div>
      </div>

      {/* Balance */}
      <div style={{ 
        padding: '16px', 
        border: '2px solid #000000',
        borderRadius: '4px',
        marginBottom: '16px'
      }}>
        <div style={{ color: '#000000', opacity: 0.7, marginBottom: '4px' }}>Your Balance</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#000000' }}>
          {parseFloat(token.balance).toFixed(6)} {token.symbol}
        </div>
        <div style={{ color: '#000000', opacity: 0.7 }}>
          ≈ ${(parseFloat(token.balance) * currentPrice).toFixed(2)}
        </div>
      </div>

      {/* Price */}
      <div style={{ 
        padding: '16px', 
        border: '2px solid #000000',
        borderRadius: '4px',
        marginBottom: '16px'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <div>
            <div style={{ color: '#000000', opacity: 0.7, marginBottom: '4px' }}>Price</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#000000' }}>
              ${currentPrice.toFixed(2)}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#000000', opacity: 0.7, marginBottom: '4px' }}>Change (24h)</div>
            <div style={{ 
              fontSize: '16px', 
              fontWeight: 'bold', 
              color: '#000000' 
            }}>
              {priceChange >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%
            </div>
          </div>
        </div>
        
        <SimpleChart data={priceData} />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          className="form-button"
          style={{ flex: 1 }}
          onClick={() => onSend && onSend(token)}
        >
          Send
        </button>
        
        <button 
          className="form-button secondary"
          style={{ flex: 1 }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TokenDetails;