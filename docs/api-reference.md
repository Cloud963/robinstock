# API Reference

## 📚 Contract Interfaces

This document provides a complete reference for interacting with RobinStock smart contracts.

---

## Factory Contract

### Read Functions

#### `getPair(address tokenA, address tokenB) → address pair`

Returns the address of the pair for tokenA and tokenB.

**Parameters:**
- `tokenA` (address): First token address
- `tokenB` (address): Second token address

**Returns:**
- `pair` (address): Pair contract address, or address(0) if doesn't exist

**Example:**
```javascript
const pairAddress = await factory.getPair(usdcAddress, tslaAddress);
```

#### `allPairs(uint256 index) → address pair`

Returns pair address at given index.

**Parameters:**
- `index` (uint256): Index in allPairs array

**Returns:**
- `pair` (address): Pair contract address

#### `allPairsLength() → uint256`

Returns total number of pairs created.

**Returns:**
- `length` (uint256): Number of pairs

**Example:**
```javascript
const totalPairs = await factory.allPairsLength();
```

### Write Functions

#### `createPair(address tokenA, address tokenB) → address pair`

Creates a new trading pair.

**Parameters:**
- `tokenA` (address): First token address
- `tokenB` (address): Second token address

**Returns:**
- `pair` (address): Address of created pair

**Reverts:**
- `IDENTICAL_ADDRESSES` - If tokenA == tokenB
- `ZERO_ADDRESS` - If either token is address(0)
- `PAIR_EXISTS` - If pair already exists

**Example:**
```javascript
const tx = await factory.createPair(usdcAddress, tslaAddress);
const receipt = await tx.wait();
const pairAddress = receipt.events[0].args.pair;
```

---

## Pair Contract

### Read Functions

#### `getReserves() → (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)`

Returns current reserves and last update timestamp.

**Returns:**
- `reserve0` (uint112): Reserve of token0
- `reserve1` (uint112): Reserve of token1
- `blockTimestampLast` (uint32): Last update timestamp

**Example:**
```javascript
const [reserve0, reserve1, timestamp] = await pair.getReserves();
console.log(`Reserves: ${reserve0} / ${reserve1}`);
```

#### `token0() → address`

Returns address of token0 (lower address).

#### `token1() → address`

Returns address of token1 (higher address).

#### `totalSupply() → uint256`

Returns total supply of LP tokens.

#### `balanceOf(address account) → uint256`

Returns LP token balance of an account.

**Parameters:**
- `account` (address): Account to check

**Returns:**
- `balance` (uint256): LP token balance

### Write Functions

#### `mint(address to) → uint256 liquidity`

Mints LP tokens. Called by Router after tokens are transferred.

**Parameters:**
- `to` (address): Recipient of LP tokens

**Returns:**
- `liquidity` (uint256): Amount of LP tokens minted

**Note:** Don't call directly. Use Router.addLiquidity instead.

#### `burn(address to) → (uint256 amount0, uint256 amount1)`

Burns LP tokens and returns underlying assets.

**Parameters:**
- `to` (address): Recipient of underlying tokens

**Returns:**
- `amount0` (uint256): Amount of token0 returned
- `amount1` (uint256): Amount of token1 returned

**Note:** Don't call directly. Use Router.removeLiquidity instead.

#### `swap(uint256 amount0Out, uint256 amount1Out, address to, bytes calldata data)`

Executes a token swap.

**Parameters:**
- `amount0Out` (uint256): Amount of token0 to receive
- `amount1Out` (uint256): Amount of token1 to receive
- `to` (address): Recipient address
- `data` (bytes): Callback data (empty for normal swaps)

**Note:** Don't call directly. Use Router.swapExactTokensForTokens instead.

---

## Router Contract

### Read Functions

#### `factory() → address`

Returns Factory contract address.

#### `getAmountsOut(uint256 amountIn, address[] path) → uint256[] amounts`

Calculates output amounts for a given input.

**Parameters:**
- `amountIn` (uint256): Input amount
- `path` (address[]): Token path (e.g., [USDC, TSLA])

**Returns:**
- `amounts` (uint256[]): Output amounts for each step

**Example:**
```javascript
const path = [usdcAddress, tslaAddress];
const amounts = await router.getAmountsOut(
  ethers.parseUnits("100", 6), // 100 USDC
  path
);
console.log(`You will receive ${ethers.formatUnits(amounts[1], 18)} TSLA`);
```

#### `getAmountsIn(uint256 amountOut, address[] path) → uint256[] amounts`

Calculates required input for a desired output.

