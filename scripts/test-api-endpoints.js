const axios = require('axios');

// Configuration
const API_URL = 'http://localhost:3001';
const ENDPOINTS = [
  { path: '/', method: 'GET' },
  { path: '/api', method: 'GET' },
  { path: '/api/auth/register', method: 'POST', data: { name: 'Test User', email: 'test@example.com', password: 'password123' } },
  { path: '/api/auth/login', method: 'POST', data: { email: 'test@example.com', password: 'password123' } },
  { path: '/api/projects', method: 'GET' },
  { path: '/api/users', method: 'GET' }
];

// Console colors for better readability
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

async function testEndpoint(endpoint) {
  try {
    console.log(`${colors.cyan}Testing endpoint: ${API_URL}${endpoint.path} (${endpoint.method})${colors.reset}`);
    
    let response;
    if (endpoint.method === 'GET') {
      response = await axios.get(`${API_URL}${endpoint.path}`);
    } else if (endpoint.method === 'POST') {
      response = await axios.post(`${API_URL}${endpoint.path}`, endpoint.data);
    }
    
    console.log(`${colors.green}✓ Success: ${endpoint.path} - Status: ${response.status}${colors.reset}`);
    console.log(`Response data: ${JSON.stringify(response.data, null, 2)}\n`);
    
    return { 
      endpoint: endpoint.path, 
      method: endpoint.method,
      status: response.status, 
      success: true,
      data: response.data
    };
  } catch (error) {
    console.log(`${colors.red}✗ Error: ${endpoint.path} - Status: ${error.response?.status || 'Unknown'} - ${error.message}${colors.reset}`);
    
    if (error.response && error.response.data) {
      console.log(`Response data: ${JSON.stringify(error.response.data, null, 2)}\n`);
    }
    
    return { 
      endpoint: endpoint.path,
      method: endpoint.method,
      status: error.response?.status || 'Unknown', 
      success: false,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    };
  }
}

async function runTests() {
  console.log(`\n${colors.cyan}=== API Endpoint Test ====${colors.reset}\n`);
  
  const results = [];
  
  for (const endpoint of ENDPOINTS) {
    const result = await testEndpoint(endpoint);
    results.push(result);
  }
  
  console.log(`\n${colors.cyan}=== Test Summary ====${colors.reset}`);
  console.log(`Total endpoints tested: ${results.length}`);
  console.log(`Successful: ${results.filter(r => r.success).length}`);
  console.log(`Failed: ${results.filter(r => !r.success).length}`);
  
  // List all endpoints and their status
  console.log(`\n${colors.cyan}=== Endpoint Status ====${colors.reset}`);
  results.forEach(result => {
    const statusColor = result.success ? colors.green : colors.red;
    console.log(`${statusColor}${result.method} ${result.endpoint}: ${result.status}${colors.reset}`);
  });
}

runTests().catch(error => {
  console.error(`${colors.red}Test failed with error:${colors.reset}`, error);
}); 