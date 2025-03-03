/**
 * Install Test Dependencies Script
 * 
 * This script installs the dependencies needed for the test-user-isolation.js script.
 * 
 * Usage:
 * node scripts/install-test-deps.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Installing dependencies for user data isolation tests...');

try {
  // Check if package.json exists
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.error('Error: package.json not found in the current directory.');
    process.exit(1);
  }

  // Install axios
  console.log('Installing axios...');
  execSync('npm install axios --save-dev', { stdio: 'inherit' });

  console.log('\nDependencies installed successfully!');
  console.log('\nYou can now run the test with:');
  console.log('node scripts/test-user-isolation.js');
} catch (error) {
  console.error('Error installing dependencies:', error.message);
  process.exit(1);
} 