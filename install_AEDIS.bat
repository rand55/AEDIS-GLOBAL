@echo off
setlocal EnableExtensions DisableDelayedExpansion
cd /d "%~dp0"
if not exist "logs" mkdir "logs"
set "LOG=%CD%\logs\install.log"
echo.>>"%LOG%"
echo ===== AEDIS INSTALL %DATE% %TIME% =====>>"%LOG%"

cls
echo ============================================================
echo                 AEDIS GLOBAL INSTALLER
echo ============================================================
echo.
echo This installer uses Docker Desktop to build an isolated local
echo environment. Node.js, Python, PostgreSQL, and Redis do not need
echo to be installed separately.
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%CD%\scripts\ensure_docker.ps1"
if errorlevel 1 goto :fail

docker compose version >>"%LOG%" 2>&1
if errorlevel 1 (
  echo Docker Compose is unavailable.
  goto :fail
)

powershell -NoProfile -ExecutionPolicy Bypass -File "%CD%\scripts\generate_env.ps1" >>"%LOG%" 2>&1
if errorlevel 1 goto :fail

echo [1/5] Pulling trusted base images...
docker compose pull postgres redis >>"%LOG%" 2>&1
if errorlevel 1 goto :fail

echo [2/5] Building AEDIS services...
docker compose build --pull >>"%LOG%" 2>&1
if errorlevel 1 goto :fail

echo [3/5] Starting PostgreSQL, Redis, API, and web portal...
docker compose up -d >>"%LOG%" 2>&1
if errorlevel 1 goto :fail

echo [4/5] Waiting for secure health checks...
powershell -NoProfile -ExecutionPolicy Bypass -File "%CD%\scripts\wait_for_url.ps1" -Url "http://localhost:3000/api/health" -TimeoutSeconds 300 >>"%LOG%" 2>&1
if errorlevel 1 goto :fail

echo [5/5] Verifying CSRF, sign-in, and server-side session persistence...
powershell -NoProfile -ExecutionPolicy Bypass -File "%CD%\scripts\check_auth_flow.ps1" >>"%LOG%" 2>&1
if errorlevel 1 goto :fail

echo installed>"%CD%\.installed"
cls
echo ============================================================
echo              AEDIS INSTALLED SUCCESSFULLY
echo ============================================================
echo.
echo Local address: http://localhost:3000
echo.
for /f "tokens=1,* delims==" %%A in ('findstr /b "DEMO_ADMIN_PASSWORD=" .env') do set "ADMIN_PASSWORD=%%B"
for /f "tokens=1,* delims==" %%A in ('findstr /b "DEMO_REVIEWER_PASSWORD=" .env') do set "REVIEWER_PASSWORD=%%B"
for /f "tokens=1,* delims==" %%A in ('findstr /b "DEMO_USER_PASSWORD=" .env') do set "USER_PASSWORD=%%B"
echo Demonstration accounts:
echo   Admin:    admin@aedis.local     / %ADMIN_PASSWORD%
echo   Reviewer: reviewer@aedis.local  / %REVIEWER_PASSWORD%
echo   User:     user@aedis.local      / %USER_PASSWORD%
echo.
echo These passwords are also stored in LOCAL_TEST_ACCOUNTS.txt and .env.
echo Do not use them for a public deployment or enter real sensitive data.
echo.
echo You can reopen them later with show_AEDIS_accounts.bat.
echo.
start "" "http://localhost:3000"
pause
exit /b 0

:fail
echo.
echo Installation did not complete. Review:
echo   %LOG%
echo.
echo The final log entries are shown below:
echo ------------------------------------------------------------
powershell -NoProfile -Command "Get-Content -LiteralPath '%LOG%' -Tail 25"
echo ------------------------------------------------------------
echo.
echo Keep the log file and share it when requesting help. It identifies
echo whether the failure occurred during Docker startup, image building,
echo database initialization, or the AEDIS health check.
echo.
pause
exit /b 1
