import React, { useState } from 'react';

const SendForm = ({ onSubmit, balance }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!recipient) {
      newErrors.recipient = 'Recipient address is required';
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(recipient)) {
      newErrors.recipient = 'Invalid Ethereum address';
    }
    
    if (!amount) {
      newErrors.amount = 'Amount is required';
    } else {
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        newErrors.amount = 'Amount must be greater than 0';
      } else if (parsedAmount > balance) {
        newErrors.amount = 'Insufficient balance';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      
      try {
        await onSubmit({ recipient, amount });
        // Reset form
        setRecipient('');
        setAmount('');
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ submit: error.message || 'Failed to send transaction' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="transactions">
      <div className="transactions-header">Send ETH</div>
      <div style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Recipient Address</label>
            <input
              type="text"
              className="form-input"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              disabled={loading}
            />
            {errors.recipient && <div style={{ color: '#000000', marginTop: '4px', fontSize: '12px' }}>{errors.recipient}</div>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Amount (ETH)</label>
            <input
              type="number"
              step="0.0001"
              className="form-input"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading}
            />
            {errors.amount && <div style={{ color: '#000000', marginTop: '4px', fontSize: '12px' }}>{errors.amount}</div>}
            <div style={{ textAlign: 'right', fontSize: '12px', color: '#000000', opacity: 0.7, marginTop: '4px' }}>
              Available: {balance.toFixed(4)} ETH
            </div>
          </div>
          
          {errors.submit && <div style={{ color: '#000000', marginBottom: '15px', textAlign: 'center' }}>{errors.submit}</div>}
          
          <button 
            type="submit" 
            className="form-button"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendForm;