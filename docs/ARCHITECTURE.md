# RobinStock - Arquitetura do Sistema

## Visão Geral

RobinStock é uma DEX (Decentralized Exchange) AMM (Automated Market Maker) simplificada, inspirada no Uniswap v2, com funcionalidades de staking e oracle mock para demonstração em testnet.

## Componentes Principais

### 1. Smart Contracts

#### AMMFactory.sol
**Propósito:** Factory pattern para criar pares de trading.

**Funcionalidades:**
- `createPair(tokenA, tokenB)`: Cria um novo par AMM
- `getPair(tokenA, tokenB)`: Retorna o endereço do par existente
- Garante que cada par é único (não permite duplicatas)

**Design:**
- Usa CREATE2 para endereços determinísticos
- Emite evento `PairCreated` para indexação

#### AMMPair.sol
**Propósito:** Implementa o core do AMM com constant product formula (x * y = k).

**Funcionalidades:**
- `swap(amount0Out, amount1Out, to)`: Executa swap entre tokens
- `mint(to)`: Cria LP tokens quando liquidez é adicionada
- `burn(to)`: Queima LP tokens e retorna liquidez
- `sync()`: Sincroniza reservas com balanços reais

**Mecânica do AMM:**
```
Constant Product: x * y = k
Onde:
- x = reserva do token0
- y = reserva do token1
- k = constante que deve ser mantida ou aumentada

Fee: 0.3% em cada swap
- Fee é retida no pool (aumenta k)
- Beneficia LPs proporcionalmente
```

**LP Tokens:**
- Implementado como ERC20 interno
- Representa participação proporcional no pool
- Fórmula de mint inicial: sqrt(amount0 * amount1)
- Mints subsequentes: min(amount0/reserve0, amount1/reserve1) * totalSupply

**Proteções:**
- ReentrancyGuard em todas as funções críticas
- Minimum liquidity lock (1000 wei) para evitar manipulação
- Verificação de K após swaps

#### AMMRouter.sol
**Propósito:** Interface user-friendly para interagir com pares AMM.

**Funcionalidades:**
- `addLiquidity()`: Adiciona liquidez a um par (cria se não existir)
- `removeLiquidity()`: Remove liquidez e recebe tokens de volta
- `swapExactTokensForTokens()`: Swap com quantidade exata de input
- `getAmountOut()`: Calcula output esperado para um swap
- `quote()`: Calcula quantidade proporcional para adicionar liquidez

**Vantagens:**
- Gerencia approvals automaticamente
- Calcula slippage protection
- Cria pares automaticamente se necessário
- Interface mais simples que interagir diretamente com pairs

#### StakingRewards.sol
**Propósito:** Permite stake de LP tokens para ganhar rewards em RBS.

**Mecânica:**
```
Rewards por segundo = rewardRate
Reward por token = integral(rewardRate / totalStaked) dt

Para cada usuário:
earned = staked * (rewardPerToken - userRewardPerTokenPaid) + rewards
```

**Funcionalidades:**
- `stake(amount)`: Faz stake de LP tokens
- `withdraw(amount)`: Retira LP tokens
- `claimRewards()`: Reivindica rewards acumuladas
- `setRewardRate(rate)`: Owner pode ajustar taxa de rewards
- `pause()/unpause()`: Owner pode pausar em emergências

**Proteções:**
- ReentrancyGuard
- Pausable
- Ownable (apenas owner pode configurar)

#### MockOracle.sol
**Propósito:** Oracle mock para exibir preços de referência no UI.

**IMPORTANTE:** Este oracle NÃO é usado para execução de swaps. Swaps usam apenas as reservas do pool (AMM puro).

**Funcionalidades:**
- `setPrice(token, price)`: Owner define preço de referência
- `getPrice(token)`: Retorna preço armazenado

**Uso no Frontend:**
- Exibir "preço de mercado" de referência
- Calcular valor total do portfolio
- Mostrar métricas de TVL em USD
- Comparar preço AMM vs preço "oracle" (para fins educacionais)

