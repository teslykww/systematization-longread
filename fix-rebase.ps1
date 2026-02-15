$f = $args[1]
$lines = Get-Content $f
$lines[0] = $lines[0] -replace '^pick ', 'reword '
$lines | Set-Content $f
