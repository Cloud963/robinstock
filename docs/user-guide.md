# User Guide

## 👋 Welcome to RobinStock

This guide will help you use the RobinStock platform to trade tokenized stocks, provide liquidity, and earn rewards.

## 🔑 Getting Started

### Prerequisites

1. **Web3 Wallet** - MetaMask, Rainbow, or any WalletConnect-compatible wallet
2. **Arbitrum Sepolia Testnet** configured in your wallet
3. **Test ETH** for gas fees
4. **Test USDC** from the faucet

### Setting Up Your Wallet

#### Add Arbitrum Sepolia Network

**Network Details:**
- Network Name: Arbitrum Sepolia
- RPC URL: https://sepolia-rollup.arbitrum.io/rpc
- Chain ID: 421614
- Currency Symbol: ETH
- Block Explorer: https://sepolia.arbiscan.io/

**MetaMask Instructions:**
1. Open MetaMask
2. Click network dropdown
3. Click "Add Network"
4. Click "Add a network manually"
5. Enter the details above
6. Click "Save"

#### Get Test ETH

Visit: https://faucet.quicknode.com/arbitrum/sepolia

1. Enter your wallet address
2. Complete captcha
3. Receive 0.1 test ETH

#### Get Test USDC

1. Connect your wallet to RobinStock
2. Go to the Swap page
3. Click "Get USDC" or use the USDC faucet function
4. Receive 1000 test USDC

---

## 🔄 How to Swap

### Step 1: Connect Wallet

