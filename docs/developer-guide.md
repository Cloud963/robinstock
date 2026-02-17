# Developer Guide

## 🚀 Quick Start

Get RobinStock running locally in 3 minutes.

### Prerequisites

- Node.js 18+ and pnpm
- Git
- Foundry (for smart contracts)
- MetaMask or compatible wallet

### Clone Repository

```bash
git clone https://github.com/Cloude963/robinstock.git
cd robinstock
```

### Install Dependencies

**Frontend:**
```bash
cd app
pnpm install
```

**Smart Contracts:**
```bash
cd contracts
forge install
```

### Run Development Server

```bash
cd app
pnpm dev
```

Visit http://localhost:3003

---

## 📁 Project Structure

```
robinstock/
├── app/                      # Next.js frontend
│   ├── app/                  # App router pages
│   │   ├── page.tsx         # Home page
│   │   ├── swap/            # Swap interface
│   │   ├── liquidity/       # Liquidity management
│   │   ├── stake/           # Staking interface
│   │   └── dashboard/       # Portfolio dashboard
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   └── ...             # Custom components
│   ├── lib/                # Utilities
│   ├── hooks/              # Custom React hooks
│   ├── public/             # Static assets
│   └── package.json        # Dependencies
│
├── contracts/               # Smart contracts
│   ├── src/                # Solidity source files
│   │   ├── Factory.sol
│   │   ├── Pair.sol
│   │   ├── Router.sol
│   │   ├── StockToken.sol
│   │   ├── USDC.sol
│   │   ├── StakingRewards.sol
│   │   └── RBSToken.sol
│   ├── test/               # Contract tests
│   ├── script/             # Deploy scripts
│   ├── foundry.toml        # Foundry config
│   └── remappings.txt      # Import remappings
│
├── docs/                    # Documentation
│   ├── README.md
│   ├── overview.md
│   ├── architecture.md
│   ├── smart-contracts.md
│   ├── api-reference.md
│   ├── user-guide.md
│   ├── developer-guide.md  # This file
│   └── faq.md
│
├── scripts/                 # Utility scripts
├── .gitignore
├── README.md
└── PROJECT_OVERVIEW.md
```

---

## 🛠️ Frontend Development

### Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **UI Components:** shadcn/ui
- **Web3:** Wagmi v2, Viem, RainbowKit
- **State:** React hooks

### Environment Variables

Create `.env.local` in `/app`:

```env
# RPC URLs
NEXT_PUBLIC_ARBITRUM_SEPOLIA_RPC=https://sepolia-rollup.arbitrum.io/rpc

# Contract Addresses (update after deployment)
NEXT_PUBLIC_FACTORY_ADDRESS=0x...
NEXT_PUBLIC_ROUTER_ADDRESS=0x...
NEXT_PUBLIC_USDC_ADDRESS=0x...
NEXT_PUBLIC_TSLA_ADDRESS=0x...
NEXT_PUBLIC_AMZN_ADDRESS=0x...
NEXT_PUBLIC_AAPL_ADDRESS=0x...
NEXT_PUBLIC_RBS_ADDRESS=0x...
NEXT_PUBLIC_STAKING_ADDRESS=0x...

# WalletConnect (optional)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

### Development Commands

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Type check
pnpm type-check
```

### Adding a New Page

1. Create file in `/app/app/[page-name]/page.tsx`
2. Add navigation link in layout
3. Implement page component

Example:
```tsx
// app/app/analytics/page.tsx
export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold">Analytics</h1>
      {/* Your content */}
    </div>
  );
}
```

### Creating Custom Hooks

Example Web3 hook:

```typescript
// hooks/useTokenBalance.ts
import { useReadContract } from 'wagmi';
import { erc20Abi } from 'viem';

export function useTokenBalance(tokenAddress: `0x${string}`, userAddress: `0x${string}`) {
  const { data: balance, isLoading } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [userAddress],
  });

  return { balance, isLoading };
}
```

### Wagmi Configuration

Located in `app/lib/wagmi.ts`:

```typescript
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrumSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RobinStock',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [arbitrumSepolia],
  ssr: true,
});
```

---

## 🔗 Smart Contract Development

### Technology Stack

- **Language:** Solidity 0.8.20
- **Framework:** Foundry
- **Libraries:** OpenZeppelin
- **Testing:** Forge
- **Deployment:** Forge scripts

### Foundry Setup

Install Foundry:
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### Foundry Commands

```bash
# Install dependencies
forge install

# Compile contracts
forge build

# Run tests
forge test

# Run tests with gas report
forge test --gas-report

# Run specific test
forge test --match-test testSwap

# Deploy contracts
forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast

# Verify contract
forge verify-contract <ADDRESS> <CONTRACT> --chain arbitrum-sepolia
```

### Writing Tests

Example test file:

