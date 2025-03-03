/**
 * ServiceBridge Platform - User Data Isolation Test Runner
 * 
 * This script runs all user data isolation tests sequentially and reports results.
 */

const { spawn } = require('child_process');
const path = require('path');

// Configuration
const TEST_SCRIPTS = [
  'test-user-isolation.js',
  'test-team-access.js',
  'test-task-assignment.js'
];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Test results tracking
const results = {
  total: TEST_SCRIPTS.length,
  passed: 0,
  failed: 0,
  skipped: 0
};

/**
 * Run a single test script and return a promise that resolves when the test completes
 */
function runTest(scriptName) {
  return new Promise((resolve, reject) => {
    console.log(`\n${colors.bright}${colors.blue}=======================================${colors.reset}`);
    console.log(`${colors.bright}${colors.blue}Running test: ${scriptName}${colors.reset}`);
    console.log(`${colors.bright}${colors.blue}=======================================${colors.reset}\n`);
    
    const scriptPath = path.join(__dirname, scriptName);
    const child = spawn('node', [scriptPath], { stdio: 'inherit' });
    
    child.on('close', (code) => {
      if (code === 0) {
        console.log(`\n${colors.green}✅ Test ${scriptName} passed${colors.reset}`);
        results.passed++;
        resolve(true);
      } else {
        console.log(`\n${colors.red}❌ Test ${scriptName} failed with code ${code}${colors.reset}`);
        results.failed++;
        resolve(false); // We resolve instead of reject to continue with other tests
      }
    });
    
    child.on('error', (err) => {
      console.error(`\n${colors.red}❌ Failed to start test ${scriptName}: ${err.message}${colors.reset}`);
      results.failed++;
      resolve(false); // We resolve instead of reject to continue with other tests
    });
  });
}

/**
 * Run all tests sequentially
 */
async function runAllTests() {
  console.log(`\n${colors.bright}${colors.magenta}==================================================${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}ServiceBridge Platform - User Data Isolation Tests${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}==================================================${colors.reset}\n`);
  
  console.log(`${colors.cyan}Starting test run with ${TEST_SCRIPTS.length} tests${colors.reset}`);
  
  const startTime = Date.now();
  
  for (const script of TEST_SCRIPTS) {
    await runTest(script);
  }
  
  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000; // Convert to seconds
  
  // Print summary
  console.log(`\n${colors.bright}${colors.magenta}==================================================${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}Test Run Summary${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}==================================================${colors.reset}\n`);
  
  console.log(`${colors.cyan}Total tests:    ${results.total}${colors.reset}`);
  console.log(`${colors.green}Passed:         ${results.passed}${colors.reset}`);
  console.log(`${colors.red}Failed:         ${results.failed}${colors.reset}`);
  console.log(`${colors.yellow}Skipped:        ${results.skipped}${colors.reset}`);
  console.log(`${colors.cyan}Duration:       ${duration.toFixed(2)} seconds${colors.reset}`);
  
  console.log(`\n${colors.bright}${results.failed === 0 ? colors.green : colors.red}Test run ${results.failed === 0 ? 'PASSED' : 'FAILED'}${colors.reset}`);
  
  // Exit with appropriate code
  process.exit(results.failed === 0 ? 0 : 1);
}

// Run the tests
runAllTests().catch(err => {
  console.error(`${colors.red}Error running tests: ${err.message}${colors.reset}`);
  process.exit(1);
}); 