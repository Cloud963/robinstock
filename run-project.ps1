Write-Host "========================================" -ForegroundColor Cyan
Write-Host "RobinStock - Instalacao e Execucao" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location "C:\Users\Erick\projects\robinstock"

Write-Host "[1/6] Verificando Node.js e pnpm..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERRO: Node.js nao encontrado!" -ForegroundColor Red
    exit 1
}

try {
    $pnpmVersion = pnpm --version
    Write-Host "pnpm: $pnpmVersion" -ForegroundColor Green
} catch {
    Write-Host "Instalando pnpm..." -ForegroundColor Yellow
    npm install -g pnpm
}

Write-Host ""
Write-Host "[2/6] Verificando Foundry..." -ForegroundColor Yellow
try {
    $forgeVersion = forge --version
    Write-Host "Foundry instalado" -ForegroundColor Green
    $skipForge = $false
} catch {
    Write-Host "AVISO: Foundry nao encontrado. Pulando compilacao." -ForegroundColor Yellow
    $skipForge = $true
}

Write-Host ""
Write-Host "[3/6] Instalando dependencias do frontend..." -ForegroundColor Yellow
Set-Location "app"
pnpm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Falha ao instalar dependencias!" -ForegroundColor Red
    exit 1
}
Write-Host "Dependencias instaladas com sucesso!" -ForegroundColor Green

Write-Host ""
if (-not $skipForge) {
    Write-Host "[4/6] Compilando smart contracts..." -ForegroundColor Yellow
    Set-Location "..\contracts"
    forge build
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Contratos compilados com sucesso!" -ForegroundColor Green
    } else {
        Write-Host "AVISO: Falha ao compilar contratos." -ForegroundColor Yellow
    }
    Set-Location "..\app"
} else {
    Write-Host "[4/6] Pulando compilacao (Foundry nao instalado)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[5/6] Verificando .env.local..." -ForegroundColor Yellow
if (-not (Test-Path ".env.local")) {
    @"
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_ENABLE_TESTNETS=true
"@ | Out-File -FilePath ".env.local" -Encoding utf8
    Write-Host "Arquivo .env.local criado!" -ForegroundColor Green
    Write-Host "IMPORTANTE: Configure seu WalletConnect Project ID em .env.local" -ForegroundColor Yellow
} else {
    Write-Host ".env.local ja existe" -ForegroundColor Green
}

Write-Host ""
Write-Host "[6/6] Iniciando servidor de desenvolvimento..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Projeto rodando em: http://localhost:3000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para parar o servidor" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

pnpm dev
