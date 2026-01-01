import React, { useState } from 'react';
import { Button, TextField } from 'react95';
import { Surfman } from '@surfman/sdk';
import { NetworkSelector } from '../NetworkSelector';
import { useNetworkStore } from '../../store/networkStore';

interface AccountData {
  address: string;
  lamports: number;
  owner: string;
  data: string;
  executable: boolean;
  rentEpoch: number;
  space?: number;
}

export const AccountManagerWindowContent: React.FC<{ windowId: string }> = () => {
  const [address, setAddress] = useState('');
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { rpcUrl } = useNetworkStore();

  const handleQuery = async () => {
    if (!address.trim()) {
      setError('Please enter an account address');
      return;
    }

    setLoading(true);
    setError(null);
    setAccountData(null);

    try {
      const client = new Surfman({ url: rpcUrl });
      const result = await client.accounts.getAccountInfo(address, {
        encoding: 'base64',
        commitment: 'finalized',
      });

      if (result === null) {
        setError('Account not found or does not exist');
      } else {
        console.log('Account Info:', result);
        setAccountData({
          address,
          lamports: result.lamports ?? 0,
          owner: result.owner ?? 'Unknown',
          data: Array.isArray(result.data) ? result.data[0] : (typeof result.data === 'string' ? result.data : JSON.stringify(result.data)),
          executable: result.executable ?? false,
          rentEpoch: result.rentEpoch ?? 0,
          space: result.space,
        });
      }
    } catch (err: any) {
      console.error('Error querying account:', err);
      setError(err.message || 'Failed to query account');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      e.preventDefault();
      handleQuery();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loading) {
      handleQuery();
    }
  };

  const formatLamports = (lamports: number | undefined): string => {
    if (lamports === undefined || lamports === null) {
      return '0 SOL (0 lamports)';
    }
    const sol = lamports / 1_000_000_000;
    return `${sol.toLocaleString()} SOL (${lamports.toLocaleString()} lamports)`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NetworkSelector />
      
      <div style={{ padding: '16px', flex: 1, overflow: 'auto' }}>
        <h3 style={{ fontSize: '12px', marginBottom: '12px' }}>Account Info</h3>
        
        <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
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
            onKeyPress={handleKeyPress}
            placeholder="Enter account address..."
            fullWidth
            style={{ marginBottom: '8px' }}
            disabled={loading}
          />
          <Button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleQuery();
            }} 
            disabled={loading} 
            style={{ marginRight: '8px' }}
          >
            {loading ? 'Querying...' : 'Query'}
          </Button>
          <Button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setAccountData(null);
              setError(null);
            }} 
            disabled={loading}
          >
            Clear
          </Button>
        </form>

        {error && (
          <div
            style={{
              border: '2px solid red',
              padding: '12px',
              background: '#fff',
              fontSize: '11px',
              color: 'red',
              marginBottom: '16px',
            }}
          >
            <strong>Error:</strong> {error}
          </div>
        )}

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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ wordBreak: 'break-all' }}>
                <strong>Address:</strong> {accountData.address}
              </div>
              <div>
                <strong>Balance:</strong> {formatLamports(accountData.lamports)}
              </div>
              <div style={{ wordBreak: 'break-all' }}>
                <strong>Owner:</strong> {accountData.owner}
              </div>
              <div>
                <strong>Executable:</strong> {accountData.executable ? 'Yes' : 'No'}
              </div>
              <div>
                <strong>Rent Epoch:</strong> {accountData.rentEpoch}
              </div>
              {accountData.space !== undefined && (
                <div>
                  <strong>Space:</strong> {accountData.space} bytes
                </div>
              )}
              <div style={{ marginTop: '8px' }}>
                <strong>Data:</strong>
                <div
                  style={{
                    marginTop: '4px',
                    padding: '8px',
                    background: '#f0f0f0',
                    border: '1px solid #ccc',
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    wordBreak: 'break-all',
                    maxHeight: '150px',
                    overflow: 'auto',
                  }}
                >
                  {accountData.data || '(empty)'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