```solidity
// test/Pair.t.sol
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Pair.sol";
import "../src/Factory.sol";
import "../src/MockERC20.sol";

contract PairTest is Test {
    Factory factory;
    Pair pair;
    MockERC20 token0;
    MockERC20 token1;
    
    address alice = address(0x1);
    address bob = address(0x2);
    
    function setUp() public {
        factory = new Factory(address(this));
        token0 = new MockERC20("Token0", "TK0", 18);
        token1 = new MockERC20("Token1", "TK1", 18);
        
        address pairAddress = factory.createPair(address(token0), address(token1));
        pair = Pair(pairAddress);
        
        // Mint tokens
        token0.mint(alice, 1000 ether);
        token1.mint(alice, 1000 ether);
    }
    
    function testAddLiquidity() public {
        vm.startPrank(alice);
        
        token0.transfer(address(pair), 100 ether);
        token1.transfer(address(pair), 100 ether);
        
        uint256 liquidity = pair.mint(alice);
        
        assertGt(liquidity, 0);
        assertEq(pair.balanceOf(alice), liquidity);
        
        vm.stopPrank();
    }
    
    function testSwap() public {
        // Add initial liquidity
        vm.startPrank(alice);
        token0.transfer(address(pair), 100 ether);
        token1.transfer(address(pair), 100 ether);
        pair.mint(alice);
        vm.stopPrank();
        
        // Perform swap
        vm.startPrank(bob);
        token0.mint(bob, 10 ether);
        token0.transfer(address(pair), 10 ether);
        
        (uint112 reserve0, uint112 reserve1,) = pair.getReserves();
        uint256 amountOut = getAmountOut(10 ether, reserve0, reserve1);
        
        pair.swap(0, amountOut, bob, "");
        
        assertEq(token1.balanceOf(bob), amountOut);
        vm.stopPrank();
    }
    
    function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) 
        internal pure returns (uint256) 
    {
        uint256 amountInWithFee = amountIn * 997;
        uint256 numerator = amountInWithFee * reserveOut;
        uint256 denominator = (reserveIn * 1000) + amountInWithFee;
        return numerator / denominator;
    }
}
```

### Deployment Script

```solidity
// script/Deploy.s.sol
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/Factory.sol";
import "../src/Router.sol";
import "../src/USDC.sol";
import "../src/StockToken.sol";
import "../src/RBSToken.sol";
import "../src/StakingRewards.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy core contracts
        Factory factory = new Factory(msg.sender);
        Router router = new Router(address(factory));
        
        // Deploy tokens
        USDC usdc = new USDC(1000000 * 10**6); // 1M USDC
        StockToken tsla = new StockToken("Tokenized Tesla", "TSLA", "TSLA", 18);
        StockToken amzn = new StockToken("Tokenized Amazon", "AMZN", "AMZN", 18);
        StockToken aapl = new StockToken("Tokenized Apple", "AAPL", "AAPL", 18);
        
        // Deploy RBS and staking
        RBSToken rbs = new RBSToken(1000000 ether); // 1M RBS
        
        // Create pairs
        factory.createPair(address(usdc), address(tsla));
        factory.createPair(address(usdc), address(amzn));
        factory.createPair(address(usdc), address(aapl));
        
        // Log addresses
        console.log("Factory:", address(factory));
        console.log("Router:", address(router));
        console.log("USDC:", address(usdc));
        console.log("TSLA:", address(tsla));
        console.log("AMZN:", address(amzn));
        console.log("AAPL:", address(aapl));
        console.log("RBS:", address(rbs));
        
        vm.stopBroadcast();
    }
}
```

Run deployment:
```bash
forge script script/Deploy.s.sol \
  --rpc-url https://sepolia-rollup.arbitrum.io/rpc \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify
```

---

## 🌱 Seeding Liquidity

After deployment, seed initial liquidity:

```solidity
// script/Seed.s.sol
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/Router.sol";
import "../src/USDC.sol";
import "../src/StockToken.sol";

contract SeedScript is Script {
    function run() external {
        // Load addresses from environment
        address routerAddress = vm.envAddress("ROUTER_ADDRESS");
        address usdcAddress = vm.envAddress("USDC_ADDRESS");
        address tslaAddress = vm.envAddress("TSLA_ADDRESS");
        
        Router router = Router(routerAddress);
        USDC usdc = USDC(usdcAddress);
        StockToken tsla = StockToken(tslaAddress);
        
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        
        // Mint tokens
        usdc.mint(msg.sender, 100000 * 10**6); // 100k USDC
        tsla.mint(msg.sender, 1000 ether); // 1000 TSLA
        
        // Approve router
        usdc.approve(address(router), type(uint256).max);
        tsla.approve(address(router), type(uint256).max);
        
        // Add liquidity
        router.addLiquidity(
            address(usdc),
            address(tsla),
            50000 * 10**6,  // 50k USDC
            500 ether,      // 500 TSLA
            0,
            0,
            msg.sender,
            block.timestamp + 1 hours
        );
        
        console.log("Liquidity seeded successfully");
        
        vm.stopBroadcast();
    }
}
```

---

## 🧪 Testing

### Frontend Testing

```bash
# Unit tests (if configured)
pnpm test

# E2E tests (if configured)
pnpm test:e2e
```

### Contract Testing

```bash
# Run all tests
forge test

# Run with verbosity
forge test -vvv

# Run specific test file
forge test --match-path test/Pair.t.sol

# Run with gas report
forge test --gas-report

# Run with coverage
forge coverage
```

