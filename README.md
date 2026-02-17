# 🚀 RobinStock - Decentralized Stock Token Exchange

**RobinStock** é um DEX (Decentralized Exchange) AMM estilo Uniswap v2 para trading de tokens de ações tokenizadas (RWA - Real World Assets) na Robinhood Chain Testnet.

## 🎥 Demo Video

**[📹 Watch Demo Video](https://github.com/YOUR_USERNAME/robinstock/releases/tag/v0.1-demo)** - 2-3 minute walkthrough showing all features

## 📦 Quick Start

**[⬇️ Download Release](https://github.com/YOUR_USERNAME/robinstock/releases/tag/v0.1-demo)** - Get the complete project as ZIP

## 📋 Características

- **AMM (Automated Market Maker)**: Swap de tokens usando fórmula constant product (x * y = k)
- **Liquidity Pools**: Adicione/remova liquidez e ganhe LP tokens
- **Staking**: Stake LP tokens para ganhar recompensas em RBS (RobinStock Token)
- **Mock Oracle**: Preços de referência para métricas de portfolio (não usado para execução de swaps)
- **Frontend Next.js**: Interface moderna com Tailwind CSS e shadcn/ui

## 🏗️ Estrutura do Projeto

```
robinstock/
├── contracts/          # Smart contracts Solidity (Foundry)
│   ├── src/
│   │   ├── MockERC20.sol
│   │   ├── AMMPair.sol
│   │   ├── AMMFactory.sol
│   │   ├── AMMRouter.sol
│   │   ├── RBSToken.sol
│   │   ├── StakingRewards.sol
│   │   └── MockOracle.sol
│   ├── test/
│   └── script/
├── app/                # Frontend Next.js
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   └── public/
├── scripts/            # Deploy e seed scripts
└── docs/               # Documentação
```

## 🛠️ Tecnologias

### Smart Contracts
- **Solidity 0.8.20**
- **Foundry** (forge, cast, anvil)
- **OpenZeppelin Contracts**

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **wagmi + viem** (Web3 integration)

## 📦 Instalação

### Pré-requisitos

```bash
# Verificar versões
node --version  # v20+
pnpm --version  # 8+
forge --version # foundry
git --version
```

### 1. Instalar Foundry (se necessário)

```bash
# Windows (PowerShell)
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### 2. Clonar e Instalar Dependências

```bash
# Clone o repositório
git clone https://github.com/YOUR_USERNAME/robinstock.git
cd robinstock

# Instalar dependências dos contratos
cd contracts
forge install
forge build

# Instalar dependências do frontend
cd ../app
cp .env.example .env.local
# Edite .env.local com seu WALLET_CONNECT_PROJECT_ID
pnpm install
```

## 🚀 Deploy

### Deploy Local (Anvil)

```bash
# Terminal 1: Iniciar Anvil
cd contracts
anvil

# Terminal 2: Deploy contratos
forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --broadcast

# Terminal 3: Seed liquidez
forge script script/Seed.s.sol --rpc-url http://localhost:8545 --broadcast
```

### Deploy Testnet (Robinhood Chain)

```bash
# Configurar .env
cp .env.example .env
# Editar .env com sua PRIVATE_KEY

# Deploy
forge script script/Deploy.s.sol \
  --rpc-url robinhood_testnet \
  --broadcast \
  --verify

# Seed liquidez
forge script script/Seed.s.sol \
  --rpc-url robinhood_testnet \
  --broadcast
```

## 🖥️ Rodar Frontend

```bash
cd app

# Desenvolvimento (porta 3001)
pnpm dev

# Build produção
pnpm build
pnpm start
```

Acesse: http://localhost:3001

> **Nota**: O app roda em modo demo com dados mock. Para usar contratos reais, faça o deploy primeiro e configure os endereços no .env.local

## 🧪 Testes

```bash
cd contracts

# Rodar todos os testes
forge test

# Testes com verbosidade
forge test -vvv

# Teste específico
forge test --match-test testSwap

# Coverage
forge coverage
```

## 📖 Como Usar (Demo de 3 minutos)

### 1. Conectar Carteira (30s)
- Abra http://localhost:3001
- Clique em "Connect Wallet" no canto superior direito
- Selecione sua carteira (MetaMask, WalletConnect, etc.)
- Aprove a conexão
- Certifique-se de estar na rede Arbitrum Sepolia

### 2. Swap Tokens (1min)
- Navegue para página "/swap" (ou clique em "Swap" no menu)
- Selecione token de entrada (ex: WETH)
- Selecione token de saída (ex: TSLA)
- Digite quantidade (ex: 0.5 WETH)
- Veja o quote calculado automaticamente usando AMM (x*y=k)
- Ajuste slippage se necessário (clique no ícone de configurações)
- Clique "Swap"
- Confirme transação na carteira

### 3. Adicionar Liquidez (1min)
- Vá para "/liquidity"
- Escolha um pool existente ou crie novo
- Digite quantidades dos dois tokens
- Veja a proporção e share do pool
- Clique "Add Liquidity"
- Aprove tokens (se primeira vez)
- Confirme transação
- Receba LP tokens representando sua posição

### 4. Stake LP Tokens (30s)
- Vá para "/stake"
- Selecione o pool de staking
- Digite quantidade de LP tokens para stake
- Veja APR estimado
- Clique "Stake"
- Confirme transação
- Acompanhe rewards acumulando em tempo real
- Clique "Claim Rewards" para resgatar RBS tokens

### 5. Dashboard (Bônus)
- Vá para "/dashboard"
- Veja seu portfolio completo
- Acompanhe posições de liquidez
- Histórico de trades
- Performance geral

## 📊 Contratos Deployados

Após o deploy, os endereços serão salvos em:
```
contracts/broadcast/Deploy.s.sol/[chain-id]/run-latest.json
```

Exemplo:
```json
{
  "factory": "0x...",
  "router": "0x...",
  "rbsToken": "0x...",
  "staking": "0x...",
  "oracle": "0x...",
  "pairs": {
    "TSLA-AMZN": "0x..."
  }
}
```

## 🔧 Configuração

### Variáveis de Ambiente

**contracts/.env**
```bash
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_api_key_here
```

**app/.env.local**
```bash
NEXT_PUBLIC_CHAIN_ID=421614
NEXT_PUBLIC_RPC_URL=https://sepolia-rollup.arbitrum.io/rpc
NEXT_PUBLIC_FACTORY_ADDRESS=0x...
NEXT_PUBLIC_ROUTER_ADDRESS=0x...
NEXT_PUBLIC_STAKING_ADDRESS=0x...
NEXT_PUBLIC_ORACLE_ADDRESS=0x...
```

## 📚 Documentação Adicional

- [Arquitetura](./docs/ARCHITECTURE.md) - Como o AMM funciona
- [Contratos](./docs/CONTRACTS.md) - Detalhes dos smart contracts
- [Frontend](./docs/FRONTEND.md) - Estrutura do app
- [Deploy Guide](./docs/DEPLOY.md) - Guia completo de deploy

## 🎯 Roadmap

- [x] Smart contracts básicos (AMM, Staking, Oracle)
- [x] Frontend Next.js
- [ ] Testes completos (unit + integration)
- [ ] Deploy em testnet
- [ ] Audit de segurança
- [ ] Mainnet launch

## 🤝 Contribuindo

Este é um projeto de demonstração para o Arbitrum Open House NYC Buildathon.

## 📄 Licença

MIT License

## 🏆 Buildathon

Projeto criado para o **Arbitrum Open House NYC: Online Buildathon**
- Prêmios: $30,000 USD
- Foco: RWA (Real World Assets) trading na Arbitrum/Robinhood Chain

---

**Desenvolvido com ❤️ para democratizar o acesso a investimentos**
