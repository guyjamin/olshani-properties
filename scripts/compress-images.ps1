# Image Compression Script for Olshani Properties
# This script compresses large images in the public folder

Write-Host "Image Compression Tool" -ForegroundColor Cyan
Write-Host ("=" * 60)
Write-Host ""

$publicDir = Join-Path $PSScriptRoot "..\public"
$backupDir = Join-Path $publicDir "originals"

# Create backup directory
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    Write-Host "Created backup directory: public\originals" -ForegroundColor Green
}

# List of large images to compress
$largeImages = @(
    "Projects_Astra_Bay.jpg",
    "Projects_Misty.jpg",
    "Projects_Diplomat.jpg",
    "Gaia-02.jpg",
    "Gaia-01.jpg",
    "Gaia-03.jpg",
    "Projects_Marblewest.jpg",
    "Projects_Emerald.jpg",
    "Projects_Hephe.jpg",
    "Projects_Amethyst.jpg",
    "Projects_Dolce.jpg",
    "Projects_1050.jpg",
    "Projects_Himalaya.jpg"
)

$totalOriginalSize = 0
$filesFound = 0
$imageList = @()

Write-Host "Scanning for large images..." -ForegroundColor Yellow
Write-Host ""

foreach ($filename in $largeImages) {
    $filePath = Join-Path $publicDir $filename
    
    if (Test-Path $filePath) {
        $fileInfo = Get-Item $filePath
        $sizeMB = [math]::Round($fileInfo.Length / 1MB, 2)
        $totalOriginalSize += $sizeMB
        $filesFound++
        
        # Backup original if not already backed up
        $backupPath = Join-Path $backupDir $filename
        if (-not (Test-Path $backupPath)) {
            Copy-Item $filePath $backupPath -Force
            Write-Host "  Backed up: $filename ($sizeMB MB)" -ForegroundColor Green
        }
        else {
            Write-Host "  Already backed up: $filename ($sizeMB MB)" -ForegroundColor Gray
        }
        
        $imageList += [PSCustomObject]@{
            Filename = $filename
            SizeMB   = $sizeMB
            Path     = $filePath
        }
    }
}

Write-Host ""
Write-Host ("=" * 60)
Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  Files found: $filesFound" -ForegroundColor White
Write-Host "  Total size: $([math]::Round($totalOriginalSize, 2)) MB" -ForegroundColor White
Write-Host "  Target size: $([math]::Round($filesFound * 0.5, 2)) MB (500KB per image)" -ForegroundColor White
Write-Host "  Potential savings: $([math]::Round($totalOriginalSize - ($filesFound * 0.5), 2)) MB" -ForegroundColor Green
Write-Host ""

# Display list of images to compress
Write-Host "Images to compress:" -ForegroundColor Yellow
Write-Host ""
foreach ($img in $imageList | Sort-Object -Property SizeMB -Descending) {
    Write-Host "  - $($img.Filename) - $($img.SizeMB) MB" -ForegroundColor White
}

Write-Host ""
Write-Host ("=" * 60)
Write-Host ""
Write-Host "Compression Options:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Option 1: Online Tools (Recommended)" -ForegroundColor Yellow
Write-Host "    - TinyPNG: https://tinypng.com" -ForegroundColor White
Write-Host "    - Squoosh: https://squoosh.app" -ForegroundColor White
Write-Host "    - CompressJPEG: https://compressjpeg.com" -ForegroundColor White
Write-Host ""
Write-Host "  Option 2: Desktop Tools" -ForegroundColor Yellow
Write-Host "    - FileOptimizer (Windows)" -ForegroundColor White
Write-Host "    - RIOT (Radical Image Optimization Tool)" -ForegroundColor White
Write-Host ""

Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Originals backed up to: public\originals\" -ForegroundColor Green
Write-Host "  2. Upload images to compression tool" -ForegroundColor White
Write-Host "  3. Compress to under 500KB each" -ForegroundColor White
Write-Host "  4. Download compressed versions" -ForegroundColor White
Write-Host "  5. Replace files in public\ folder" -ForegroundColor White
Write-Host "  6. Verify images still look good" -ForegroundColor White
Write-Host ""

Write-Host "Done! Happy compressing!" -ForegroundColor Green
Write-Host ""
