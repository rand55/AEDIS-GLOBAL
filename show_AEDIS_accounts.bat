@echo off
setlocal
cd /d "%~dp0"
if not exist "LOCAL_TEST_ACCOUNTS.txt" (
  echo Local accounts have not been generated yet.
  echo Run install AEDIS.bat first.
  pause
  exit /b 1
)
start "" notepad.exe "%CD%\LOCAL_TEST_ACCOUNTS.txt"