**Parameters:**
- `amountOut` (uint256): Desired output amount
- `path` (address[]): Token path

**Returns:**
- `amounts` (uint256[]): Required input amounts

### Write Functions

#### `addLiquidity(...) → (uint256 amountA, uint256 amountB, uint256 liquidity)`

Adds liquidity to a pair.

**Parameters:**
```solidity
address tokenA,
address tokenB,
uint256 amountADesired,
uint256 amountBDesired,
uint256 amountAMin,
uint256 amountBMin,
address to,
uint256 deadline
```

**Returns:**
- `amountA` (uint256): Actual amount of tokenA added
- `amountB` (uint256): Actual amount of tokenB added
- `liquidity` (uint256): LP tokens minted

**Example:**
```javascript
// Approve tokens first
await usdc.approve(routerAddress, ethers.parseUnits("1000", 6));
await tsla.approve(routerAddress, ethers.parseUnits("10", 18));

// Add liquidity
const tx = await router.addLiquidity(
  usdcAddress,
  tslaAddress,
  ethers.parseUnits("1000", 6),  // 1000 USDC desired
  ethers.parseUnits("10", 18),   // 10 TSLA desired
  ethers.parseUnits("950", 6),   // 950 USDC min (5% slippage)
  ethers.parseUnits("9.5", 18),  // 9.5 TSLA min (5% slippage)
  userAddress,
  Math.floor(Date.now() / 1000) + 60 * 20 // 20 min deadline
);
```

#### `removeLiquidity(...) → (uint256 amountA, uint256 amountB)`

Removes liquidity from a pair.

**Parameters:**
```solidity
address tokenA,
address tokenB,
uint256 liquidity,
uint256 amountAMin,
uint256 amountBMin,
address to,
uint256 deadline
```

**Returns:**
- `amountA` (uint256): Amount of tokenA received
- `amountB` (uint256): Amount of tokenB received

**Example:**
```javascript
// Approve LP tokens
const pairAddress = await factory.getPair(usdcAddress, tslaAddress);
const pair = new ethers.Contract(pairAddress, PairABI, signer);
await pair.approve(routerAddress, lpAmount);

// Remove liquidity
const tx = await router.removeLiquidity(
  usdcAddress,
  tslaAddress,
  lpAmount,
  0, // amountAMin (or calculate with slippage)
  0, // amountBMin
  userAddress,
  Math.floor(Date.now() / 1000) + 60 * 20
);
```

#### `swapExactTokensForTokens(...) → uint256[] amounts`

Swaps exact input amount for output.

**Parameters:**
```solidity
uint256 amountIn,
uint256 amountOutMin,
address[] calldata path,
address to,
uint256 deadline
```

**Returns:**
- `amounts` (uint256[]): Actual amounts for each step

**Example:**
```javascript
// Approve input token
await usdc.approve(routerAddress, ethers.parseUnits("100", 6));

// Get expected output
const path = [usdcAddress, tslaAddress];
const amountsOut = await router.getAmountsOut(
  ethers.parseUnits("100", 6),
  path
);
const minOutput = amountsOut[1] * 95n / 100n; // 5% slippage

// Execute swap
const tx = await router.swapExactTokensForTokens(
  ethers.parseUnits("100", 6),
  minOutput,
  path,
  userAddress,
  Math.floor(Date.now() / 1000) + 60 * 20
);
```

#### `swapTokensForExactTokens(...) → uint256[] amounts`

Swaps input for exact output amount.

**Parameters:**
```solidity
uint256 amountOut,
uint256 amountInMax,
address[] calldata path,
address to,
uint256 deadline
```

---

## StakingRewards Contract

### Read Functions

#### `balanceOf(address account) → uint256`

Returns staked balance of an account.

#### `earned(address account) → uint256`

Returns pending rewards for an account.

**Example:**
```javascript
const pendingRewards = await stakingRewards.earned(userAddress);
console.log(`Pending: ${ethers.formatUnits(pendingRewards, 18)} RBS`);
```

#### `rewardRate() → uint256`

Returns reward rate per second.

#### `totalSupply() → uint256`

Returns total staked amount.

### Write Functions

#### `stake(uint256 amount)`

Stakes LP tokens.

**Parameters:**
- `amount` (uint256): Amount of LP tokens to stake

**Example:**
```javascript
// Approve LP tokens
await lpToken.approve(stakingRewardsAddress, amount);

// Stake
const tx = await stakingRewards.stake(amount);
```

#### `withdraw(uint256 amount)`

Withdraws staked LP tokens and claims rewards.

