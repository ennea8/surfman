import React from 'react';
import { useNetworkStore } from '../store/networkStore';

export const NetworkSelector: React.FC = () => {
  const { networkType, setNetworkType } = useNetworkStore();

  return (
    <div
      style={{
        padding: '8px',
        borderBottom: '2px solid #808080',
        background: '#c0c0c0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <label
        style={{
          fontSize: '11px',
          fontWeight: 'bold',
          fontFamily: 'MS Sans Serif, Arial, sans-serif',
        }}
      >
        Network:
      </label>
      <select
        value={networkType}
        onChange={(e) => setNetworkType(e.target.value as any)}
        style={{
          padding: '2px 4px',
          border: '1px solid #000',
          background: '#fff',
          fontSize: '11px',
          fontFamily: 'MS Sans Serif, Arial, sans-serif',
        }}
      >
        <option value="localnet">Localnet</option>
        <option value="devnet">Devnet</option>
        <option value="testnet">Testnet</option>
        <option value="mainnet">Mainnet</option>
      </select>
    </div>
  );
};
