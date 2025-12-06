const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// List of large images that need compression
const largeImages = [
    'Projects_Astra_Bay.jpg',
    'Projects_Misty.jpg',
    'Projects_Diplomat.jpg',
    'Gaia-02.jpg',
    'Gaia-01.jpg',
    'Gaia-03.jpg',
    'Projects_Marblewest.jpg',
    'Projects_Emerald.jpg',
    'Projects_Hephe.jpg',
    'Projects_Amethyst.jpg',
    'Projects_Dolce.jpg',
    'Projects_1050.jpg',
    'Projects_Himalaya.jpg'
];

const publicDir = path.join(__dirname, 'public');
const backupDir = path.join(__dirname, 'public', 'originals');

// Create backup directory if it doesn't exist
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
    console.log('✅ Created backup directory: public/originals');
}

async function compressImage(filename) {
    const sourcePath = path.join(publicDir, filename);
    const backupPath = path.join(backupDir, filename);

    // Check if file exists
    if (!fs.existsSync(sourcePath)) {
        console.log(`⚠️  File not found: ${filename}`);
        return;
    }

    // Get original file size
    const originalStats = fs.statSync(sourcePath);
    const originalSizeMB = (originalStats.size / (1024 * 1024)).toFixed(2);

    console.log(`\n📸 Processing: ${filename}`);
    console.log(`   Original size: ${originalSizeMB} MB`);

    // Backup original file
    if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(sourcePath, backupPath);
        console.log(`   ✅ Backed up to: originals/${filename}`);
    }

    console.log(`   ℹ️  Please compress this file manually using:`);
    console.log(`      - TinyPNG.com (https://tinypng.com)`);
    console.log(`      - Squoosh.app (https://squoosh.app)`);
    console.log(`      - Or any image compression tool`);
    console.log(`   🎯 Target size: Under 500 KB`);
}

async function main() {
    console.log('🖼️  Image Compression Helper\n');
    console.log('This script will help you identify and compress large images.\n');
    console.log('='.repeat(60));

    let totalOriginalSize = 0;
    let filesProcessed = 0;

    for (const filename of largeImages) {
        const filePath = path.join(publicDir, filename);

        if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            const sizeMB = stats.size / (1024 * 1024);
            totalOriginalSize += sizeMB;
            filesProcessed++;

            await compressImage(filename);
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`\n📊 Summary:`);
    console.log(`   Files found: ${filesProcessed}`);
    console.log(`   Total original size: ${totalOriginalSize.toFixed(2)} MB`);
    console.log(`   Estimated compressed size: ~${(filesProcessed * 0.5).toFixed(2)} MB (if compressed to 500KB each)`);
    console.log(`   Potential savings: ~${(totalOriginalSize - (filesProcessed * 0.5)).toFixed(2)} MB`);

    console.log(`\n📝 Next Steps:`);
    console.log(`   1. Original files backed up to: public/originals/`);
    console.log(`   2. Visit https://tinypng.com or https://squoosh.app`);
    console.log(`   3. Upload and compress each image`);
    console.log(`   4. Download compressed versions`);
    console.log(`   5. Replace files in public/ folder`);
    console.log(`   6. Target: Under 500KB per image\n`);
}

main().catch(console.error);
