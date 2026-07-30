@echo off
setlocal
cd /d "%~dp0"
if not exist ".env" (
  echo Run install_AEDIS.bat first.
  pause
  exit /b 1
)
echo Checking service health...
powershell -NoProfile -ExecutionPolicy Bypass -File "%CD%\scripts\wait_for_url.ps1" -Url "http://localhost:3000/api/health" -TimeoutSeconds 60
if errorlevel 1 goto :fail
echo Checking integrated public pages...
powershell -NoProfile -ExecutionPolicy Bypass -File "%CD%\scripts\check_public_routes.ps1"
if errorlevel 1 goto :fail
echo Checking database migrations and Python imports...
docker compose exec -T backend python /app/tests/static_check.py
docker compose exec -T backend python manage.py migrate
if errorlevel 1 goto :fail
echo Running end-to-end authorization and integrity checks...
docker compose exec -T backend python /app/tests/smoke.py
if errorlevel 1 goto :fail
echo.
echo AEDIS local smoke checks passed.
pause
exit /b 0
:fail
echo AEDIS checks failed. Run docker compose logs --tail=200 for details.
pause
exit /b 1