### Integration Testing

Test the full flow:

1. Deploy contracts
2. Seed liquidity
3. Test swaps via frontend
4. Verify on block explorer

---

## 📦 Building for Production

### Frontend Build

```bash
cd app
pnpm build
```

Output in `/app/.next`

### Deploy Frontend

**Vercel:**
```bash
vercel --prod
```

**Netlify:**
```bash
netlify deploy --prod
```

**Manual:**
```bash
pnpm build
pnpm start
```

### Contract Deployment

See deployment script above. Remember to:

1. Set environment variables
2. Fund deployer wallet
3. Deploy contracts
4. Verify on Arbiscan
5. Update frontend .env with addresses
6. Seed initial liquidity

---

## 🔧 Configuration

### Tailwind Config

```javascript
// tailwind.config.ts
module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'robin-neon': '#00C805',
        'robin-dark': '#0D0D0D',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

### Foundry Config

```toml
# foundry.toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc_version = "0.8.20"
optimizer = true
optimizer_runs = 200

[rpc_endpoints]
arbitrum_sepolia = "https://sepolia-rollup.arbitrum.io/rpc"

[etherscan]
arbitrum_sepolia = { key = "${ARBISCAN_API_KEY}" }
```

---

## 🐛 Debugging

### Frontend Debugging

**Browser DevTools:**
- Check console for errors
- Inspect network requests
- View wallet interactions

**Wagmi Debugging:**
```typescript
import { useAccount } from 'wagmi';

const { address, isConnected, isConnecting } = useAccount();
console.log({ address, isConnected, isConnecting });
```

### Contract Debugging

**Forge Debugger:**
```bash
forge test --debug testSwap
```

**Console Logging:**
```solidity
import "forge-std/console.sol";

function swap(...) {
    console.log("Reserve0:", reserve0);
    console.log("Reserve1:", reserve1);
    // ...
}
```

**Events:**
```solidity
emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
```

View events on Arbiscan.

---

## 📊 Monitoring

### On-Chain Monitoring

- **Arbiscan:** https://sepolia.arbiscan.io/
- View transactions
- Check contract state
- Monitor events

### Frontend Monitoring

- **Vercel Analytics** (if deployed on Vercel)
- **Google Analytics**
- Custom event tracking

---

## 🚢 Deployment Checklist

### Pre-Deployment

- [ ] All tests passing
- [ ] Code reviewed
- [ ] Security audit (for production)
- [ ] Environment variables set
- [ ] Deployer wallet funded

### Contract Deployment

- [ ] Deploy Factory
- [ ] Deploy Router
- [ ] Deploy tokens (USDC, stocks, RBS)
- [ ] Deploy StakingRewards
- [ ] Create pairs
- [ ] Verify contracts on Arbiscan
- [ ] Seed initial liquidity

### Frontend Deployment

- [ ] Update contract addresses in .env
- [ ] Build frontend
- [ ] Deploy to hosting
- [ ] Test all features
- [ ] Monitor for errors

### Post-Deployment

- [ ] Update README with addresses
- [ ] Create GitHub release
- [ ] Announce to users
- [ ] Monitor transactions
- [ ] Gather feedback

---

## 🔐 Security Best Practices

### Smart Contracts

- Use OpenZeppelin libraries
- Implement ReentrancyGuard
- Validate all inputs
- Use SafeERC20 for transfers
- Add access controls
- Test thoroughly
- Get audited (production)

### Frontend

- Validate user inputs
- Sanitize data
- Use HTTPS
- Implement CSP headers
- Rate limit API calls
- Handle errors gracefully

### Deployment

- Use hardware wallet for mainnet
- Keep private keys secure
- Use multi-sig for admin functions
- Implement timelock for upgrades
- Monitor for suspicious activity

---

## 📚 Additional Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Wagmi Docs](https://wagmi.sh/)
- [Foundry Book](https://book.getfoundry.sh/)
- [Solidity Docs](https://docs.soliditylang.org/)
- [OpenZeppelin](https://docs.openzeppelin.com/)

### Tutorials

- [Uniswap V2 Explained](https://uniswap.org/whitepaper.pdf)
- [AMM Math](https://docs.uniswap.org/contracts/v2/concepts/protocol-overview/how-uniswap-works)
- [Foundry Tutorial](https://book.getfoundry.sh/tutorials/solmate-nft)

### Tools

- [Remix IDE](https://remix.ethereum.org/)
- [Tenderly](https://tenderly.co/)
- [Arbiscan](https://sepolia.arbiscan.io/)
- [Chainlist](https://chainlist.org/)

---

## 🤝 Contributing

### How to Contribute

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Style

- Follow existing patterns
- Use TypeScript for frontend
- Comment complex logic
- Write tests for new features
- Update documentation

---

## 📞 Support

- **GitHub Issues:** [Report bugs](https://github.com/Cloude963/robinstock/issues)
- **Discussions:** [Ask questions](https://github.com/Cloude963/robinstock/discussions)
- **Documentation:** [Read the docs](./README.md)

---

## 📄 License

MIT License - see LICENSE file for details.
