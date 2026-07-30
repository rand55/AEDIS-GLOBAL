@echo off
setlocal
cd /d "%~dp0"
echo WARNING: This deletes every AEDIS local database, Redis, and quarantine volume.
set /p CONFIRM=Type DELETE to continue: 
if /i not "%CONFIRM%"=="DELETE" exit /b 0
docker compose down -v
del /q .installed 2>nul
echo Local AEDIS data was deleted. Run install_AEDIS.bat to rebuild it.
pause
