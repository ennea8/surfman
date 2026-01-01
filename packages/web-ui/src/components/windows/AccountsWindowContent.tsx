import React, { useState } from 'react';
import { Button, TextField, GroupBox } from 'react95';
import styled from 'styled-components';
import { useNetworkStore } from '../../store/networkStore';

const ResultBox = styled.div`
  background: #fff;
  border: 2px inset;
  padding: 8px;
  margin-top: 8px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  white-space: pre-wrap;
  max-height: 250px;
  overflow-y: auto;
`;

interface AccountsWindowContentProps {
  windowId: string;
}

export const AccountsWindowContent: React.FC<AccountsWindowContentProps> = () => {
  const { rpcUrl } = useNetworkStore();
  const [address, setAddress] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetAccountInfo = async () => {
    if (!address) {
      setResult('Error: Please enter an address');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getAccountInfo',
          params: [address, { encoding: 'jsonParsed' }],
        }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data.result, null, 2));
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <GroupBox label="Query Account">
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>
            Address:
          </label>
          <TextField
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter account address..."
            style={{ width: '100%', marginBottom: 8 }}
          />
          <Button
            onClick={handleGetAccountInfo}
            disabled={loading}
          >
            Get Account Info
          </Button>
        </div>
        {result && <ResultBox>{result}</ResultBox>}
      </GroupBox>
    </div>
  );
};
