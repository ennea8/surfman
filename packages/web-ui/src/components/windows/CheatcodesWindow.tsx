import React, { useState } from 'react';
import { Window, WindowHeader, WindowContent, Button, GroupBox, TextField } from 'react95';
import styled from 'styled-components';
import { useWindowStore } from '../../store/windowStore';
import { useNetworkStore } from '../../store/networkStore';

const StyledWindowHeader = styled(WindowHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentContainer = styled.div`
  padding: 8px;
  height: calc(100% - 33px);
  overflow-y: auto;
`;

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

interface CheatcodesWindowProps {
  windowId: string;
}

export const CheatcodesWindow: React.FC<CheatcodesWindowProps> = ({ windowId }) => {
  const { removeWindow } = useWindowStore();
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
    <Window style={{ width: '100%', height: '100%' }}>
      <StyledWindowHeader>
        <span>🔧 Cheatcodes</span>
        <Button onClick={() => removeWindow(windowId)} size="sm" square>
          ✕
        </Button>
      </StyledWindowHeader>
      <WindowContent>
        <ContentContainer>
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
        </ContentContainer>
      </WindowContent>
    </Window>
  );
};
