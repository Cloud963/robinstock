# Smart Contracts Documentation

## 📜 Contract Overview

RobinStock consists of 8 main smart contracts deployed on Arbitrum Sepolia testnet.

## 🏭 Core AMM Contracts

### Factory.sol

**Purpose:** Creates and manages trading pairs

**Key Functions:**

```solidity
function createPair(address tokenA, address tokenB) external returns (address pair)
```
- Creates a new trading pair for tokenA/tokenB
- Returns the pair contract address
- Reverts if pair already exists

```solidity
function getPair(address tokenA, address tokenB) external view returns (address pair)
```
- Returns the address of an existing pair
- Returns address(0) if pair doesn't exist

```solidity
function allPairsLength() external view returns (uint256)
```
- Returns total number of pairs created

**State Variables:**
- `mapping(address => mapping(address => address)) public getPair` - Pair registry
- `address[] public allPairs` - Array of all pair addresses
- `address public feeTo` - Fee recipient address
- `address public feeToSetter` - Address that can change feeTo

**Events:**
```solidity
event PairCreated(address indexed token0, address indexed token1, address pair, uint256);
```

---

### Pair.sol

**Purpose:** AMM trading pair with LP token functionality

**Key Functions:**

```solidity
function mint(address to) external returns (uint256 liquidity)
```
- Mints LP tokens when liquidity is added
- Calculates liquidity based on deposited amounts
- First liquidity provider locks MINIMUM_LIQUIDITY

```solidity
function burn(address to) external returns (uint256 amount0, uint256 amount1)
```
- Burns LP tokens and returns underlying assets
- Proportional to LP token share

```solidity
function swap(uint256 amount0Out, uint256 amount1Out, address to, bytes calldata data) external
```
- Executes token swap
- Validates constant product formula (x * y = k)
- Applies 0.3% fee

```solidity
function getReserves() public view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)
```
- Returns current token reserves
- Used for price calculations

**State Variables:**
- `address public token0, token1` - Pair tokens
- `uint112 private reserve0, reserve1` - Token reserves
- `uint256 public constant MINIMUM_LIQUIDITY = 1000` - Minimum liquidity lock
- `uint256 private constant FEE_NUMERATOR = 3` - 0.3% fee

**Events:**
```solidity
event Mint(address indexed sender, uint256 amount0, uint256 amount1);
event Burn(address indexed sender, uint256 amount0, uint256 amount1, address indexed to);
event Swap(address indexed sender, uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out, address indexed to);
event Sync(uint112 reserve0, uint112 reserve1);
```

---

### Router.sol

**Purpose:** User-friendly interface for swaps and liquidity

**Key Functions:**

```solidity
function addLiquidity(
    address tokenA,
    address tokenB,
    uint256 amountADesired,
    uint256 amountBDesired,
    uint256 amountAMin,
    uint256 amountBMin,
    address to,
    uint256 deadline
) external returns (uint256 amountA, uint256 amountB, uint256 liquidity)
```
- Adds liquidity to a pair
- Creates pair if it doesn't exist
- Protects against slippage with min amounts
- Deadline prevents stale transactions

```solidity
function removeLiquidity(
    address tokenA,
    address tokenB,
    uint256 liquidity,
    uint256 amountAMin,
    uint256 amountBMin,
    address to,
    uint256 deadline
) external returns (uint256 amountA, uint256 amountB)
```
- Removes liquidity from a pair
- Burns LP tokens
- Returns underlying tokens

```solidity
function swapExactTokensForTokens(
    uint256 amountIn,
    uint256 amountOutMin,
    address[] calldata path,
    address to,
    uint256 deadline
) external returns (uint256[] memory amounts)
```
- Swaps exact input amount for output
- Supports multi-hop swaps via path
- Slippage protection with amountOutMin

```solidity
function getAmountsOut(uint256 amountIn, address[] calldata path) external view returns (uint256[] memory amounts)
```
- Calculates output amounts for a given input
- Used for price quotes

---

## 🪙 Token Contracts

### StockToken.sol

**Purpose:** ERC20 token representing tokenized stocks

**Key Functions:**

```solidity
function mint(address to, uint256 amount) external onlyOwner
```
- Mints new stock tokens
- Only callable by owner

```solidity
function burn(address from, uint256 amount) external onlyOwner
```
- Burns stock tokens from an address
- Only callable by owner

```solidity
function burnSelf(uint256 amount) external
```
- Allows users to burn their own tokens

