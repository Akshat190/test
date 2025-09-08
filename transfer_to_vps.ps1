# Transfer files to VPS - PowerShell Script
# Run this from your Windows machine

param(
    [Parameter(Mandatory=$true)]
    [string]$VpsIP,
    
    [Parameter(Mandatory=$false)]
    [string]$Username = "root"
)

Write-Host "=== Kapadia High School - File Transfer to VPS ===" -ForegroundColor Green

# Check if we're in the correct directory
if (!(Test-Path "manage.py")) {
    Write-Host "ERROR: Please run this script from your project directory (C:\Users\Admin\desktop\khs)" -ForegroundColor Red
    exit 1
}

Write-Host "Transferring files to VPS: $VpsIP" -ForegroundColor Yellow

# Files and directories to transfer
$FilesToTransfer = @(
    "manage.py",
    "kapadiaschool\",
    "khschool\",
    "templates\",
    "static\",
    "gallery\",
    "requirements.txt",
    "*.py",
    "*.txt",
    "*.md"
)

# Create a temporary directory with only necessary files
$TempDir = "C:\temp\khs_transfer"
if (Test-Path $TempDir) {
    Remove-Item $TempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $TempDir | Out-Null

Write-Host "Preparing files for transfer..." -ForegroundColor Yellow

# Copy necessary files to temp directory
$FilesToTransfer | ForEach-Object {
    $Source = Join-Path (Get-Location) $_
    if (Test-Path $Source) {
        $Destination = Join-Path $TempDir (Split-Path $_ -Leaf)
        if (Test-Path $Source -PathType Container) {
            Copy-Item $Source $TempDir -Recurse -Force
        } else {
            Copy-Item $Source $TempDir -Force
        }
        Write-Host "  ✓ Copied: $_" -ForegroundColor Green
    }
}

Write-Host "`nFiles prepared in: $TempDir" -ForegroundColor Green
Write-Host "Total size: $((Get-ChildItem $TempDir -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB) MB" -ForegroundColor Cyan

Write-Host "`n=== Transfer Options ===" -ForegroundColor Yellow
Write-Host "Choose your preferred method:"
Write-Host "1. SCP (if available)"
Write-Host "2. WinSCP (if installed)"
Write-Host "3. Manual upload instructions"

$choice = Read-Host "Enter your choice (1-3)"

switch ($choice) {
    "1" {
        Write-Host "`nAttempting SCP transfer..." -ForegroundColor Yellow
        try {
            $scpCmd = "scp -r `"$TempDir\*`" ${Username}@${VpsIP}:/home/deploy/khs/"
            Write-Host "Running: $scpCmd" -ForegroundColor Cyan
            Invoke-Expression $scpCmd
            Write-Host "✅ SCP transfer completed!" -ForegroundColor Green
        } catch {
            Write-Host "❌ SCP failed. Try option 2 or 3." -ForegroundColor Red
        }
    }
    
    "2" {
        Write-Host "`nLaunching WinSCP..." -ForegroundColor Yellow
        $winscpPath = Get-Command "WinSCP.exe" -ErrorAction SilentlyContinue
        if ($winscpPath) {
            $sessionUrl = "scp://${Username}@${VpsIP}"
            Start-Process "WinSCP.exe" -ArgumentList $sessionUrl
            Write-Host "WinSCP opened. Please:" -ForegroundColor Cyan
            Write-Host "1. Connect to your VPS" -ForegroundColor White
            Write-Host "2. Navigate to /home/deploy/khs/" -ForegroundColor White
            Write-Host "3. Upload all files from: $TempDir" -ForegroundColor White
        } else {
            Write-Host "WinSCP not found. Please install it or use option 3." -ForegroundColor Red
        }
    }
    
    "3" {
        Write-Host "`n=== Manual Upload Instructions ===" -ForegroundColor Yellow
        Write-Host "1. Use any FTP/SFTP client (FileZilla, WinSCP, etc.)" -ForegroundColor White
        Write-Host "2. Connect to your VPS:" -ForegroundColor White
        Write-Host "   Host: $VpsIP" -ForegroundColor Cyan
        Write-Host "   Username: $Username" -ForegroundColor Cyan
        Write-Host "   Protocol: SFTP (port 22)" -ForegroundColor Cyan
        Write-Host "3. Upload all files from:" -ForegroundColor White
        Write-Host "   $TempDir" -ForegroundColor Cyan
        Write-Host "4. Upload to VPS directory:" -ForegroundColor White
        Write-Host "   /home/deploy/khs/" -ForegroundColor Cyan
        Write-Host "5. Make sure all files are uploaded including subdirectories" -ForegroundColor Yellow
    }
}

Write-Host "`n=== Next Steps ===" -ForegroundColor Green
Write-Host "After file transfer is complete:" -ForegroundColor White
Write-Host "1. SSH into your VPS: ssh $Username@$VpsIP" -ForegroundColor Cyan
Write-Host "2. Edit the setup script: nano vps_setup.sh" -ForegroundColor Cyan
Write-Host "   - Change VPS_IP to: $VpsIP" -ForegroundColor Yellow
Write-Host "   - Change DOMAIN if you have one" -ForegroundColor Yellow
Write-Host "3. Make it executable: chmod +x vps_setup.sh" -ForegroundColor Cyan
Write-Host "4. Run the setup: ./vps_setup.sh" -ForegroundColor Cyan

Write-Host "`n✅ File preparation completed!" -ForegroundColor Green
Write-Host "Temporary files location: $TempDir" -ForegroundColor Cyan
Write-Host "You can delete this folder after successful upload." -ForegroundColor Gray
