/**
 * Task Assignment and Access Control Test Script
 * 
 * This script tests whether users can access and modify tasks based on their assignment status.
 * It verifies:
 * 1. Task creators can view and modify their created tasks
 * 2. Task assignees can view and update their assigned tasks
 * 3. Users who are neither creators nor assignees cannot access tasks
 */

const axios = require('axios');

// Configuration
const API_URL = process.env.API_URL || 'http://localhost:3001';
const API_PREFIX = '/api';

// Test users
const USERS = {
  creator: {
    email: 'jane@example.com',
    password: 'password123',
    name: 'Jane Doe'
  },
  assignee: {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User'
  },
  unrelated: {
    email: 'outsider@example.com',
    password: 'password123',
    name: 'Outsider User'
  }
};

// Store tokens and IDs
const testData = {
  tokens: {},
  userIds: {},
  projectId: null,
  taskId: null
};

/**
 * Login a user and get their token
 */
async function loginUser(email, password) {
  try {
    const response = await axios.post(`${API_URL}${API_PREFIX}/auth/login`, {
      email,
      password
    });
    
    if (response.data && response.data.token) {
      console.log(`✅ Successfully logged in as ${email}`);
      return response.data.token;
    } else {
      console.error(`❌ Failed to login as ${email}: No token received`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Failed to login as ${email}:`, error.response?.data?.message || error.message);
    return null;
  }
}

/**
 * Register a new user if they don't exist
 */
async function registerUser(userData) {
  try {
    const response = await axios.post(`${API_URL}${API_PREFIX}/auth/register`, userData);
    
    if (response.data && response.data.user) {
      console.log(`✅ Successfully registered user ${userData.email}`);
      return true;
    } else {
      console.error(`❌ Failed to register user ${userData.email}`);
      return false;
    }
  } catch (error) {
    // If user already exists, we can just proceed with login
    if (error.response?.status === 409) {
      console.log(`ℹ️ User ${userData.email} already exists, proceeding with login`);
      return true;
    }
    console.error(`❌ Failed to register user ${userData.email}:`, error.response?.data?.message || error.message);
    return false;
  }
}

/**
 * Get user ID from token
 */
async function getUserId(token) {
  try {
    const response = await axios.get(`${API_URL}${API_PREFIX}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.data && response.data.id) {
      return response.data.id;
    } else {
      console.error(`❌ Failed to get user ID: No ID received`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Failed to get user ID:`, error.response?.data?.message || error.message);
    return null;
  }
}

/**
 * Create a project
 */
async function createProject(token, projectData) {
  try {
    const response = await axios.post(`${API_URL}${API_PREFIX}/projects`, projectData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.data && response.data.id) {
      console.log(`✅ Successfully created project: ${projectData.name}`);
      return response.data.id;
    } else {
      console.error(`❌ Failed to create project: No ID received`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Failed to create project:`, error.response?.data?.message || error.message);
    return null;
  }
}

/**
 * Create a task in a project
 */
async function createTask(token, projectId, taskData) {
  try {
    const response = await axios.post(`${API_URL}${API_PREFIX}/projects/${projectId}/tasks`, taskData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.data && response.data.id) {
      console.log(`✅ Successfully created task: ${taskData.title}`);
      return response.data.id;
    } else {
      console.error(`❌ Failed to create task: No ID received`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Failed to create task:`, error.response?.data?.message || error.message);
    return null;
  }
}

/**
 * Get a task by ID
 */
async function getTaskById(token, projectId, taskId) {
  try {
    const response = await axios.get(`${API_URL}${API_PREFIX}/projects/${projectId}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.data) {
      console.log(`✅ Successfully retrieved task`);
      return response.data;
    } else {
      console.error(`❌ Failed to retrieve task: No data received`);
      return null;
    }
  } catch (error) {
    console.log(`ℹ️ Could not access task: ${error.response?.status} ${error.response?.data?.message || error.message}`);
    return { error: error.response?.status, message: error.response?.data?.message };
  }
}

/**
 * Update a task
 */
async function updateTask(token, projectId, taskId, taskData) {
  try {
    const response = await axios.put(`${API_URL}${API_PREFIX}/projects/${projectId}/tasks/${taskId}`, taskData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.data) {
      console.log(`✅ Successfully updated task`);
      return response.data;
    } else {
      console.error(`❌ Failed to update task: No data received`);
      return null;
    }
  } catch (error) {
    console.log(`ℹ️ Could not update task: ${error.response?.status} ${error.response?.data?.message || error.message}`);
    return { error: error.response?.status, message: error.response?.data?.message };
  }
}

/**
 * Delete a task
 */
async function deleteTask(token, projectId, taskId) {
  try {
    const response = await axios.delete(`${API_URL}${API_PREFIX}/projects/${projectId}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.status === 200 || response.status === 204) {
      console.log(`✅ Successfully deleted task`);
      return true;
    } else {
      console.error(`❌ Failed to delete task`);
      return false;
    }
  } catch (error) {
    console.log(`ℹ️ Could not delete task: ${error.response?.status} ${error.response?.data?.message || error.message}`);
    return { error: error.response?.status, message: error.response?.data?.message };
  }
}

/**
 * Run the task assignment test
 */
async function runTest() {
  console.log('🚀 Starting Task Assignment and Access Control Test');
  
  // Step 1: Register and login all test users
  for (const [role, userData] of Object.entries(USERS)) {
    await registerUser(userData);
    const token = await loginUser(userData.email, userData.password);
    if (token) {
      testData.tokens[role] = token;
      testData.userIds[role] = await getUserId(token);
    } else {
      console.error(`❌ Test failed: Could not login as ${role}`);
      return;
    }
  }
  
  // Step 2: Create a project as the creator
  const projectData = {
    name: 'Task Assignment Test Project',
    description: 'A project for testing task assignment',
    status: 'active',
    priority: 'medium',
    startDate: new Date(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  };
  
  testData.projectId = await createProject(testData.tokens.creator, projectData);
  if (!testData.projectId) {
    console.error('❌ Test failed: Could not create project');
    return;
  }
  
  // Step 3: Create a task and assign it to the assignee
  const taskData = {
    title: 'Assigned Task',
    description: 'A task for testing assignment access',
    status: 'todo',
    priority: 'medium',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    assigneeId: testData.userIds.assignee
  };
  
  testData.taskId = await createTask(testData.tokens.creator, testData.projectId, taskData);
  if (!testData.taskId) {
    console.error('❌ Test failed: Could not create task');
    return;
  }
  
  // Step 4: Test task viewing access
  console.log('\n📋 Testing Task Viewing Access:');
  
  // Creator should have access
  const creatorAccess = await getTaskById(testData.tokens.creator, testData.projectId, testData.taskId);
  if (creatorAccess && !creatorAccess.error) {
    console.log('✅ PASS: Task creator can view the task');
  } else {
    console.error('❌ FAIL: Task creator cannot view the task');
  }
  
  // Assignee should have access
  const assigneeAccess = await getTaskById(testData.tokens.assignee, testData.projectId, testData.taskId);
  if (assigneeAccess && !assigneeAccess.error) {
    console.log('✅ PASS: Task assignee can view the task');
  } else {
    console.error('❌ FAIL: Task assignee cannot view the task');
  }
  
  // Unrelated user should NOT have access
  const unrelatedAccess = await getTaskById(testData.tokens.unrelated, testData.projectId, testData.taskId);
  if (unrelatedAccess && unrelatedAccess.error === 403) {
    console.log('✅ PASS: Unrelated user cannot view the task (403 Forbidden)');
  } else {
    console.error('❌ FAIL: Unrelated user can view the task or received wrong error');
  }
  
  // Step 5: Test task updating access
  console.log('\n📋 Testing Task Updating Access:');
  
  // Creator should be able to update
  const creatorUpdate = await updateTask(testData.tokens.creator, testData.projectId, testData.taskId, {
    status: 'in_progress',
    description: 'Updated by creator'
  });
  
  if (creatorUpdate && !creatorUpdate.error) {
    console.log('✅ PASS: Task creator can update the task');
  } else {
    console.error('❌ FAIL: Task creator cannot update the task');
  }
  
  // Assignee should be able to update
  const assigneeUpdate = await updateTask(testData.tokens.assignee, testData.projectId, testData.taskId, {
    status: 'in_progress',
    description: 'Updated by assignee'
  });
  
  if (assigneeUpdate && !assigneeUpdate.error) {
    console.log('✅ PASS: Task assignee can update the task');
  } else {
    console.error('❌ FAIL: Task assignee cannot update the task');
  }
  
  // Unrelated user should NOT be able to update
  const unrelatedUpdate = await updateTask(testData.tokens.unrelated, testData.projectId, testData.taskId, {
    status: 'completed',
    description: 'Updated by unrelated user'
  });
  
  if (unrelatedUpdate && unrelatedUpdate.error === 403) {
    console.log('✅ PASS: Unrelated user cannot update the task (403 Forbidden)');
  } else {
    console.error('❌ FAIL: Unrelated user can update the task or received wrong error');
  }
  
  // Step 6: Test task deletion access
  console.log('\n📋 Testing Task Deletion Access:');
  
  // Assignee should NOT be able to delete (only creator should)
  const assigneeDelete = await deleteTask(testData.tokens.assignee, testData.projectId, testData.taskId);
  if (assigneeDelete && assigneeDelete.error === 403) {
    console.log('✅ PASS: Task assignee cannot delete the task (403 Forbidden)');
  } else {
    console.error('❌ FAIL: Task assignee can delete the task or received wrong error');
  }
  
  // Unrelated user should NOT be able to delete
  const unrelatedDelete = await deleteTask(testData.tokens.unrelated, testData.projectId, testData.taskId);
  if (unrelatedDelete && unrelatedDelete.error === 403) {
    console.log('✅ PASS: Unrelated user cannot delete the task (403 Forbidden)');
  } else {
    console.error('❌ FAIL: Unrelated user can delete the task or received wrong error');
  }
  
  // Creator should be able to delete
  const creatorDelete = await deleteTask(testData.tokens.creator, testData.projectId, testData.taskId);
  if (creatorDelete === true) {
    console.log('✅ PASS: Task creator can delete the task');
  } else {
    console.error('❌ FAIL: Task creator cannot delete the task');
  }
  
  console.log('\n🏁 Task Assignment and Access Control Test Completed');
}

// Run the test
runTest().catch(error => {
  console.error('❌ Test failed with an unexpected error:', error);
}); 