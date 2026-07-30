@echo off
setlocal EnableExtensions
cd /d "%~dp0"
if not exist "logs" mkdir "logs"
set "LOG=%CD%\logs\startup.log"
echo.>>"%LOG%"
echo ===== AEDIS START %DATE% %TIME% =====>>"%LOG%"

if not exist ".env" (
  echo AEDIS has not been installed yet.
  echo Double-click install_AEDIS.bat first.
  pause
  exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -File "%CD%\scripts\ensure_docker.ps1"
if errorlevel 1 goto :fail

echo Starting AEDIS Global...
docker compose up -d >>"%LOG%" 2>&1
if errorlevel 1 goto :fail

powershell -NoProfile -ExecutionPolicy Bypass -File "%CD%\scripts\wait_for_url.ps1" -Url "http://localhost:3000/api/health" -TimeoutSeconds 240 >>"%LOG%" 2>&1
if errorlevel 1 goto :fail

echo AEDIS is ready at http://localhost:3000
echo Local login details: LOCAL_TEST_ACCOUNTS.txt
start "" "http://localhost:3000"
exit /b 0

:fail
echo AEDIS could not be started. Review %LOG%
pause
exit /b 1
