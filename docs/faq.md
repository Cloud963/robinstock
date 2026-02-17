# Frequently Asked Questions (FAQ)

## General Questions

### What is RobinStock?

RobinStock is a decentralized exchange (DEX) for trading tokenized stocks on the blockchain. It uses an Automated Market Maker (AMM) model similar to Uniswap, allowing users to swap tokenized stocks, provide liquidity, and earn rewards.

### Is this real?

**No.** This is a testnet demo for educational and competition purposes. No real stocks are held in custody, and tokens have no real-world value.

### What blockchain does it use?

RobinStock is deployed on **Arbitrum Sepolia testnet**, a Layer 2 scaling solution for Ethereum.

### Why Arbitrum?

- **Low fees:** ~$0.01 per transaction
- **Fast:** ~2 second finality
- **EVM compatible:** Works with existing Ethereum tools
- **Secure:** Inherits Ethereum security

---

## Trading Questions

### How do I start trading?

1. Connect a Web3 wallet (MetaMask, Rainbow, etc.)
2. Switch to Arbitrum Sepolia network
3. Get test ETH from faucet
4. Get test USDC from the app
5. Start swapping!

See [User Guide](./user-guide.md) for detailed instructions.

### What tokens can I trade?

**Stablecoins:**
- USDC (USD Coin)

**Tokenized Stocks:**
- TSLA (Tesla)
- AMZN (Amazon)
- AAPL (Apple)
- GOOGL (Google)

### What are the trading fees?

**0.3% per swap**, distributed to liquidity providers.

Example: Swap 100 USDC → Pay 0.30 USDC fee → Receive ~99.70 USDC worth of TSLA

### What is slippage?

Slippage is the difference between expected and actual price. It occurs due to:
- Price movement during transaction
- Large trades affecting pool ratio
- Network congestion

**Recommended slippage:** 0.5-1% for stable pairs, 1-3% for volatile pairs.

### What is price impact?

Price impact is how much your trade moves the pool price. Larger trades in smaller pools have higher impact.

**Example:**
- Pool has 10,000 USDC and 100 TSLA
- You swap 1,000 USDC (10% of pool)
- High price impact → worse exchange rate

**Tip:** Split large trades into smaller ones.

### Why did my transaction fail?

**Common reasons:**
- Insufficient gas
- Slippage too low (price moved)
- Deadline expired
- Insufficient balance
- Pool has insufficient liquidity

**Solutions:**
- Increase gas limit
- Increase slippage tolerance
- Try again with fresh deadline
- Check balances
- Reduce trade size

---

## Liquidity Questions

### What is liquidity provision?

Providing liquidity means depositing two tokens into a pool so others can trade. In return, you:
- Earn 0.3% of all trades
- Receive LP tokens representing your share
- Can stake LP tokens for additional rewards

### How do I provide liquidity?

1. Go to Liquidity page
2. Select a pool (e.g., USDC/TSLA)
3. Enter amounts for both tokens
4. Approve both tokens
5. Add liquidity
6. Receive LP tokens

