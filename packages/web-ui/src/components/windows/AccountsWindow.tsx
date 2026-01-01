import React, { useState } from 'react';
import { Window, WindowHeader, WindowContent, Button, TextField, GroupBox } from 'react95';
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
  max-height: 250px;
  overflow-y: auto;
`;

interface AccountsWindowProps {
  windowId: string;
}

export const AccountsWindow: React.FC<AccountsWindowProps> = ({ windowId }) => {
  const { removeWindow } = useWindowStore();
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
    <Window style={{ width: '100%', height: '100%' }}>
      <StyledWindowHeader>
        <span>📦 Account Manager</span>
        <Button onClick={() => removeWindow(windowId)} size="sm" square>
          ✕
        </Button>
      </StyledWindowHeader>
      <WindowContent>
        <ContentContainer>
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
        </ContentContainer>
      </WindowContent>
    </Window>
  );
};
