const fs = require('fs');
const axios = require('axios');
const path = require('path');

// Function to read and print file contents
function cat(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${filePath}:\n`, err);
      process.exit(1);
    }
    console.log(data);
  });
}

// Function to fetch and print URL contents
async function webCat(url) {
  try {
    let response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    console.error(`Error fetching ${url}:\n`, err);
    process.exit(1);
  }
}

// Get the input from command line arguments
const input = process.argv[2];

if (input) {
  if (input.startsWith('http://') || input.startsWith('https://')) {
    webCat(input);
  } else {
    cat(input);
  }
} else {
  console.error('Please provide a file path or URL as an argument.');
  process.exit(1);
}
