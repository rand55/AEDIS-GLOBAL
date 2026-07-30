@echo off
setlocal
cd /d "%~dp0"
if not exist "logs" mkdir "logs"
echo Collecting AEDIS diagnostics...
docker compose ps > "logs\docker-status.log" 2>&1
docker compose logs --no-color --tail=300 backend > "logs\backend.log" 2>&1
docker compose logs --no-color --tail=300 frontend > "logs\frontend.log" 2>&1
docker compose logs --no-color --tail=200 postgres > "logs\postgres.log" 2>&1
docker compose logs --no-color --tail=200 redis > "logs\redis.log" 2>&1
echo.
echo Diagnostic files were written to:
echo   %CD%\logs
echo.
echo The two most useful files for sign-in problems are:
echo   logs\backend.log
echo   logs\frontend.log
pause
