const fs = require('fs');
const path = require('process');


function cat(filepath){
fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File contents:\n', data);
});
}

cat(process.argv[2]);