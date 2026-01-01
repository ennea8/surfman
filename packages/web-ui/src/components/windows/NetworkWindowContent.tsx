import React, { useState } from 'react';
import { Button, Tabs, Tab, TabBody, GroupBox } from 'react95';
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

const NetworkSelector = styled.div`
  margin-bottom: 8px;
  padding: 8px;
  background: #c0c0c0;
  border: 2px inset;
`;

interface NetworkWindowContentProps {
  windowId: string;
}

export const NetworkWindowContent: React.FC<NetworkWindowContentProps> = () => {
  const { rpcUrl, networkType, setNetworkType } = useNetworkStore();
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
    <div>
      <NetworkSelector>
        <label style={{ marginRight: 8, fontWeight: 'bold' }}>Network:</label>
        <select
          value={networkType}
          onChange={(e) => setNetworkType(e.target.value as any)}
          style={{
            padding: '2px 4px',
            border: '1px solid #000',
            background: '#fff',
            cursor: 'pointer',
          }}
        >
          <option value="localnet">Localnet</option>
          <option value="devnet">Devnet</option>
          <option value="testnet">Testnet</option>
          <option value="mainnet">Mainnet</option>
        </select>
        <span style={{ marginLeft: 8, fontSize: '11px', color: '#666' }}>
          {rpcUrl}
        </span>
      </NetworkSelector>
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
    </div>
  );
};
