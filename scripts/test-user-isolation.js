/**
 * User Data Isolation Test Script
 * 
 * This script tests whether the user data isolation implementation is working correctly
 * by creating multiple users and verifying they can only access their own data.
 * 
 * Usage:
 * node scripts/test-user-isolation.js
 */

const axios = require('axios');

// Configuration
const API_URL = 'http://localhost:3001'; // Make sure this matches your server port
const API_PREFIX = '/api'; // Add the API prefix
const TEST_USERS = [
  {
    name: 'Test User 1',
    email: 'testuser1@example.com',
    password: 'password123'
  },
  {
    name: 'Test User 2',
    email: 'testuser2@example.com',
    password: 'password123'
  }
];

// Store tokens and created resources
const tokens = [];
const resources = {
  projects: [],
  tasks: []
};

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

/**
 * Register a new user
 */
async function registerUser(userData) {
  try {
    const response = await axios.post(`${API_URL}${API_PREFIX}/auth/register`, userData);
    console.log(`${colors.green}✓${colors.reset} Registered user: ${userData.email}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      console.log(`${colors.yellow}!${colors.reset} User already exists: ${userData.email}`);
      return { message: 'User already exists' };
    }
    console.error(`${colors.red}✗${colors.reset} Failed to register user: ${userData.email}`, error.message);
    throw error;
  }
}

/**
 * Login a user and get auth token
 */
async function loginUser(email, password) {
  try {
    const response = await axios.post(`${API_URL}${API_PREFIX}/auth/login`, { email, password });
    console.log(`${colors.green}✓${colors.reset} Logged in as: ${email}`);
    return response.data.token;
  } catch (error) {
    console.error(`${colors.red}✗${colors.reset} Failed to login as: ${email}`, error.message);
    throw error;
  }
}

/**
 * Create a project
 */
async function createProject(token, projectData) {
  try {
    const response = await axios.post(
      `${API_URL}${API_PREFIX}/projects`,
      projectData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(`${colors.green}✓${colors.reset} Created project: ${projectData.name}`);
    return response.data;
  } catch (error) {
    console.error(`${colors.red}✗${colors.reset} Failed to create project: ${projectData.name}`, error.message);
    throw error;
  }
}

/**
 * Create a task
 */
async function createTask(token, projectId, taskData) {
  try {
    // Add the projectId to the task data
    const taskWithProject = {
      ...taskData,
      projectId
    };
    
    const response = await axios.post(
      `${API_URL}${API_PREFIX}/tasks`,
      taskWithProject,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(`${colors.green}✓${colors.reset} Created task: ${taskData.title}`);
    return response.data;
  } catch (error) {
    console.error(`${colors.red}✗${colors.reset} Failed to create task: ${taskData.title}`, error.message);
    throw error;
  }
}

/**
 * Get all projects for a user
 */
async function getProjects(token) {
  try {
    const response = await axios.get(
      `${API_URL}${API_PREFIX}/projects`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error(`${colors.red}✗${colors.reset} Failed to get projects`, error.message);
    throw error;
  }
}

/**
 * Try to access a specific project
 */
async function getProjectById(token, projectId) {
  try {
    const response = await axios.get(
      `${API_URL}${API_PREFIX}/projects/${projectId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error) {
    return {
      success: false,
      error: error.response ? error.response.data : error.message,
      status: error.response ? error.response.status : 500
    };
  }
}

/**
 * Try to access a specific task
 */
async function getTaskById(token, projectId, taskId) {
  try {
    const response = await axios.get(
      `${API_URL}${API_PREFIX}/tasks/${taskId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error) {
    return {
      success: false,
      error: error.response ? error.response.data : error.message,
      status: error.response ? error.response.status : 500
    };
  }
}

/**
 * Main test function
 */
async function runTest() {
  console.log(`\n${colors.cyan}=== ServiceBridge User Data Isolation Test ====${colors.reset}\n`);
  
  try {
    // Step 1: Register and login test users
    console.log(`${colors.cyan}=== Registering and Authenticating Users ====${colors.reset}`);
    
    for (let i = 0; i < TEST_USERS.length; i++) {
      const user = TEST_USERS[i];
      await registerUser(user);
      const token = await loginUser(user.email, user.password);
      tokens.push(token);
    }
    
    // Step 2: Create resources for each user
    console.log(`\n${colors.cyan}=== Creating Test Resources ====${colors.reset}`);
    
    // User 1 creates a project and task
    const project1 = await createProject(tokens[0], {
      name: 'User 1 Project',
      description: 'This is a test project for User 1',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    });
    resources.projects.push(project1);
    
    const task1 = await createTask(tokens[0], project1.id, {
      title: 'User 1 Task',
      description: 'This is a test task for User 1',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'medium',
      status: 'todo'
    });
    resources.tasks.push(task1);
    
    // User 2 creates a project and task
    const project2 = await createProject(tokens[1], {
      name: 'User 2 Project',
      description: 'This is a test project for User 2',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    });
    resources.projects.push(project2);
    
    const task2 = await createTask(tokens[1], project2.id, {
      title: 'User 2 Task',
      description: 'This is a test task for User 2',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'medium',
      status: 'todo'
    });
    resources.tasks.push(task2);
    
    // Step 3: Test access controls
    console.log(`\n${colors.cyan}=== Testing Access Controls ====${colors.reset}`);
    
    // Test if User 1 can access User 2's project
    console.log(`\nTesting if User 1 can access User 2's project (ID: ${project2.id})...`);
    const user1AccessProject2 = await getProjectById(tokens[0], project2.id);
    
    if (user1AccessProject2.success) {
      console.log(`${colors.red}✗ FAIL: User 1 was able to access User 2's project${colors.reset}`);
      console.log(`  Response: ${user1AccessProject2.status} - Project data returned`);
    } else {
      console.log(`${colors.green}✓ PASS: User 1 correctly denied access to User 2's project${colors.reset}`);
      console.log(`  Response: ${user1AccessProject2.status} - ${user1AccessProject2.error.message}`);
    }
    
    // Test if User 2 can access User 1's project
    console.log(`\nTesting if User 2 can access User 1's project (ID: ${project1.id})...`);
    const user2AccessProject1 = await getProjectById(tokens[1], project1.id);
    
    if (user2AccessProject1.success) {
      console.log(`${colors.red}✗ FAIL: User 2 was able to access User 1's project${colors.reset}`);
      console.log(`  Response: ${user2AccessProject1.status} - Project data returned`);
    } else {
      console.log(`${colors.green}✓ PASS: User 2 correctly denied access to User 1's project${colors.reset}`);
      console.log(`  Response: ${user2AccessProject1.status} - ${user2AccessProject1.error.message}`);
    }
    
    // Test if User 1 can access User 2's task
    console.log(`\nTesting if User 1 can access User 2's task (ID: ${task2.id})...`);
    const user1AccessTask2 = await getTaskById(tokens[0], project2.id, task2.id);
    
    if (user1AccessTask2.success) {
      console.log(`${colors.red}✗ FAIL: User 1 was able to access User 2's task${colors.reset}`);
      console.log(`  Response: ${user1AccessTask2.status} - Task data returned`);
    } else {
      console.log(`${colors.green}✓ PASS: User 1 correctly denied access to User 2's task${colors.reset}`);
      console.log(`  Response: ${user1AccessTask2.status} - ${user1AccessTask2.error.message}`);
    }
    
    // Summary
    console.log(`\n${colors.cyan}=== Test Summary ====${colors.reset}`);
    const allPassed = !user1AccessProject2.success && !user2AccessProject1.success && !user1AccessTask2.success;
    
    if (allPassed) {
      console.log(`${colors.green}All tests passed! User data isolation is working correctly.${colors.reset}`);
    } else {
      console.log(`${colors.red}Some tests failed. User data isolation may not be properly implemented.${colors.reset}`);
    }
    
  } catch (error) {
    console.error(`${colors.red}Test failed with error:${colors.reset}`, error);
  }
}

// Run the test
runTest(); 