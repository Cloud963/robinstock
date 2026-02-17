// Contract addresses - will be populated after deployment
export const CONTRACTS = {
  FACTORY: process.env.NEXT_PUBLIC_FACTORY_ADDRESS || "",
  ROUTER: process.env.NEXT_PUBLIC_ROUTER_ADDRESS || "",
  RBS_TOKEN: process.env.NEXT_PUBLIC_RBS_TOKEN_ADDRESS || "",
  STAKING: process.env.NEXT_PUBLIC_STAKING_ADDRESS || "",
  ORACLE: process.env.NEXT_PUBLIC_ORACLE_ADDRESS || "",
  TOKENS: {
    TSLA: process.env.NEXT_PUBLIC_TSLA_ADDRESS || "",
    AMZN: process.env.NEXT_PUBLIC_AMZN_ADDRESS || "",
    NFLX: process.env.NEXT_PUBLIC_NFLX_ADDRESS || "",
    WETH: process.env.NEXT_PUBLIC_WETH_ADDRESS || "",
  },
};

// Token metadata
export const TOKEN_LIST = [
  {
    address: CONTRACTS.TOKENS.WETH,
    symbol: "WETH",
    name: "Wrapped Ether",
    decimals: 18,
    logoURI: "/tokens/weth.png",
  },
  {
    address: CONTRACTS.TOKENS.TSLA,
    symbol: "TSLA",
    name: "Tesla Token",
    decimals: 18,
    logoURI: "/tokens/tsla.png",
  },
  {
    address: CONTRACTS.TOKENS.AMZN,
    symbol: "AMZN",
    name: "Amazon Token",
    decimals: 18,
    logoURI: "/tokens/amzn.png",
  },
  {
    address: CONTRACTS.TOKENS.NFLX,
    symbol: "NFLX",
    name: "Netflix Token",
    decimals: 18,
    logoURI: "/tokens/nflx.png",
  },
];
