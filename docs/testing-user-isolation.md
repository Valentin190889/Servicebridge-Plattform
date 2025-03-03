# Testing User Data Isolation

This document provides instructions for testing the user data isolation implementation in the ServiceBridge platform.

## Prerequisites

Before running the tests, ensure that:

1. The ServiceBridge backend server is running on port 3000
2. The database is properly set up and migrations have been applied
3. The required test dependencies are installed

## Installing Test Dependencies

We've provided a script to install the necessary dependencies for running the tests:

```bash
node scripts/install-test-deps.js
```

This will install:
- axios: For making HTTP requests to the API
- chalk: For colorful console output

## Running the Test Script

To run the user data isolation test:

```bash
node scripts/test-user-isolation.js
```

## What the Test Does

The test script performs the following actions:

1. **User Registration and Authentication**
   - Registers two test users (if they don't already exist)
   - Logs in as each user to obtain authentication tokens

2. **Resource Creation**
   - Creates a project for each user
   - Creates a task within each project

3. **Access Control Testing**
   - Tests if User 1 can access User 2's project (should be denied)
   - Tests if User 2 can access User 1's project (should be denied)
   - Tests if User 1 can access User 2's task (should be denied)

4. **Results Analysis**
   - Displays a summary of the test results
   - Indicates whether the user data isolation is working correctly

## Expected Results

If the user data isolation implementation is working correctly, you should see:

```
=== Testing Access Controls ===
Testing if User 1 can access User 2's project (ID: xxx)...
✓ PASS: User 1 correctly denied access to User 2's project
  Response: 403 - You do not have access to this project

Testing if User 2 can access User 1's project (ID: xxx)...
✓ PASS: User 2 correctly denied access to User 1's project
  Response: 403 - You do not have access to this project

Testing if User 1 can access User 2's task (ID: xxx)...
✓ PASS: User 1 correctly denied access to User 2's task
  Response: 403 - You do not have access to this task
```

## Troubleshooting

If any of the tests fail, it indicates that there may be issues with the user data isolation implementation:

1. **Registration/Login Failures**
   - Check that the authentication endpoints are working correctly
   - Verify that the test users don't already exist with different passwords

2. **Resource Creation Failures**
   - Check that the project and task creation endpoints are working
   - Verify that the required fields for projects and tasks are correct

3. **Access Control Failures**
   - If users can access each other's resources, check:
     - The resource access middleware is properly implemented
     - The middleware is correctly applied to the relevant routes
     - The controllers are checking for user ownership

## Manual Testing

In addition to the automated test script, you can manually test the user data isolation:

1. Log in to the application with two different user accounts
2. Create projects and tasks with each account
3. Try to access the other user's projects by directly entering the URL
4. Verify that appropriate error messages are displayed

## Next Steps

After confirming that the user data isolation is working correctly:

1. Implement similar access controls for any new resources added to the system
2. Regularly run the test script after making changes to the codebase
3. Consider adding more comprehensive tests for edge cases 