param(
    [Parameter(Mandatory=$true)][string]$Url,
    [int]$TimeoutSeconds = 240
)
$ErrorActionPreference = "SilentlyContinue"
$deadline = (Get-Date).AddSeconds($TimeoutSeconds)
do {
    try {
        $response = Invoke-WebRequest -UseBasicParsing -Uri $Url -TimeoutSec 5
        if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 300) {
            Write-Host "AEDIS health check passed."
            exit 0
        }
    } catch {}
    Start-Sleep -Seconds 3
    Write-Host -NoNewline "."
} while ((Get-Date) -lt $deadline)
Write-Host "`nTimed out waiting for $Url" -ForegroundColor Red
exit 1
