import React, { useState } from 'react';
import { Button, TextField } from 'react95';
import { NetworkSelector } from '../NetworkSelector';

export const AccountManagerWindowContent: React.FC<{ windowId: string }> = () => {
  const [address, setAddress] = useState('');
  const [accountData, setAccountData] = useState<any>(null);

  const handleQuery = () => {
    console.log('Querying account:', address);
    // TODO: Implement actual account query
    setAccountData({
      address,
      balance: '1.5 SOL',
      owner: 'System Program',
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NetworkSelector />
      
      <div style={{ padding: '16px', flex: 1, overflow: 'auto' }}>
        <h3 style={{ fontSize: '12px', marginBottom: '12px' }}>Account Manager</h3>
        
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '11px',
              marginBottom: '4px',
              fontWeight: 'bold',
            }}
          >
            Account Address:
          </label>
          <TextField
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter account address..."
            fullWidth
            style={{ marginBottom: '8px' }}
          />
          <Button onClick={handleQuery} style={{ marginRight: '8px' }}>
            Query
          </Button>
          <Button onClick={() => setAccountData(null)}>Clear</Button>
        </div>

        {accountData && (
          <div
            style={{
              border: '2px inset',
              padding: '12px',
              background: '#fff',
              fontSize: '11px',
            }}
          >
            <h4 style={{ marginBottom: '8px', fontWeight: 'bold' }}>Account Details:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>
                <strong>Address:</strong> {accountData.address}
              </div>
              <div>
                <strong>Balance:</strong> {accountData.balance}
              </div>
              <div>
                <strong>Owner:</strong> {accountData.owner}
              </div>
            </div>
            
            <div style={{ marginTop: '12px' }}>
              <Button size="sm" style={{ marginRight: '4px' }}>
                Update Data
              </Button>
              <Button size="sm">Export</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