1. Visit [RobinStock](http://localhost:3003)
2. Click "Connect Wallet" in the top right
3. Select your wallet (MetaMask, Rainbow, etc.)
4. Approve the connection
5. Ensure you're on Arbitrum Sepolia network

### Step 2: Select Tokens

1. Click on the **"You Pay"** token selector
2. Choose the token you want to swap (e.g., USDC)
3. Click on the **"You Receive"** token selector
4. Choose the token you want to receive (e.g., TSLA)

### Step 3: Enter Amount

1. Enter the amount you want to swap in the "You Pay" field
2. The "You Receive" amount will auto-calculate
3. Review the exchange rate and price impact
4. Check the minimum received (after slippage)

### Step 4: Adjust Settings (Optional)

1. Click the settings icon (⚙️)
2. Adjust slippage tolerance (default: 0.5%)
   - Higher slippage = more likely to succeed
   - Lower slippage = better price, may fail
3. Set transaction deadline (default: 20 minutes)

### Step 5: Execute Swap

1. Click **"Swap"** button
2. Review the transaction details
3. Click **"Confirm Swap"**
4. Approve the transaction in your wallet
5. Wait for confirmation (~2-5 seconds)
6. Success! Your tokens have been swapped

### Understanding Swap Details

**Exchange Rate:** How many tokens you get per token you pay

**Price Impact:** How much your trade affects the pool price
- < 1%: Excellent
- 1-3%: Good
- 3-5%: Fair
- > 5%: High impact, consider smaller trade

**Minimum Received:** Worst-case amount after slippage

**Liquidity Provider Fee:** 0.3% fee distributed to LP providers

---

## 💧 How to Provide Liquidity

### Why Provide Liquidity?

- Earn 0.3% of all trades in your pool
- Receive LP tokens representing your share
- Stake LP tokens for additional RBS rewards
- Support the ecosystem

### Step 1: Navigate to Liquidity

1. Click **"Liquidity"** in the navigation menu
2. View available pools and their APRs

### Step 2: Select Pool

1. Choose a pool (e.g., USDC/TSLA)
2. Click **"Add Liquidity"**

### Step 3: Enter Amounts

1. Enter amount for first token (e.g., 1000 USDC)
2. Amount for second token auto-calculates based on pool ratio
3. Review the amounts and pool share

**Important:** You must provide both tokens in the correct ratio!

### Step 4: Approve Tokens

1. Click **"Approve USDC"**
2. Confirm in wallet
3. Wait for confirmation
4. Click **"Approve TSLA"**
5. Confirm in wallet
6. Wait for confirmation

### Step 5: Add Liquidity

1. Click **"Add Liquidity"**
2. Review transaction details:
   - Amounts deposited
   - LP tokens to receive
   - Pool share percentage
3. Confirm in wallet
4. Wait for confirmation
5. Success! You've received LP tokens

### Understanding LP Tokens

**LP Tokens** represent your share of the pool:
- Proportional to your contribution
- Can be staked for additional rewards
- Redeemable for underlying tokens anytime
- Transferable (but you lose pool share)

---

## 💸 How to Remove Liquidity

### Step 1: Navigate to Your Positions

1. Go to **"Liquidity"** page
2. Scroll to **"Your Positions"**
3. Find the pool you want to exit

### Step 2: Remove Liquidity

1. Click **"Remove"** on the position
2. Select percentage to remove:
   - 25%, 50%, 75%, or 100%
   - Or enter custom amount
3. Review amounts you'll receive

### Step 3: Confirm Removal

1. Click **"Remove Liquidity"**
2. Approve LP token spending (if first time)
3. Confirm transaction in wallet
4. Wait for confirmation
5. Receive your tokens back!

**Note:** You'll receive both tokens in the current pool ratio, which may differ from when you deposited.

---

## 🪙 How to Stake LP Tokens

### Why Stake?

- Earn RBS governance tokens
- Additional rewards on top of trading fees
- Variable APR based on pool performance
- No lock-up period

### Step 1: Navigate to Stake

1. Click **"Stake"** in navigation
2. View available staking pools

### Step 2: Select Pool

1. Choose a pool to stake in
2. Check the APR (Annual Percentage Rate)
3. Click **"Stake"**

### Step 3: Enter Amount

1. Enter amount of LP tokens to stake
2. Or click **"Max"** to stake all
3. Review estimated rewards

### Step 4: Approve and Stake

1. Click **"Approve LP Token"**
2. Confirm in wallet
3. Click **"Stake"**
4. Confirm in wallet
5. Success! You're now earning RBS rewards

### Claiming Rewards

1. Go to **"Stake"** page
2. View your staked positions
3. See accumulated rewards
4. Click **"Claim Rewards"**
5. Confirm in wallet
6. Receive RBS tokens!

### Unstaking

1. Go to your staked position
2. Click **"Unstake"**
3. Enter amount to unstake
4. Confirm transaction
5. Receive LP tokens back + any pending rewards

---

## 📊 Dashboard

### Portfolio Overview

The Dashboard shows:

**Total Value:**
- Combined value of all your holdings
- Tokens, LP positions, staked assets

**Token Balances:**
- All token balances in your wallet
- Current USD value

**Liquidity Positions:**
- Active LP positions
- Pool share percentage
- Earned fees

**Staked Positions:**
- Staked LP tokens
- Pending rewards
- APR

**Transaction History:**
- Recent swaps
- Liquidity adds/removes
- Stakes/unstakes
- Reward claims

---

## ❓ Common Questions

### What is slippage?

Slippage is the difference between expected and actual price due to:
- Price movement during transaction
- Large trades affecting pool ratio
- Network congestion

**Recommendation:** Use 0.5-1% for stable pairs, 1-3% for volatile pairs.

### What is price impact?

Price impact is how much your trade moves the pool price:
- Larger trades = higher impact
- Smaller pools = higher impact
- Can result in worse exchange rate

**Tip:** Split large trades into smaller ones to reduce impact.

### What is impermanent loss?

Impermanent loss occurs when token prices diverge:
- You provide liquidity at one ratio
- Prices change significantly
- You'd have more value just holding tokens

**Mitigation:**
- Provide liquidity to stable pairs
- Earn enough fees to offset loss
- Stake LP tokens for additional rewards

### How are trading fees distributed?

- 0.3% fee on every swap
- Distributed proportionally to all LP providers
- Automatically compounded into pool
- Realized when you remove liquidity

### Can I lose money?

Yes, through:
- **Impermanent loss** - Price divergence
- **Smart contract risk** - Bugs or exploits
- **Market risk** - Token value decrease

**This is a testnet demo - no real value at risk!**

---

## 🛡️ Safety Tips

### Before Trading

✅ **DO:**
- Check you're on Arbitrum Sepolia testnet
- Verify contract addresses
- Start with small amounts
- Understand price impact
- Set appropriate slippage

❌ **DON'T:**
- Trade with real money (this is testnet!)
- Ignore high price impact warnings
- Set very high slippage (risk of frontrunning)
- Rush transactions

### Before Providing Liquidity

✅ **DO:**
- Understand impermanent loss
- Check pool liquidity and volume
- Calculate potential returns
- Diversify across pools

❌ **DON'T:**
- Provide all funds to one pool
- Ignore pool imbalances
- Forget about gas costs

### General Security

✅ **DO:**
- Keep wallet seed phrase secure
- Verify transaction details before signing
- Use hardware wallet for large amounts
- Revoke approvals for unused contracts

❌ **DON'T:**
- Share your private key
- Click suspicious links
- Approve unlimited amounts unnecessarily
- Use public WiFi for transactions

---

## 🐛 Troubleshooting

### Transaction Failed

**Possible causes:**
- Insufficient gas
- Slippage too low
- Deadline expired
- Insufficient balance

**Solutions:**
- Increase gas limit
- Increase slippage tolerance
- Try again with fresh deadline
- Check token balances

### "Insufficient Liquidity" Error

**Cause:** Pool doesn't have enough tokens for your trade

**Solutions:**
- Reduce trade size
- Try different pool/route
- Provide liquidity yourself

### Wallet Not Connecting

**Solutions:**
- Refresh page
- Clear browser cache
- Try different browser
- Update wallet extension
- Check network (must be Arbitrum Sepolia)

### Tokens Not Showing

**Solutions:**
- Add token contract address manually
- Refresh wallet
- Check you're on correct network
- Wait for transaction confirmation

---

## 📞 Support

### Need Help?

- **GitHub Issues:** [Report bugs](https://github.com/Cloude963/robinstock/issues)
- **Documentation:** [Read the docs](./README.md)
- **Smart Contracts:** [View contracts](./smart-contracts.md)

### Useful Links

- **Arbitrum Sepolia Explorer:** https://sepolia.arbiscan.io/
- **Faucet:** https://faucet.quicknode.com/arbitrum/sepolia
- **GitHub:** https://github.com/Cloude963/robinstock

---

## ⚠️ Disclaimer

**This is a testnet demo for educational purposes only.**

- No real stocks are held in custody
- Tokens have no real-world value
- Not financial advice
- Use at your own risk
- Not audited for production use

For educational and demonstration purposes only.