**Por que não usar para swaps:**
- Oracles podem ser manipulados
- AMM é trustless e baseado em oferta/demanda real
- Preços do pool refletem liquidez real disponível

#### RBSToken.sol
**Propósito:** Token de recompensa (RobinStock Token).

**Funcionalidades:**
- ERC20 padrão
- Mintable apenas pelo owner (StakingRewards contract)
- Usado como incentivo para LPs

#### MockERC20.sol
**Propósito:** Token ERC20 para testes locais.

**Funcionalidades:**
- `faucet()`: Qualquer um pode mintar 1000 tokens para teste
- Usado para criar tokens mock (TSLA, AMZN, NFLX, WETH)

### 2. Frontend (Next.js)

#### Estrutura de Páginas

**1. /swap**
- Selecionar tokenIn e tokenOut
- Input de quantidade
- Mostrar quote (preço estimado)
- Botão para executar swap
- Mostrar slippage e fee

**2. /liquidity**
- Add Liquidity:
  - Selecionar par de tokens
  - Input de quantidades (auto-calcula proporção)
  - Mostrar LP tokens que receberá
- Remove Liquidity:
  - Mostrar posição atual (LP balance)
  - Input de quantidade a remover
  - Mostrar tokens que receberá de volta

**3. /stake**
- Stake LP tokens
- Mostrar rewards acumuladas em tempo real
- Botão para claim rewards
- Mostrar APR estimado

**4. /dashboard**
- TVL total (soma de todas as reservas)
- Volume 24h (se possível via eventos)
- Preços dos tokens (via oracle mock)
- Composição dos pools
- Métricas de staking

#### Stack Técnico

**Framework:** Next.js 14+ (App Router)
**Linguagem:** TypeScript
**Styling:** Tailwind CSS + shadcn/ui
**Web3:**
- wagmi - React hooks para Ethereum
- viem - TypeScript interface para Ethereum
- RainbowKit ou ConnectKit - Wallet connection

**Componentes Principais:**
```
components/
├── wallet/
│   └── WalletConnectButton.tsx
├── swap/
│   ├── TokenSelector.tsx
│   ├── AmountInput.tsx
│   └── SwapCard.tsx
├── liquidity/
│   ├── AddLiquidityCard.tsx
│   └── RemoveLiquidityCard.tsx
├── stake/
│   └── StakingCard.tsx
└── ui/ (shadcn components)
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    └── ...
```

**Hooks Customizados:**
```typescript
// Ler reservas do pair
usePoolReserves(pairAddress)

// Calcular quote para swap
useSwapQuote(tokenIn, tokenOut, amountIn)

// Ler posição de LP
useLPPosition(pairAddress, userAddress)

// Ler rewards de staking
useStakingRewards(userAddress)

// Executar swap
useSwap()

// Adicionar liquidez
useAddLiquidity()

// Fazer stake
useStake()
```

### 3. Fluxo de Dados

#### Swap Flow
```
1. Usuário seleciona tokenIn, tokenOut e quantidade
2. Frontend chama pair.getReserves() para calcular quote
3. Frontend calcula amountOutMin (com slippage tolerance)
4. Usuário aprova tokenIn para Router
5. Frontend chama router.swapExactTokensForTokens()
6. Router transfere tokens do usuário
7. Router chama pair.swap()
8. Pair executa swap e transfere tokens para usuário
9. Frontend atualiza UI com novo balanço
```

#### Add Liquidity Flow
```
1. Usuário seleciona par e quantidades
2. Se par não existe, Router cria via Factory
3. Frontend calcula proporção ideal baseado em reservas
4. Usuário aprova ambos tokens para Router
5. Frontend chama router.addLiquidity()
6. Router transfere tokens do usuário
7. Router chama pair.mint()
8. Pair calcula e minta LP tokens para usuário
9. Frontend atualiza UI com LP balance
```

