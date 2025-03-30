import React, { useState, useEffect } from 'react';

const SwapForm = ({ onSubmit, tokens = [] }) => {
  // Form state
  const [fromToken, setFromToken] = useState({ symbol: 'ETH', balance: '1.24567' });
  const [toToken, setToToken] = useState({ symbol: 'USDC', balance: '215.75' });
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Default token list if none provided
  const defaultTokens = [
    { symbol: 'ETH', name: 'Ethereum', balance: '1.24567' },
    { symbol: 'USDC', name: 'USD Coin', balance: '215.75' },
    { symbol: 'LINK', name: 'Chainlink', balance: '10.5' },
    { symbol: 'UNI', name: 'Uniswap', balance: '5.2' },
  ];
  
  const availableTokens = tokens.length > 0 ? tokens : defaultTokens;

  // Mock exchange rates (for demo)
  const exchangeRates = {
    'ETH-USDC': 2600.50,
    'ETH-LINK': 170.25,
    'ETH-UNI': 650.30,
    'USDC-ETH': 1/2600.50,
    'USDC-LINK': 0.065,
    'USDC-UNI': 0.25,
    'LINK-ETH': 1/170.25,
    'LINK-USDC': 15.20,
    'LINK-UNI': 3.82,
    'UNI-ETH': 1/650.30,
    'UNI-USDC': 4.0,
    'UNI-LINK': 0.262
  };

  // Update estimated amount when tokens or input changes
  useEffect(() => {
    if (fromToken && toToken && fromAmount) {
      const pair = `${fromToken.symbol}-${toToken.symbol}`;
      const rate = exchangeRates[pair] || 1;
      
      // Calculate to amount based on from amount and rate
      const estimated = parseFloat(fromAmount) * rate;
      if (!isNaN(estimated)) {
        setToAmount(estimated.toFixed(6));
      }
    }
  }, [fromToken, toToken, fromAmount]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    if (parseFloat(fromAmount) > parseFloat(fromToken.balance)) {
      setError(`Insufficient ${fromToken.symbol} balance`);
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      // Submit swap data
      await onSubmit({
        fromToken: fromToken.symbol,
        toToken: toToken.symbol,
        fromAmount,
        toAmount,
        slippage
      });
      
      // Reset form
      setFromAmount('');
      setToAmount('');
    } catch (error) {
      console.error('Error swapping tokens:', error);
      setError(error.message || 'Failed to swap tokens');
    } finally {
      setLoading(false);
    }
  };

  // Switch tokens
  const handleSwitch = () => {
    const tempFromToken = fromToken;
    const tempFromAmount = fromAmount;
    
    setFromToken(toToken);
    setToToken(tempFromToken);
    
    setFromAmount(toAmount);
    setToAmount(tempFromAmount);
  };

  return (
    <div className="transactions">
      <div className="transactions-header">Swap Tokens</div>
      <div style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          {/* From Token Section */}
          <div className="form-group">
            <label className="form-label">From</label>
            <div style={{ display: 'flex' }}>
              <select
                className="form-input"
                style={{ width: '30%', borderRight: 'none' }}
                value={fromToken.symbol}
                onChange={(e) => {
                  const token = availableTokens.find(t => t.symbol === e.target.value) || fromToken;
                  setFromToken(token);
                }}
              >
                {availableTokens.map(token => (
                  <option 
                    key={token.symbol} 
                    value={token.symbol}
                    disabled={token.symbol === toToken.symbol}
                  >
                    {token.symbol}
                  </option>
                ))}
              </select>
              <input
                type="number"
                className="form-input"
                style={{ width: '70%', borderLeft: 'none' }}
                placeholder="0.0"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                disabled={loading}
              />
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#000000',
              opacity: 0.7,
              marginTop: '4px'
            }}>
              <div>
                Balance: {fromToken.balance} {fromToken.symbol}
              </div>
              <div 
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => setFromAmount(fromToken.balance)}
              >
                Max
              </div>
            </div>
          </div>
          
          {/* Swap Button */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            margin: '16px 0',
            position: 'relative'
          }}>
            <button
              type="button"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '2px solid #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 1
              }}
              onClick={handleSwitch}
            >
              ⇅
            </button>
          </div>
          
          {/* To Token Section */}
          <div className="form-group">
            <label className="form-label">To</label>
            <div style={{ display: 'flex' }}>
              <select
                className="form-input"
                style={{ width: '30%', borderRight: 'none' }}
                value={toToken.symbol}
                onChange={(e) => {
                  const token = availableTokens.find(t => t.symbol === e.target.value) || toToken;
                  setToToken(token);
                }}
              >
                {availableTokens.map(token => (
                  <option 
                    key={token.symbol} 
                    value={token.symbol}
                    disabled={token.symbol === fromToken.symbol}
                  >
                    {token.symbol}
                  </option>
                ))}
              </select>
              <input
                type="number"
                className="form-input"
                style={{ width: '70%', borderLeft: 'none' }}
                placeholder="0.0"
                value={toAmount}
                readOnly
              />
            </div>
            <div style={{ 
              fontSize: '12px',
              color: '#000000',
              opacity: 0.7,
              marginTop: '4px'
            }}>
              Balance: {toToken.balance} {toToken.symbol}
            </div>
          </div>
          
          {/* Exchange Rate */}
          <div style={{ 
            textAlign: 'center', 
            margin: '16px 0', 
            padding: '12px',
            border: '1px solid #000000',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            1 {fromToken.symbol} ≈ {
              (exchangeRates[`${fromToken.symbol}-${toToken.symbol}`] || 0).toFixed(6)
            } {toToken.symbol}
          </div>
          
          {/* Slippage Tolerance */}
          <div className="form-group">
            <label className="form-label">Slippage Tolerance</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['0.5', '1', '3'].map(value => (
                <button
                  key={value}
                  type="button"
                  className={`form-button ${slippage === value ? '' : 'secondary'}`}
                  style={{ flex: 1 }}
                  onClick={() => setSlippage(value)}
                >
                  {value}%
                </button>
              ))}
            </div>
          </div>
          
          {error && (
            <div style={{ color: '#000000', margin: '16px 0', textAlign: 'center' }}>{error}</div>
          )}
          
          <button 
            type="submit"
            className="form-button"
            style={{ marginTop: '20px' }}
            disabled={loading || !fromAmount || parseFloat(fromAmount) <= 0}
          >
            {loading ? 'Swapping...' : 'Swap'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SwapForm;