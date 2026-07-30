$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
$Template = Join-Path $Root ".env.example"
$Target = Join-Path $Root ".env"
$AccountsFile = Join-Path $Root "LOCAL_TEST_ACCOUNTS.txt"

function New-HexSecret([int]$Bytes) {
    $buffer = New-Object byte[] $Bytes
    $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    try { $rng.GetBytes($buffer) } finally { $rng.Dispose() }
    return -join ($buffer | ForEach-Object { $_.ToString("x2") })
}

function New-DemoPassword() {
    return "Aedis-" + (New-HexSecret 12) + "-9Z"
}

if (-not (Test-Path $Target)) {
    $content = Get-Content $Template -Raw
    $content = $content.Replace("CHANGE_ME_POSTGRES", (New-HexSecret 24))
    $content = $content.Replace("CHANGE_ME_REDIS", (New-HexSecret 24))
    $content = $content.Replace("CHANGE_ME_FLASK", (New-HexSecret 64))
    $content = $content.Replace("CHANGE_ME_AUDIT", (New-HexSecret 64))
    $content = $content.Replace("CHANGE_ME_BFF", (New-HexSecret 48))
    $content = $content.Replace("CHANGE_ME_ADMIN", (New-DemoPassword))
    $content = $content.Replace("CHANGE_ME_REVIEWER", (New-DemoPassword))
    $content = $content.Replace("CHANGE_ME_USER", (New-DemoPassword))
    [System.IO.File]::WriteAllText($Target, $content, (New-Object System.Text.UTF8Encoding($false)))
    Write-Host "Generated secure local-development secrets in .env."
} else {
    Write-Host ".env already exists; preserving current local secrets."
}

$values = @{}
Get-Content $Target | ForEach-Object {
    if ($_ -match '^([^#=]+)=(.*)$') { $values[$matches[1]] = $matches[2] }
}
$accountText = @"
AEDIS GLOBAL LOCAL TEST ACCOUNTS
================================

Open AEDIS at: http://localhost:3000

Registrant
  Email:    user@aedis.local
  Password: $($values['DEMO_USER_PASSWORD'])

Reviewer
  Email:    reviewer@aedis.local
  Password: $($values['DEMO_REVIEWER_PASSWORD'])

Administrator
  Email:    admin@aedis.local
  Password: $($values['DEMO_ADMIN_PASSWORD'])

These credentials are only for the isolated local demonstration.
Do not reuse these passwords and do not enter real sensitive data.
"@
[System.IO.File]::WriteAllText($AccountsFile, $accountText, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "Wrote local demonstration credentials to LOCAL_TEST_ACCOUNTS.txt."
