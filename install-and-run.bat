@echo off
echo ========================================
echo RobinStock - Installation and Setup
echo ========================================
echo.

echo [1/5] Installing frontend dependencies...
cd app
call pnpm install
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/5] Building Foundry contracts...
cd ..\contracts
call forge build
if %errorlevel% neq 0 (
    echo Error: Failed to build contracts
    pause
    exit /b 1
)

echo.
echo [3/5] Running contract tests...
call forge test
if %errorlevel% neq 0 (
    echo Warning: Some tests failed
)

echo.
echo [4/5] Setup complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Deploy contracts to testnet:
echo    cd contracts
echo    forge script script/Deploy.s.sol --rpc-url YOUR_RPC_URL --broadcast --private-key YOUR_PRIVATE_KEY
echo.
echo 2. Update contract addresses in app/src/config/contracts.ts
echo.
echo 3. Run the frontend:
echo    cd app
echo    pnpm dev
echo.
echo 4. Open http://localhost:3000 in your browser
echo ========================================
echo.
pause
