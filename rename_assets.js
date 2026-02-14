const fs = require('fs');
const path = require('path');

const photosDir = path.join(__dirname, 'photos');
const files = fs.readdirSync(photosDir);

const photos = [];

files.forEach(file => {
    if (file.startsWith('.')) return; // Ignore hidden files

    // Match "1-Fate begins..." or similar
    const match = file.match(/^(\d+)[-_\.]+(.*)\.(png|jpg|jpeg|gif)$/i);
    
    if (match) {
        const number = parseInt(match[1], 10);
        let caption = match[2].replace(/[._-]/g, ' ').trim();
        const ext = match[3];
        const newFilename = `page-${number}.${ext}`;
        
        // Renaissance: clean up caption slightly more
        // e.g. "Fate begins its story together" -> "Fate begins its story together"
        // "ilk tanışma" -> "İlk tanışma"
        
        fs.renameSync(path.join(photosDir, file), path.join(photosDir, newFilename));
        
        photos.push({
            number: number,
            caption: caption,
            filename: newFilename
        });
    } else {
        console.log(`Skipping file: ${file}`);
    }
});

// Sort by number
photos.sort((a, b) => a.number - b.number);

fs.writeFileSync(path.join(__dirname, 'photos.json'), JSON.stringify(photos, null, 2));
console.log('Renaming complete. photos.json created.');
