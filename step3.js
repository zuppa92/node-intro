const fs = require('fs');
const axios = require('axios');
const path = require('path');

// Function to handle reading from a file
function readFile(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${filePath}:\n`, err);
      process.exit(1);
    }
    callback(data);
  });
}

// Function to handle fetching data from a URL
async function fetchURL(url, callback) {
  try {
    let response = await axios.get(url);
    callback(response.data);
  } catch (err) {
    console.error(`Error fetching ${url}:\n`, err);
    process.exit(1);
  }
}

// Function to handle output to console or write to file
function handleOutput(data, outPath) {
  if (outPath) {
    fs.writeFile(outPath, data, 'utf8', err => {
      if (err) {
        console.error(`Couldn't write ${outPath}:\n`, err);
        process.exit(1);
      }
    });
  } else {
    console.log(data);
  }
}

// Function to read from a file and handle output
function cat(filePath, outPath) {
  readFile(filePath, data => handleOutput(data, outPath));
}

// Function to fetch data from a URL and handle output
function webCat(url, outPath) {
  fetchURL(url, data => handleOutput(data, outPath));
}

// Get command line arguments
const args = process.argv.slice(2);
let outPath = null;
let inputPaths = [];

// Check if --out flag is present
if (args[0] === '--out') {
  outPath = args[1];
  inputPaths = args.slice(2);
} else {
  inputPaths = args;
}

// Process each input path
for (const inputPath of inputPaths) {
  if (inputPath.startsWith('http://') || inputPath.startsWith('https://')) {
    webCat(inputPath, outPath);
  } else {
    cat(inputPath, outPath);
  }
}
