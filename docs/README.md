# RobinStock Documentation

Welcome to the RobinStock documentation. This comprehensive guide will help you understand, deploy, and use the RobinStock platform - a decentralized exchange for tokenized stocks.

## 📚 Table of Contents

### Getting Started

1. **[Overview](./overview.md)** - Introduction to RobinStock and its vision
   - What is RobinStock?
   - Key features
   - Use cases
   - RWA (Real World Assets) explained

2. **[User Guide](./user-guide.md)** - How to use the platform
   - Setting up your wallet
   - How to swap tokens
   - How to provide liquidity
   - How to stake LP tokens
   - Dashboard overview

3. **[FAQ](./faq.md)** - Frequently asked questions
   - General questions
   - Trading questions
   - Liquidity questions
   - Staking questions
   - Technical questions
   - Troubleshooting

### Technical Documentation

4. **[Architecture](./architecture.md)** - Technical architecture and system design
   - System overview
   - Component architecture
   - Data flow
   - AMM formula
   - Network architecture

5. **[Smart Contracts](./smart-contracts.md)** - Detailed contract documentation
   - Core AMM contracts (Factory, Pair, Router)
   - Token contracts (StockToken, USDC)
   - Staking contracts
   - Security features
   - Contract addresses

6. **[API Reference](./api-reference.md)** - Contract interfaces and methods
   - Factory API
   - Pair API
   - Router API
   - Staking API
   - Events and errors
   - Code examples

7. **[Developer Guide](./developer-guide.md)** - Setup, deployment, and testing
   - Quick start
   - Project structure
   - Frontend development
   - Smart contract development
   - Testing
   - Deployment
   - Contributing

## 🚀 Quick Start

### For Users

1. **Connect Wallet**
   - Install MetaMask or compatible wallet
   - Add Arbitrum Sepolia network
   - Get test ETH from faucet

2. **Get Test Tokens**
   - Visit RobinStock app
   - Use USDC faucet to get 1000 USDC
   - Start trading!

3. **Start Trading**
   - Go to Swap page
   - Select tokens to swap
   - Enter amount and confirm

See [User Guide](./user-guide.md) for detailed instructions.

### For Developers

```bash
# Clone repository
git clone https://github.com/Cloude963/robinstock.git
cd robinstock

# Install frontend dependencies
cd app
pnpm install

# Run development server
pnpm dev

# Install contract dependencies
cd ../contracts
forge install

# Compile contracts
forge build

# Run tests
forge test
```

See [Developer Guide](./developer-guide.md#quick-start) for complete setup.

## 🎯 What is RobinStock?

RobinStock is a decentralized exchange (DEX) that enables:

- **24/7 Stock Trading** - Trade tokenized stocks anytime
- **Liquidity Provision** - Earn fees by providing liquidity
- **LP Staking** - Stake LP tokens for additional RBS rewards
- **DeFi Integration** - Use stocks in DeFi protocols

### Key Features

✅ **Automated Market Maker (AMM)**
- Constant product formula (x * y = k)
- 0.3% trading fee
- Instant swaps
- No order books

✅ **Tokenized Stocks**
- TSLA (Tesla)
- AMZN (Amazon)
- AAPL (Apple)
- GOOGL (Google)

✅ **Liquidity Mining**
- Earn trading fees
- Stake LP tokens
- Earn RBS rewards

✅ **Built on Arbitrum**
- Low gas fees (~$0.01)
- Fast finality (~2 seconds)
- EVM compatible

## 🏗️ Architecture Overview

```
Frontend (Next.js + Wagmi)
         ↓
Smart Contracts (Solidity)
  - Factory
  - Router
  - Pairs (AMM)
  - Tokens
  - Staking
         ↓
Arbitrum Sepolia Testnet
```

## 📖 Documentation Structure

### For Users
- Start with [Overview](./overview.md)
- Follow [User Guide](./user-guide.md)
- Check [FAQ](./faq.md) for common questions

### For Developers
- Read [Architecture](./architecture.md)
- Study [Smart Contracts](./smart-contracts.md)
- Use [API Reference](./api-reference.md)
- Follow [Developer Guide](./developer-guide.md)

### For Integrators
- Review [API Reference](./api-reference.md)
- Check contract addresses in [Smart Contracts](./smart-contracts.md)
- See code examples in [Developer Guide](./developer-guide.md)

## 🔗 Useful Links

### Project Links
- **GitHub Repository:** [github.com/Cloude963/robinstock](https://github.com/Cloude963/robinstock)
- **Live Demo:** http://localhost:3003 (local) or deployed URL
- **Release:** [GitHub Releases](https://github.com/Cloude963/robinstock/releases)

### Network Links
- **Arbitrum Sepolia Explorer:** https://sepolia.arbiscan.io/
- **Faucet:** https://faucet.quicknode.com/arbitrum/sepolia
- **Network Info:** https://chainlist.org/

### Resources
- **Uniswap V2 Whitepaper:** https://uniswap.org/whitepaper.pdf
- **Arbitrum Docs:** https://docs.arbitrum.io/
- **OpenZeppelin:** https://docs.openzeppelin.com/

## ⚠️ Important Disclaimers

**This is a testnet demo for educational and demonstration purposes only.**

- ❌ No real stocks are held in custody
- ❌ Tokens have no real-world value
- ❌ Not financial advice
- ❌ Not audited for production use
- ✅ For educational purposes only
- ✅ Open source (MIT License)

**Do not use with real funds without proper audit and legal compliance.**

## 🤝 Contributing

Contributions are welcome! Please:

1. Read [Developer Guide](./developer-guide.md#contributing)
2. Fork the repository
3. Create a feature branch
4. Submit a pull request

## 📞 Support

- **GitHub Issues:** [Report bugs](https://github.com/Cloude963/robinstock/issues)
- **Discussions:** [Ask questions](https://github.com/Cloude963/robinstock/discussions)
- **Documentation:** You're reading it!

## 📄 License

MIT License - see LICENSE file for details.

---

**Ready to get started?** Choose your path:

- 👤 **User?** → [User Guide](./user-guide.md)
- 👨‍💻 **Developer?** → [Developer Guide](./developer-guide.md)
- 🤔 **Questions?** → [FAQ](./faq.md)
