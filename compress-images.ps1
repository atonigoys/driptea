$quality = 75
$images = @(
    @{src="hero-bg.jpg"; width=1920; height=1080},
    @{src="map.png"; width=1200; height=600},
    @{src="oreo.jpg"; width=800; height=800},
    @{src="okinawa.jpg"; width=800; height=800},
    @{src="nutella.jpg"; width=800; height=800},
    @{src="latte.jpg"; width=800; height=800},
    @{src="mousse.jpg"; width=800; height=800},
    @{src="menu-1.jpg"; width=800; height=800},
    @{src="menu-2.jpg"; width=800; height=800},
    @{src="menu-3.jpg"; width=800; height=800},
    @{src="menu-4.jpg"; width=800; height=800}
)

Add-Type -AssemblyName System.Drawing

foreach ($img in $images) {
    $srcPath = Join-Path $PWD $img.src
    $tempPath = Join-Path $PWD "temp_$($img.src)"
    
    if (Test-Path $srcPath) {
        Write-Host "Compressing $($img.src)..."
        
        $bitmap = [System.Drawing.Bitmap]::FromFile($srcPath)
        $newBitmap = New-Object System.Drawing.Bitmap($img.width, $img.height)
        $graphics = [System.Drawing.Graphics]::FromImage($newBitmap)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.DrawImage($bitmap, 0, 0, $img.width, $img.height)
        
        # Save with compression
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
            [System.Drawing.Imaging.Encoder]::Quality, $quality
        )
        
        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | 
            Where-Object { $_.MimeType -eq 'image/jpeg' } | Select-Object -First 1
        
        if ($img.src -like "*.jpg") {
            $newBitmap.Save($tempPath, $jpegCodec, $encoderParams)
        } else {
            # Convert PNG to JPG for better compression
            $newPath = $tempPath -replace '\.png$', '.jpg'
            $newBitmap.Save($newPath, $jpegCodec, $encoderParams)
        }
        
        $graphics.Dispose()
        $newBitmap.Dispose()
        $bitmap.Dispose()
        
        Write-Host "✓ Compressed $($img.src)"
    }
}

Write-Host "`nCompression complete!"
