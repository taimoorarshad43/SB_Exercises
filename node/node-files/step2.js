const fs = require('fs');
const process = require('process');
const axios = require('axios');


// Local file path reading

function cat(filepath){
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
  
const path = process.argv[2];
  
if (path.slice(0, 4) === 'http') {
    webCat(path);
} else {
    cat(path);
}