**Parameters:**
- `amount` (uint256): Amount to withdraw

#### `getReward()`

Claims accumulated rewards without withdrawing stake.

**Example:**
```javascript
const tx = await stakingRewards.getReward();
```

#### `exit()`

Withdraws all staked tokens and claims all rewards.

---

## ERC20 Token Functions

### Standard ERC20

All tokens (USDC, StockTokens, RBS, LP tokens) implement standard ERC20:

#### `balanceOf(address account) → uint256`

Returns token balance.

#### `allowance(address owner, address spender) → uint256`

Returns approved amount.

#### `approve(address spender, uint256 amount) → bool`

Approves spending.

**Example:**
```javascript
await usdc.approve(routerAddress, ethers.MaxUint256);
```

#### `transfer(address to, uint256 amount) → bool`

Transfers tokens.

#### `transferFrom(address from, address to, uint256 amount) → bool`

Transfers tokens on behalf of owner.

### USDC Specific

#### `faucet()`

Mints 1000 USDC to caller (testnet only).

**Example:**
```javascript
const tx = await usdc.faucet();
await tx.wait();
console.log("Received 1000 USDC");
```

---

## Events

### Factory Events

```solidity
event PairCreated(
    address indexed token0,
    address indexed token1,
    address pair,
    uint256
);
```

### Pair Events

```solidity
event Mint(address indexed sender, uint256 amount0, uint256 amount1);

event Burn(
    address indexed sender,
    uint256 amount0,
    uint256 amount1,
    address indexed to
);

event Swap(
    address indexed sender,
    uint256 amount0In,
    uint256 amount1In,
    uint256 amount0Out,
    uint256 amount1Out,
    address indexed to
);

event Sync(uint112 reserve0, uint112 reserve1);
```

### Staking Events

```solidity
event Staked(address indexed user, uint256 amount);
event Withdrawn(address indexed user, uint256 amount);
event RewardPaid(address indexed user, uint256 reward);
```

---

## Error Codes

### Factory Errors
- `IDENTICAL_ADDRESSES` - tokenA == tokenB
- `ZERO_ADDRESS` - Token is address(0)
- `PAIR_EXISTS` - Pair already created

### Pair Errors
- `INSUFFICIENT_LIQUIDITY_MINTED` - Not enough liquidity
- `INSUFFICIENT_LIQUIDITY_BURNED` - Not enough to burn
- `INSUFFICIENT_OUTPUT_AMOUNT` - Output too low
- `INSUFFICIENT_INPUT_AMOUNT` - Input too low
- `INSUFFICIENT_LIQUIDITY` - Pool has insufficient liquidity
- `INVALID_TO` - Invalid recipient
- `K` - Constant product check failed

### Router Errors
- `EXPIRED` - Transaction deadline passed
- `INSUFFICIENT_A_AMOUNT` - Token A below minimum
- `INSUFFICIENT_B_AMOUNT` - Token B below minimum
- `EXCESSIVE_INPUT_AMOUNT` - Input exceeds maximum
- `INVALID_PATH` - Path length < 2

---

## Gas Estimates

**Approximate gas costs on Arbitrum Sepolia:**

- Create Pair: ~500,000 gas
- Add Liquidity (first time): ~200,000 gas
- Add Liquidity (subsequent): ~150,000 gas
- Remove Liquidity: ~120,000 gas
- Swap: ~100,000 gas
- Stake: ~80,000 gas
- Claim Rewards: ~60,000 gas

**Note:** Actual costs may vary based on network conditions.

---

## Rate Limits

No rate limits on smart contract calls. Limited only by:
- Gas costs
- Block time (~2 seconds on Arbitrum)
- Transaction nonce ordering

---

## Best Practices

### Always Set Deadlines
```javascript
const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes
```

### Calculate Slippage
```javascript
const slippageTolerance = 0.5; // 0.5%
const minOutput = expectedOutput * (100 - slippageTolerance) / 100;
```

### Check Allowances
```javascript
const allowance = await token.allowance(userAddress, routerAddress);
if (allowance < amount) {
  await token.approve(routerAddress, ethers.MaxUint256);
}
```

### Handle Errors
```javascript
try {
  const tx = await router.swapExactTokensForTokens(...);
  await tx.wait();
} catch (error) {
  if (error.message.includes('INSUFFICIENT_OUTPUT_AMOUNT')) {
    console.error('Slippage too high, try increasing slippage tolerance');
  }
}
```

---

## Code Examples

See [Developer Guide](./developer-guide.md) for complete integration examples.
