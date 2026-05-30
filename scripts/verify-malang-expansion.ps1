$ErrorActionPreference = "Stop"

$Root = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")
$Python = "C:\Users\Albert Saputra\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
$Port = 4173
$Slugs = @(
  "honam-gym",
  "strength-club-malang",
  "de-gym-platinum-malang",
  "the-gym-asifa-pro",
  "3c-gym-malang",
  "fitnessworks-black-lanners",
  "prestige-fitness-malang"
)

$Paths = @("/", "/gyms/")
foreach ($Slug in $Slugs) {
  $Paths += "/$Slug/"
  $Paths += "/gyms/$Slug/"
}

$Server = Start-Process `
  -FilePath $Python `
  -ArgumentList @("-m", "http.server", "$Port", "--bind", "127.0.0.1", "--directory", ".") `
  -WorkingDirectory $Root.Path `
  -WindowStyle Hidden `
  -PassThru

try {
  Start-Sleep -Seconds 2

  foreach ($Path in $Paths) {
    $Status = (Invoke-WebRequest -UseBasicParsing "http://127.0.0.1:$Port$Path").StatusCode
    Write-Output "$Path $Status"
  }

} finally {
  Stop-Process -Id $Server.Id -Force -ErrorAction SilentlyContinue
}
