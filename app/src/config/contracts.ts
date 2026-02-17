// Contract addresses - Update these after deployment
export const contracts = {
  factory: '0x0000000000000000000000000000000000000000' as `0x${string}`,
  router: '0x0000000000000000000000000000000000000000' as `0x${string}`,
  staking: '0x0000000000000000000000000000000000000000' as `0x${string}`,
  rbsToken: '0x0000000000000000000000000000000000000000' as `0x${string}`,
  oracle: '0x0000000000000000000000000000000000000000' as `0x${string}`,
};

// Token addresses - Update these after deployment
export const tokens = [
  {
    symbol: 'WETH',
    name: 'Wrapped ETH',
    address: '0x0000000000000000000000000000000000000000' as `0x${string}`,
    decimals: 18,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Token',
    address: '0x0000000000000000000000000000000000000000' as `0x${string}`,
    decimals: 18,
  },
  {
    symbol: 'AMZN',
    name: 'Amazon Token',
    address: '0x0000000000000000000000000000000000000000' as `0x${string}`,
    decimals: 18,
  },
  {
    symbol: 'NFLX',
    name: 'Netflix Token',
    address: '0x0000000000000000000000000000000000000000' as `0x${string}`,
    decimals: 18,
  },
  {
    symbol: 'AMD',
    name: 'AMD Token',
    address: '0x0000000000000000000000000000000000000000' as `0x${string}`,
    decimals: 18,
  },
];
