import React, { useState } from 'react';
import walletService from '../services/walletService';

const Welcome = ({ onWalletCreated }) => {
  const [step, setStep] = useState('welcome'); // welcome, create, import, password
  const [seed, setSeed] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateWallet = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create a new wallet
      const result = await walletService.createWallet(password);
      onWalletCreated(result.address);
    } catch (err) {
      setError(err.message || 'Failed to create wallet');
      setLoading(false);
    }
  };

  const handleImportWallet = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!seed.trim()) {
      setError('Please enter your seed phrase or private key');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Import the wallet
      const result = await walletService.importWallet(seed, password);
      onWalletCreated(result.address);
    } catch (err) {
      setError(err.message || 'Failed to import wallet');
      setLoading(false);
    }
  };

  // Welcome screen
  if (step === 'welcome') {
    return (
      <div className="welcome-container">
        <h1 style={{ color: '#000000', marginBottom: '20px' }}>Welcome to Smart Wallet</h1>
        <p style={{ color: '#000000', marginBottom: '30px' }}>
          Your secure and easy-to-use Ethereum wallet in Chrome
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button 
            className="form-button"
            onClick={() => setStep('create')}
          >
            Create New Wallet
          </button>
          
          <button 
            className="form-button secondary"
            onClick={() => setStep('import')}
          >
            Import Existing Wallet
          </button>
        </div>
      </div>
    );
  }

  // Create wallet screen
  if (step === 'create') {
    return (
      <div style={{ padding: '20px' }}>
        <h2 style={{ color: '#000000', marginBottom: '20px', textAlign: 'center' }}>Create New Wallet</h2>
        
        <div className="form-group">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-input"
            placeholder="Enter a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input 
            type="password" 
            className="form-input"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        
        {error && <div style={{ color: '#000000', marginBottom: '15px' }}>{error}</div>}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          <button 
            className="form-button"
            onClick={handleCreateWallet}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Wallet'}
          </button>
          
          <button 
            className="form-button secondary"
            onClick={() => setStep('welcome')}
            disabled={loading}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  // Import wallet screen
  if (step === 'import') {
    return (
      <div style={{ padding: '20px' }}>
        <h2 style={{ color: '#000000', marginBottom: '20px', textAlign: 'center' }}>Import Wallet</h2>
        
        <div className="form-group">
          <label className="form-label">Seed Phrase or Private Key</label>
          <textarea 
            className="form-input"
            style={{ minHeight: '80px', resize: 'vertical' }}
            placeholder="Enter your 12-word seed phrase or private key"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-input"
            placeholder="Enter a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input 
            type="password" 
            className="form-input"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        
        {error && <div style={{ color: '#000000', marginBottom: '15px' }}>{error}</div>}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          <button 
            className="form-button"
            onClick={handleImportWallet}
            disabled={loading}
          >
            {loading ? 'Importing...' : 'Import Wallet'}
          </button>
          
          <button 
            className="form-button secondary"
            onClick={() => setStep('welcome')}
            disabled={loading}
          >
            Back
          </button>
        </div>
      </div>
    );
  }
};

export default Welcome;