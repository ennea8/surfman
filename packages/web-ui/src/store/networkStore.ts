import { create } from 'zustand';

interface NetworkStore {
  rpcUrl: string;
  networkType: 'localnet' | 'devnet' | 'testnet' | 'mainnet';
  setRpcUrl: (url: string) => void;
  setNetworkType: (type: 'localnet' | 'devnet' | 'testnet' | 'mainnet') => void;
}

export const useNetworkStore = create<NetworkStore>((set) => ({
  rpcUrl: 'http://localhost:8899',
  networkType: 'localnet',
  
  setRpcUrl: (url) => set({ rpcUrl: url }),
  
  setNetworkType: (type) => {
    const urls = {
      localnet: 'http://localhost:8899',
      devnet: 'https://api.devnet.solana.com',
      testnet: 'https://api.testnet.solana.com',
      mainnet: 'https://api.mainnet-beta.solana.com',
    };
    set({ networkType: type, rpcUrl: urls[type] });
  },
}));
