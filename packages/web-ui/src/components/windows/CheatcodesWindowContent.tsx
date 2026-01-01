import React, { useState } from 'react';
import { Button, GroupBox, TextField } from 'react95';
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
  max-height: 200px;
  overflow-y: auto;
`;

interface CheatcodesWindowContentProps {
  windowId: string;
}

export const CheatcodesWindowContent: React.FC<CheatcodesWindowContentProps> = () => {
  const { rpcUrl } = useNetworkStore();
  const [slot, setSlot] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTimeTravel = async () => {
    if (!slot) {
      setResult('Error: Please enter a slot number');
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
          method: 'surfnet_timeTravel',
          params: [{ slot: parseInt(slot) }],
        }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data.result || data.error, null, 2));
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <GroupBox label="Time Travel">
        <div style={{ marginBottom: 8 }}>
          <p style={{ marginBottom: 8 }}>Travel to a specific slot for testing</p>
          <label style={{ display: 'block', marginBottom: 4 }}>
            Target Slot:
          </label>
          <TextField
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            placeholder="Enter slot number..."
            type="number"
            style={{ width: '100%', marginBottom: 8 }}
          />
          <Button
            onClick={handleTimeTravel}
            disabled={loading}
          >
            Time Travel
          </Button>
        </div>
        {result && <ResultBox>{result}</ResultBox>}
      </GroupBox>
    </div>
  );
};
