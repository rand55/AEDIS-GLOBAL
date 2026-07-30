@echo off
setlocal
cd /d "%~dp0"
echo Stopping AEDIS Global...
docker compose stop
if errorlevel 1 (
  echo Unable to stop AEDIS. Confirm Docker Desktop is running.
  pause
  exit /b 1
)
echo AEDIS has stopped. Local data remains available for the next start.
pause
