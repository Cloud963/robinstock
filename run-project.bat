@echo off
echo ========================================
echo RobinStock - Instalacao e Execucao
echo ========================================
echo.

cd /d C:\Users\Erick\projects\robinstock

echo [1/6] Verificando Node.js e pnpm...
node --version
if errorlevel 1 (
    echo ERRO: Node.js nao encontrado!
    pause
    exit /b 1
)

pnpm --version
if errorlevel 1 (
    echo ERRO: pnpm nao encontrado! Instalando...
    npm install -g pnpm
)

echo.
echo [2/6] Verificando Foundry...
forge --version
if errorlevel 1 (
    echo AVISO: Foundry nao encontrado. Pulando compilacao de contratos.
    set SKIP_FORGE=1
) else (
    set SKIP_FORGE=0
)

echo.
echo [3/6] Instalando dependencias do frontend...
cd app
pnpm install
if errorlevel 1 (
    echo ERRO: Falha ao instalar dependencias!
    pause
    exit /b 1
)

echo.
if "%SKIP_FORGE%"=="0" (
    echo [4/6] Compilando smart contracts...
    cd ..\contracts
    forge build
    if errorlevel 1 (
        echo AVISO: Falha ao compilar contratos. Continuando...
    )
    cd ..\app
) else (
    echo [4/6] Pulando compilacao de contratos (Foundry nao instalado)
)

echo.
echo [5/6] Criando arquivo .env.local...
if not exist .env.local (
    echo NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here > .env.local
    echo NEXT_PUBLIC_ENABLE_TESTNETS=true >> .env.local
    echo Arquivo .env.local criado. Configure seu WalletConnect Project ID!
)

echo.
echo [6/6] Iniciando servidor de desenvolvimento...
echo.
echo ========================================
echo Projeto rodando em: http://localhost:3000
echo Pressione Ctrl+C para parar o servidor
echo ========================================
echo.

pnpm dev
