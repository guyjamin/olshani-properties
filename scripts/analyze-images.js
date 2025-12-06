const fs = require('fs');
const path = require('path');

// Load properties data
const propertiesPath = path.join(__dirname, '..', 'data', 'properties.json');
const properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf8'));

// Get all unique images used
const imagesUsed = new Set();
const imagesByProject = {};

properties.forEach(property => {
    imagesUsed.add(property.image);

    if (!imagesByProject[property.projectName]) {
        imagesByProject[property.projectName] = new Set();
    }
    imagesByProject[property.projectName].add(property.image);
});

console.log('📊 Image Usage Analysis\n');
console.log('='.repeat(60));
console.log('\n📸 Total Unique Images Used:', imagesUsed.size);
console.log('\n📋 Images by Project:\n');

// Sort projects alphabetically
const sortedProjects = Object.keys(imagesByProject).sort();

sortedProjects.forEach(projectName => {
    const images = Array.from(imagesByProject[projectName]);
    console.log(`\n${projectName}:`);
    images.forEach(img => {
        const publicPath = path.join(__dirname, '..', 'public', img.replace('/', ''));
        const exists = fs.existsSync(publicPath);
        const status = exists ? '✅' : '❌';

        if (exists) {
            const stats = fs.statSync(publicPath);
            const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
            const sizeKB = (stats.size / 1024).toFixed(0);

            if (stats.size > 500 * 1024) {
                console.log(`  ${status} ${img} - ${sizeMB} MB (⚠️  NEEDS COMPRESSION)`);
            } else {
                console.log(`  ${status} ${img} - ${sizeKB} KB (✅ Optimized)`);
            }
        } else {
            console.log(`  ${status} ${img} - MISSING!`);
        }
    });
});

console.log('\n' + '='.repeat(60));
console.log('\n📊 Summary:\n');

// Check which images need compression
const publicDir = path.join(__dirname, '..', 'public');
const largeImages = [];
const optimizedImages = [];
const missingImages = [];

imagesUsed.forEach(img => {
    const filePath = path.join(publicDir, img.replace('/', ''));

    if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        if (stats.size > 500 * 1024) {
            largeImages.push({
                name: img,
                sizeMB: (stats.size / (1024 * 1024)).toFixed(2)
            });
        } else {
            optimizedImages.push({
                name: img,
                sizeKB: (stats.size / 1024).toFixed(0)
            });
        }
    } else {
        missingImages.push(img);
    }
});

console.log(`✅ Optimized Images: ${optimizedImages.length}`);
console.log(`⚠️  Large Images (need compression): ${largeImages.length}`);
console.log(`❌ Missing Images: ${missingImages.length}`);

if (largeImages.length > 0) {
    console.log('\n⚠️  Images that need compression:\n');
    largeImages.sort((a, b) => parseFloat(b.sizeMB) - parseFloat(a.sizeMB));
    largeImages.forEach(img => {
        console.log(`  • ${img.name} - ${img.sizeMB} MB`);
    });
}

if (missingImages.length > 0) {
    console.log('\n❌ Missing images:\n');
    missingImages.forEach(img => {
        console.log(`  • ${img}`);
    });
}

console.log('\n' + '='.repeat(60));
console.log('\n✨ Analysis complete!\n');