See [User Guide](./user-guide.md#how-to-provide-liquidity) for details.

### What are LP tokens?

LP (Liquidity Provider) tokens represent your share of a pool. They:
- Are ERC20 tokens
- Can be redeemed for underlying assets
- Can be staked for additional rewards
- Are transferable (but you lose pool share)

### What is impermanent loss?

Impermanent loss occurs when token prices diverge from when you deposited.

**Example:**
- You deposit 1000 USDC + 10 TSLA (1 TSLA = 100 USDC)
- TSLA price doubles to 200 USDC
- Pool rebalances via arbitrage
- You now have ~707 USDC + ~7.07 TSLA
- Value: ~1414 USDC
- If you just held: 1000 USDC + 10 TSLA = 3000 USDC
- Impermanent loss: ~1586 USDC

**Mitigation:**
- Provide liquidity to stable pairs
- Earn enough fees to offset loss
- Stake LP tokens for additional rewards
- Understand the risk before providing

### How are fees distributed?

- 0.3% fee on every swap
- Automatically added to pool reserves
- Distributed proportionally to all LP providers
- Realized when you remove liquidity

**Example:**
- Pool has 100,000 USDC total liquidity
- You provide 10,000 USDC (10% share)
- Pool earns 300 USDC in fees
- Your share: 30 USDC
- Compounded into pool automatically

### Can I remove liquidity anytime?

**Yes!** There's no lock-up period. You can remove liquidity anytime by:
1. Going to Liquidity page
2. Finding your position
3. Clicking "Remove"
4. Selecting amount to remove
5. Confirming transaction

You'll receive both tokens in the current pool ratio.

---

## Staking Questions

### What is staking?

Staking means locking your LP tokens to earn additional RBS token rewards on top of trading fees.

### What is RBS?

RBS (RobinStock Token) is the platform's governance and reward token. It's earned by:
- Staking LP tokens
- Participating in governance (future)

### How do I stake?

1. Provide liquidity to get LP tokens
2. Go to Stake page
3. Select a staking pool
4. Approve LP tokens
5. Stake your LP tokens
6. Earn RBS rewards!

See [User Guide](./user-guide.md#how-to-stake-lp-tokens) for details.

### What is APR?

APR (Annual Percentage Rate) is the estimated yearly return from staking.

**Example:**
- You stake $1000 worth of LP tokens
- Pool APR is 50%
- Expected yearly earnings: $500 in RBS tokens

**Note:** APR is variable and changes based on:
- Total staked amount
- Reward rate
- Token prices

### Is there a lock-up period?

**No!** You can unstake anytime. When you unstake:
- You receive your LP tokens back
- Any pending rewards are automatically claimed

### How often are rewards distributed?

Rewards accrue every block (~2 seconds on Arbitrum). You can claim anytime.

---

## Technical Questions

### What is an AMM?

AMM (Automated Market Maker) is a type of DEX that uses a mathematical formula to price assets instead of an order book.

**Formula:** x * y = k
- x = reserve of token A
- y = reserve of token B
- k = constant product

When you trade, you change x and y, but k remains constant.

### How are prices determined?

Prices are determined by the ratio of tokens in the pool.

**Example:**
- Pool has 10,000 USDC and 100 TSLA
- Price: 10,000 / 100 = 100 USDC per TSLA

Prices update automatically as trades occur.

### What are smart contracts?

Smart contracts are self-executing programs on the blockchain. RobinStock uses:
- **Factory:** Creates trading pairs
- **Pair:** Manages pool reserves and swaps
- **Router:** User-friendly interface
- **Tokens:** ERC20 tokens (USDC, stocks, RBS)
- **Staking:** Manages LP staking and rewards

All code is open-source and verifiable.

### Is the code audited?

**No.** This is a testnet demo and has not been audited. **Do not use in production without a professional audit.**

For production, we recommend:
- Professional security audit
- Bug bounty program
- Gradual rollout
- Insurance coverage

### Where are the contracts deployed?

Contracts are deployed on **Arbitrum Sepolia testnet**. See deployment addresses in:
- [Smart Contracts Documentation](./smart-contracts.md)
- GitHub README
- Arbiscan explorer

---

## Wallet Questions

### What wallet should I use?

Any Web3 wallet that supports Arbitrum:
- **MetaMask** (most popular)
- **Rainbow Wallet**
- **Coinbase Wallet**
- **WalletConnect** compatible wallets

### How do I add Arbitrum Sepolia?

**Network Details:**
- Network Name: Arbitrum Sepolia
- RPC URL: https://sepolia-rollup.arbitrum.io/rpc
- Chain ID: 421614
- Currency Symbol: ETH
- Block Explorer: https://sepolia.arbiscan.io/

See [User Guide](./user-guide.md#setting-up-your-wallet) for step-by-step instructions.

### How do I get test ETH?

Visit: https://faucet.quicknode.com/arbitrum/sepolia

1. Enter your wallet address
2. Complete captcha
3. Receive 0.1 test ETH

### How do I get test USDC?

1. Connect wallet to RobinStock
2. Call the USDC faucet function
3. Receive 1000 test USDC

Or ask in the community for someone to send you some.

### Why can't I see my tokens?

Tokens might not appear automatically. To add them:

**MetaMask:**
1. Click "Import tokens"
2. Enter token contract address
3. Token symbol and decimals auto-fill
4. Click "Add"

Contract addresses are in the documentation.

---

## Safety & Security

### Is RobinStock safe?

**For testnet:** Yes, it's safe to experiment with test tokens.

**For mainnet:** This code is NOT audited and should NOT be used with real funds without:
- Professional security audit
- Extensive testing
- Bug bounty program
- Insurance

### Can I lose money?

**On testnet:** No real money at risk.

**On mainnet (hypothetically):**
- **Impermanent loss** from price divergence
- **Smart contract bugs** (not audited)
- **Market risk** from token price changes
- **Rug pulls** (always verify contracts)

### How do I stay safe?

✅ **DO:**
- Verify you're on the correct network
- Check contract addresses
- Start with small amounts
- Understand impermanent loss
- Keep seed phrase secure
- Use hardware wallet for large amounts

❌ **DON'T:**
- Share your private key
- Approve unlimited amounts unnecessarily
- Click suspicious links
- Rush transactions
- Ignore warnings

### What if I find a bug?

Please report it responsibly:
1. **Do NOT exploit it**
2. Open a GitHub issue (or email for critical bugs)
3. Provide details and reproduction steps
4. We'll acknowledge and fix ASAP

---

## RWA (Real World Assets)

### What are RWAs?

RWAs (Real World Assets) are blockchain tokens representing ownership of real-world assets:
- Stocks and equities
- Real estate
- Commodities
- Bonds
- Art and collectibles

### Why tokenize stocks?

**Benefits:**
- **24/7 trading** - No market hours
- **Fractional ownership** - Own 0.001 shares
- **Global access** - Trade from anywhere
- **DeFi integration** - Use as collateral, earn yield
- **Transparency** - All transactions on-chain
- **Lower fees** - No traditional broker fees

### How does stock tokenization work?

**In production (not this demo):**
1. Custodian holds real stocks
2. Tokens minted 1:1 with stocks
3. Regular audits verify backing
4. Tokens redeemable for real stocks
5. Oracle updates prices from stock market

**In this demo:**
- Simulated tokens (no real backing)
- Mock oracle for prices
- Educational purposes only

### Are tokenized stocks legal?

**It depends on jurisdiction.** Generally requires:
- Securities licenses
- Regulatory compliance
- KYC/AML procedures
- Proper custody
- Regular audits

**This demo is NOT a real securities offering.**

---

## Competition Questions

### What competition is this for?

This project was built for the **Robinhood Competition** to demonstrate:
- DeFi innovation
- RWA tokenization
- AMM mechanics
- Full-stack dApp development

### What makes this project unique?

- **Focus on stocks:** Not just crypto-to-crypto
- **Complete ecosystem:** Swap, liquidity, staking
- **Professional UI:** Robinhood-inspired design
- **Full documentation:** Comprehensive guides
- **Open source:** All code available

### Can I use this code?

**Yes!** MIT License. You can:
- Fork the repository
- Modify the code
- Deploy your own version
- Use for learning

**But please:**
- Give credit
- Don't use with real funds without audit
- Follow applicable laws

---

## Troubleshooting

### Transaction stuck/pending?

**Solutions:**
- Wait (Arbitrum is usually fast)
- Check Arbiscan for status
- Try speeding up in wallet
- If stuck >5 min, contact support

### "Insufficient liquidity" error?

**Cause:** Pool doesn't have enough tokens.

**Solutions:**
- Reduce trade size
- Try different pool
- Provide liquidity yourself

### Wallet not connecting?

**Solutions:**
- Refresh page
- Clear browser cache
- Try different browser
- Update wallet extension
- Check network (must be Arbitrum Sepolia)

### Numbers showing outside swap box?

**This was a UI bug that has been fixed.** If you still see it:
- Hard refresh (Ctrl+F5)
- Clear cache
- Report on GitHub

---

## Future Plans

### What's next for RobinStock?

**Potential features:**
- More tokenized stocks
- Limit orders
- Charts and analytics
- Mobile app
- Cross-chain support
- Governance voting
- Advanced order types

### Will this go to mainnet?

**Not currently planned.** This is a demo project. Mainnet deployment would require:
- Professional security audit
- Legal compliance
- Real stock custody
- Regulatory approval
- Significant funding

### Can I contribute?

**Yes!** Contributions welcome:
- Report bugs
- Suggest features
- Submit PRs
- Improve documentation
- Share feedback

See [Developer Guide](./developer-guide.md#contributing) for details.

---

## Contact & Support

### Where can I get help?

- **GitHub Issues:** [Report bugs](https://github.com/Cloude963/robinstock/issues)
- **Documentation:** [Read the docs](./README.md)
- **User Guide:** [How to use](./user-guide.md)
- **Developer Guide:** [Technical docs](./developer-guide.md)

### How do I report a bug?

1. Check if already reported
2. Open GitHub issue
3. Provide:
   - Description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser/wallet info

### How do I request a feature?

1. Open GitHub issue
2. Tag as "enhancement"
3. Describe the feature
4. Explain use case
5. Community will discuss

---

## Disclaimer

⚠️ **IMPORTANT DISCLAIMERS:**

- This is a **testnet demo** for educational purposes
- **No real stocks** are held in custody
- Tokens have **no real-world value**
- **Not financial advice**
- **Not audited** for production use
- Use at your **own risk**
- For **educational and demonstration purposes only**

**Do not use with real funds without proper audit and legal compliance.**

---

## Additional Resources

### Learn More

- [Project Overview](../PROJECT_OVERVIEW.md)
- [Architecture](./architecture.md)
- [Smart Contracts](./smart-contracts.md)
- [API Reference](./api-reference.md)

### External Links

- [Uniswap V2 Whitepaper](https://uniswap.org/whitepaper.pdf)
- [Arbitrum Docs](https://docs.arbitrum.io/)
- [OpenZeppelin](https://docs.openzeppelin.com/)
- [Solidity Docs](https://docs.soliditylang.org/)

---

**Still have questions?** Open an issue on GitHub!