#### Staking Flow
```
1. Usuário tem LP tokens
2. Usuário aprova LP tokens para StakingRewards
3. Frontend chama stakingRewards.stake(amount)
4. StakingRewards transfere LP tokens do usuário
5. StakingRewards atualiza staked balance
6. Rewards começam a acumular automaticamente
7. Frontend mostra rewards em tempo real via earned()
8. Usuário pode claim a qualquer momento
```

### 4. Segurança

**Proteções Implementadas:**
- ✅ ReentrancyGuard em todas as funções de transferência
- ✅ Ownable para funções administrativas
- ✅ Pausable para emergências
- ✅ Verificação de K após swaps
- ✅ Minimum liquidity lock
- ✅ Slippage protection no Router
- ✅ Deadline para transações

**Limitações (Demo Only):**
- ⚠️ Oracle é mock e centralizado (owner controla preços)
- ⚠️ Não há governance descentralizada
- ⚠️ Não há timelock para mudanças de owner
- ⚠️ Não há multisig
- ⚠️ Não auditado

### 5. Deployment

**Testnet Recomendada:** Arbitrum Sepolia ou Robinhood Chain Testnet

**Ordem de Deploy:**
1. MockERC20 tokens (TSLA, AMZN, NFLX, WETH)
2. AMMFactory
3. AMMRouter (passa factory address)
4. RBSToken
5. StakingRewards (passa RBS address)
6. MockOracle
7. Configurar preços no Oracle
8. Criar pares via Router
9. Adicionar liquidez inicial
10. Configurar reward rate no Staking

**Scripts:**
- `forge script script/Deploy.s.sol --broadcast --rpc-url $RPC_URL`
- `forge script script/Seed.s.sol --broadcast --rpc-url $RPC_URL`

### 6. Testing

**Testes Unitários (Foundry):**
```bash
forge test -vv
```

**Testes de Integração:**
- Testar fluxo completo: mint → swap → burn
- Testar staking: stake → wait → claim
- Testar edge cases: zero liquidity, large swaps, etc.

**Testes Frontend:**
- Testar conexão de wallet
- Testar aprovações de tokens
- Testar execução de transações
- Testar atualização de UI após transações

### 7. Métricas e Monitoramento

**Eventos Importantes:**
```solidity
// AMMPair
event Mint(address indexed sender, uint amount0, uint amount1);
event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
event Swap(address indexed sender, uint amount0In, uint amount1In, uint amount0Out, uint amount1Out, address indexed to);

// StakingRewards
event Staked(address indexed user, uint256 amount);
event Withdrawn(address indexed user, uint256 amount);
event RewardPaid(address indexed user, uint256 reward);
```

**Indexação:**
- Usar The Graph para indexar eventos
- Criar subgraph para queries eficientes
- Mostrar histórico de transações no dashboard

### 8. Roadmap Futuro (Pós-Demo)

**Melhorias Possíveis:**
- [ ] Implementar Uniswap V3 (concentrated liquidity)
- [ ] Oracle descentralizado (Chainlink, Pyth)
- [ ] Governance token e DAO
- [ ] Farming com múltiplos pools
- [ ] Limit orders
- [ ] Zap (add liquidity com um token só)
- [ ] Flash loans
- [ ] Cross-chain bridge
- [ ] Mobile app

## Conclusão

RobinStock é um MVP funcional de uma DEX AMM com staking, perfeito para demonstração em buildathons. O código é simples, bem comentado e fácil de entender, focando em funcionalidade core sem complexidade desnecessária.

**Diferenciais:**
- ✅ Código limpo e educacional
- ✅ UI moderna com shadcn/ui
- ✅ Staking integrado
- ✅ Oracle mock para métricas
- ✅ Deploy scripts prontos
- ✅ Documentação completa

**Ideal para:**
- Aprender como AMMs funcionam
- Demonstrar em buildathons
- Base para projetos mais complexos
- Portfolio de desenvolvedor Web3
