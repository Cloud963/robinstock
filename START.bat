@echo off
cd /d C:\Users\Erick\projects\robinstock\app
echo Instalando dependencias...
call pnpm install
echo.
echo Iniciando servidor...
echo Abra http://localhost:3000 no navegador
echo.
call pnpm dev
pause
