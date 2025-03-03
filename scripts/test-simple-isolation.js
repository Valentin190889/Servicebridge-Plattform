const axios = require('axios');

// Configuration
const API_URL = 'http://localhost:3001';
const API_PREFIX = '/api';

// Test users
const USER1 = { email: 'test@example.com', password: 'password123' };
const USER2 = { email: 'jane@example.com', password: 'password123' };

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

async function loginUser(email, password) {
  try {
    console.log(`Logging in as ${email}...`);
    const response = await axios.post(`${API_URL}${API_PREFIX}/auth/login`, { email, password });
    console.log(`${colors.green}✓ Login successful${colors.reset}`);
    return response.data.token;
  } catch (error) {
    console.error(`${colors.red}✗ Login failed: ${error.message}${colors.reset}`);
    throw error;
  }
}

async function getProjects(token) {
  try {
    console.log('Fetching projects...');
    const response = await axios.get(
      `${API_URL}${API_PREFIX}/projects`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(`${colors.green}✓ Found ${response.data.length} projects${colors.reset}`);
    return response.data;
  } catch (error) {
    console.error(`${colors.red}✗ Failed to fetch projects: ${error.message}${colors.reset}`);
    throw error;
  }
}

async function getProjectById(token, projectId) {
  try {
    console.log(`Attempting to access project ${projectId}...`);
    const response = await axios.get(
      `${API_URL}${API_PREFIX}/projects/${projectId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(`${colors.green}✓ Successfully accessed project${colors.reset}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(`${colors.red}✗ Failed to access project: ${error.response?.status} - ${error.response?.data?.message || error.message}${colors.reset}`);
    return { 
      success: false, 
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    };
  }
}

async function createProject(token, projectData) {
  try {
    console.log('Creating a test project...');
    const response = await axios.post(
      `${API_URL}${API_PREFIX}/projects`,
      projectData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(`${colors.green}✓ Created project: ${projectData.name}${colors.reset}`);
    return response.data;
  } catch (error) {
    console.error(`${colors.red}✗ Failed to create project: ${error.message}${colors.reset}`);
    throw error;
  }
}

async function runTest() {
  console.log(`\n${colors.cyan}=== Simple User Data Isolation Test ====${colors.reset}\n`);
  
  try {
    // Login as User 1
    const token1 = await loginUser(USER1.email, USER1.password);
    
    // Get User 1's projects
    let user1Projects = await getProjects(token1);
    
    // Create a project for User 1 if they don't have any
    if (user1Projects.length === 0) {
      console.log(`${colors.yellow}! User 1 has no projects. Creating a test project...${colors.reset}`);
      const newProject = await createProject(token1, {
        name: 'Test Project for User 1',
        description: 'This is a test project for testing user data isolation',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active'
      });
      
      // Fetch projects again to get the newly created project
      user1Projects = await getProjects(token1);
    }
    
    if (user1Projects.length === 0) {
      console.log(`${colors.red}! Still no projects for User 1. Cannot test isolation.${colors.reset}`);
      return;
    }
    
    // Login as User 2
    const token2 = await loginUser(USER2.email, USER2.password);
    
    // Get User 2's projects
    const user2Projects = await getProjects(token2);
    
    console.log(`\n${colors.cyan}=== Testing Access Controls ====${colors.reset}\n`);
    
    // Try to access User 1's project as User 2
    const projectId = user1Projects[0].id;
    console.log(`Testing if User 2 can access User 1's project (ID: ${projectId})...`);
    
    const result = await getProjectById(token2, projectId);
    
    if (result.success) {
      console.log(`${colors.red}✗ FAIL: User 2 was able to access User 1's project!${colors.reset}`);
      console.log(`This indicates a problem with user data isolation.`);
    } else if (result.status === 403) {
      console.log(`${colors.green}✓ PASS: User 2 correctly denied access to User 1's project${colors.reset}`);
      console.log(`Response: ${result.status} - ${result.message}`);
    } else {
      console.log(`${colors.yellow}! INCONCLUSIVE: Got error ${result.status} instead of 403 Forbidden${colors.reset}`);
      console.log(`Message: ${result.message}`);
    }
    
  } catch (error) {
    console.error(`${colors.red}Test failed with error:${colors.reset}`, error);
  }
}

// Run the test
runTest(); 