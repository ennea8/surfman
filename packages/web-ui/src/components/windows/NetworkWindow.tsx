import React, { useState } from 'react';
import { Window, WindowHeader, WindowContent, Button, Tabs, Tab, TabBody, GroupBox } from 'react95';
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

interface NetworkWindowProps {
  windowId: string;
}

export const NetworkWindow: React.FC<NetworkWindowProps> = ({ windowId }) => {
  const { removeWindow } = useWindowStore();
  const { rpcUrl } = useNetworkStore();
  const [activeTab, setActiveTab] = useState(0);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetLatestBlockhash = async () => {
    setLoading(true);
    try {
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getLatestBlockhash',
          params: [],
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

  const handleGetClusterNodes = async () => {
    setLoading(true);
    try {
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getClusterNodes',
          params: [],
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
        <span>🌐 Network Operations</span>
        <Button onClick={() => removeWindow(windowId)} size="sm" square>
          ✕
        </Button>
      </StyledWindowHeader>
      <WindowContent>
        <ContentContainer>
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tab value={0}>Block Info</Tab>
            <Tab value={1}>Cluster</Tab>
            <Tab value={2}>Transactions</Tab>
          </Tabs>
          <TabBody style={{ marginTop: 8 }}>
            {activeTab === 0 && (
              <GroupBox label="Block Information">
                <div style={{ marginBottom: 8 }}>
                  <p style={{ marginBottom: 8 }}>Query latest blockchain information</p>
                  <Button
                    onClick={handleGetLatestBlockhash}
                    disabled={loading}
                    style={{ marginRight: 8 }}
                  >
                    Get Latest Blockhash
                  </Button>
                </div>
                {result && <ResultBox>{result}</ResultBox>}
              </GroupBox>
            )}
            {activeTab === 1 && (
              <GroupBox label="Cluster Information">
                <div style={{ marginBottom: 8 }}>
                  <p style={{ marginBottom: 8 }}>Query cluster node information</p>
                  <Button
                    onClick={handleGetClusterNodes}
                    disabled={loading}
                  >
                    Get Cluster Nodes
                  </Button>
                </div>
                {result && <ResultBox>{result}</ResultBox>}
              </GroupBox>
            )}
            {activeTab === 2 && (
              <GroupBox label="Transaction Operations">
                <p>Transaction query tools coming soon...</p>
              </GroupBox>
            )}
          </TabBody>
        </ContentContainer>
      </WindowContent>
    </Window>
  );
};
