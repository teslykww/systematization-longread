$path = $args[1]
$current = [System.IO.File]::ReadAllText($path)
if ($current -match "test: trigger") { exit 0 }
$msg = "Landing: система управления бизнесом, CTA в Telegram, единое окно PDF"
[System.IO.File]::WriteAllText($path, $msg, [System.Text.Encoding]::UTF8)
