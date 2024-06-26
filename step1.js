const fs = require('fs');
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

// Get the file path from command line arguments
const filePath = process.argv[2];

if (filePath) {
  cat(filePath);
} else {
  console.error('Please provide a file path as an argument.');
  process.exit(1);
}
