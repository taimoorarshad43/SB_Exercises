const fs = require('fs');
const axios = require('axios');
const process = require('process');


// Local file path reading
function cat(filepath) {
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        console.log('File contents:\n', data);
    });
}

// Web URL reading
async function webCat(url) {
    try {
        let resp = await axios.get(url);
        console.log(resp.data);
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

// Write local file contents to another file
function catWrite(outputFile, filepath) {
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        fs.writeFile(outputFile, data, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log(`Content written to ${outputFile}`);
        });
    });
}

// Write URL contents to another file
async function webCatWrite(outputFile, url) {
    try {
        let resp = await axios.get(url);
        fs.writeFile(outputFile, resp.data, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log(`Content written to ${outputFile}`);
        });
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

const args = process.argv.slice(2);

if (args.length < 1) {
    console.error('Usage: node script.js [--out outputFile] <file|URL>');
    process.exit(1);
}

let outputFile = null;
let input = args[0];

if (args[0] === '--out' && args.length >= 3) {
    outputFile = args[1];
    input = args[2];
}

if (input.startsWith('http')) {
    outputFile ? webCatWrite(outputFile, input) : webCat(input);
} else {
    outputFile ? catWrite(outputFile, input) : cat(input);
}
