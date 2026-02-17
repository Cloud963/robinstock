import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrumSepolia } from "wagmi/chains";

// Custom chain configuration for Robinhood Testnet (if needed)
// Uncomment and modify if deploying to Robinhood Chain
/*
const robinhoodTestnet = {
  id: 1234, // Replace with actual chain ID
  name: 'Robinhood Chain Testnet',
  network: 'robinhood-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_RPC_URL || ''] },
    public: { http: [process.env.NEXT_PUBLIC_RPC_URL || ''] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.robinhood.com' },
  },
  testnet: true,
};
*/

export const config = getDefaultConfig({
  appName: "RobinStock",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID",
  chains: [arbitrumSepolia],
  ssr: true,
});
