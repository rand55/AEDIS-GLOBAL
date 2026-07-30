$ErrorActionPreference = "Stop"
$routes = @(
  "/", "/portal", "/world", "/cases", "/opportunities", "/reserve",
  "/training", "/resources", "/directory", "/ledger", "/login", "/signup", "/medical"
)
foreach ($route in $routes) {
  $url = "http://localhost:3000$route"
  $response = Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 20
  if ($response.StatusCode -ne 200) { throw "$route returned $($response.StatusCode)" }
  if ($response.Content.Length -lt 500) { throw "$route returned an unexpectedly small page" }
  Write-Host "OK $route"
}
