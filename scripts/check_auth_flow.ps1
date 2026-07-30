param([string]$BaseUrl = "http://localhost:3000")
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
$EnvFile = Join-Path $Root ".env"
if (-not (Test-Path $EnvFile)) { throw ".env is missing" }

$values = @{}
Get-Content $EnvFile | ForEach-Object {
    if ($_ -match '^([^#=]+)=(.*)$') { $values[$matches[1]] = $matches[2] }
}
$password = $values['DEMO_USER_PASSWORD']
if (-not $password) { throw "DEMO_USER_PASSWORD is missing from .env" }

$webSession = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$csrf = Invoke-RestMethod -Method Get -Uri "$BaseUrl/api/aedis/v1/auth/csrf" -WebSession $webSession -TimeoutSec 20
if (-not $csrf.csrfToken) { throw "CSRF endpoint did not return a token" }

$headers = @{
    'X-CSRFToken' = [string]$csrf.csrfToken
    'Idempotency-Key' = [guid]::NewGuid().ToString()
    'X-Request-ID' = [guid]::NewGuid().ToString()
}
$body = @{ email = 'user@aedis.local'; password = $password } | ConvertTo-Json -Compress
$login = Invoke-RestMethod -Method Post -Uri "$BaseUrl/api/aedis/v1/auth/login" -WebSession $webSession -Headers $headers -ContentType 'application/json' -Body $body -TimeoutSec 30
if ($login.account.role -ne 'registrant') { throw "Login did not return the registrant account" }

$me = Invoke-RestMethod -Method Get -Uri "$BaseUrl/api/aedis/v1/auth/me" -WebSession $webSession -Headers @{ 'X-Request-ID' = [guid]::NewGuid().ToString() } -TimeoutSec 20
if (-not $me.authenticated -or $me.account.email -ne 'user@aedis.local') { throw "Authenticated session did not persist" }

Write-Host "AEDIS authentication flow passed."
exit 0