**State Variables:**
- `string public stockSymbol` - Real stock symbol (e.g., "TSLA")
- `uint8 private _decimals` - Token decimals (18)

**Deployed Tokens:**
- TSLA - Tokenized Tesla stock
- AMZN - Tokenized Amazon stock  
- AAPL - Tokenized Apple stock
- GOOGL - Tokenized Google stock

---

### USDC.sol

**Purpose:** Stablecoin for trading pairs

**Key Functions:**

```solidity
function mint(address to, uint256 amount) external onlyOwner
```
- Mints USDC tokens
- Only callable by owner

```solidity
function faucet() external
```
- Testnet faucet function
- Mints 1000 USDC to caller
- Anyone can call

**Properties:**
- 6 decimals (standard USDC)
- Symbol: USDC
- Name: USD Coin

---

## 🎯 Staking Contracts

### StakingRewards.sol

**Purpose:** Stake LP tokens to earn RBS rewards

**Key Functions:**

```solidity
function stake(uint256 amount) external
```
- Stakes LP tokens
- Starts earning rewards

```solidity
function withdraw(uint256 amount) external
```
- Withdraws staked LP tokens
- Claims pending rewards

```solidity
function getReward() external
```
- Claims accumulated rewards
- Transfers RBS tokens to user

```solidity
function earned(address account) public view returns (uint256)
```
- Returns pending rewards for an account

**State Variables:**
- `IERC20 public stakingToken` - LP token to stake
- `IERC20 public rewardsToken` - RBS reward token
- `uint256 public rewardRate` - Rewards per second
- `mapping(address => uint256) public balanceOf` - Staked balances

---

### RBSToken.sol

**Purpose:** Governance and reward token

**Properties:**
- Symbol: RBS
- Name: RobinStock Token
- Decimals: 18
- Standard ERC20 with mint/burn

---

## 🔮 Oracle Contract

### MockOracle.sol

**Purpose:** Simulates price feeds for testnet

**Key Functions:**

```solidity
function updatePrice(address token, uint256 price) external onlyOwner
```
- Updates token price
- Only owner can update

```solidity
function getPrice(address token) external view returns (uint256)
```
- Returns current price for a token

**Note:** In production, this would be replaced with Chainlink oracles.

---

## 🔒 Security Features

### ReentrancyGuard
All state-changing functions in Pair.sol use `nonReentrant` modifier to prevent reentrancy attacks.

### SafeERC20
Router.sol uses OpenZeppelin's SafeERC20 for safe token transfers.

### Access Control
Ownable pattern used for admin functions (minting, burning, price updates).

### Input Validation
- Deadline checks prevent stale transactions
- Min amount checks protect against slippage
- Zero address checks
- Overflow protection (Solidity 0.8+)

---

## 📊 AMM Math

### Constant Product Formula

```
x * y = k
```

Where:
- x = reserve of token0
- y = reserve of token1  
- k = constant product

### Swap Calculation

Given input amount `amountIn`, output is calculated as:

```solidity
uint256 amountInWithFee = amountIn * 997; // 0.3% fee
uint256 numerator = amountInWithFee * reserveOut;
uint256 denominator = (reserveIn * 1000) + amountInWithFee;
amountOut = numerator / denominator;
```

### Liquidity Calculation

For first liquidity provider:
```solidity
liquidity = sqrt(amount0 * amount1) - MINIMUM_LIQUIDITY
```

For subsequent providers:
```solidity
liquidity = min(
    (amount0 * totalSupply) / reserve0,
    (amount1 * totalSupply) / reserve1
)
```

---

## 📦 Contract Addresses (Testnet)

**Note:** These are example addresses. Actual deployment addresses will be different.

```
Factory: 0x...
Router: 0x...
USDC: 0x...
TSLA: 0x...
AMZN: 0x...
AAPL: 0x...
RBSToken: 0x...
StakingRewards: 0x...
```

See deployment scripts for actual addresses.

---

## 🛠️ Development

### Compile Contracts

```bash
cd contracts
forge build
```

### Run Tests

```bash
forge test
```

### Deploy

```bash
forge script script/Deploy.s.sol --rpc-url $ARBITRUM_SEPOLIA_RPC --broadcast
```

---

## 📝 Contract Verification

All contracts should be verified on Arbiscan for transparency:

```bash
forge verify-contract <ADDRESS> <CONTRACT> --chain arbitrum-sepolia
```

---

## 🔗 References

- [Uniswap V2 Whitepaper](https://uniswap.org/whitepaper.pdf)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Foundry Book](https://book.getfoundry.sh/)
