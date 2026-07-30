param([int]$TimeoutSeconds = 180)
$ErrorActionPreference = "SilentlyContinue"

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "Docker Desktop is not installed or Docker is not on PATH." -ForegroundColor Red
    Write-Host "Install Docker Desktop for Windows, restart Windows if requested, then run this installer again."
    Start-Process "https://www.docker.com/products/docker-desktop/"
    exit 2
}

& docker info *> $null
if ($LASTEXITCODE -eq 0) { exit 0 }

$possible = @(
    "$Env:ProgramFiles\Docker\Docker\Docker Desktop.exe",
    "$Env:LOCALAPPDATA\Docker\Docker Desktop.exe"
)
foreach ($candidate in $possible) {
    if (Test-Path $candidate) {
        Write-Host "Starting Docker Desktop..."
        Start-Process $candidate
        break
    }
}

$deadline = (Get-Date).AddSeconds($TimeoutSeconds)
do {
    Start-Sleep -Seconds 3
    & docker info *> $null
    if ($LASTEXITCODE -eq 0) { Write-Host "Docker Desktop is ready."; exit 0 }
    Write-Host -NoNewline "."
} while ((Get-Date) -lt $deadline)

Write-Host "`nDocker Desktop did not become ready." -ForegroundColor Red
exit 3
