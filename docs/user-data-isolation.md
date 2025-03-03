# User Data Isolation in ServiceBridge

This document outlines the approach used to ensure proper user data isolation in the ServiceBridge platform.

## Overview

User data isolation is a critical security feature that ensures users can only access their own data or data that has been explicitly shared with them. In ServiceBridge, this is implemented through a combination of:

1. Authentication middleware
2. Resource access validation middleware
3. User-specific database queries
4. Entity relationships that enforce ownership

## Implementation Details

### Authentication Middleware

The `authenticateToken` middleware in `src/middleware/auth.ts` verifies the JWT token provided in the request header and attaches the authenticated user to the request object. This ensures that all protected routes have access to the current user's information.

```typescript
// Example from auth.ts
export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Verify token and attach user to request
    const user = await userRepository.findOne({ where: { email: decoded.email } });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

### Resource Access Validation Middleware

The resource access validation middleware in `src/middleware/resourceAccess.ts` provides a reusable way to check if a user has access to a specific resource (project or task). This middleware:

1. Retrieves the resource from the database
2. Checks if the user has the appropriate access rights
3. Attaches the resource to the request object if access is granted
4. Returns a 403 Forbidden response if access is denied

```typescript
// Example from resourceAccess.ts
export const validateProjectAccess = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Check if user is the owner or team member
    const isOwner = project.owner.id === req.user?.id;
    const isTeamMember = project.team?.members?.some(member => member.id === req.user?.id) || false;

    if (!isOwner && !isTeamMember) {
      return res.status(403).json({ message: 'You do not have access to this project' });
    }

    // Attach the project to the request for later use
    req.project = project;
    next();
  } catch (error) {
    // Error handling
  }
};
```

### User-Specific Database Queries

All database queries that retrieve user data include filters to ensure only data owned by or shared with the current user is returned:

```typescript
// Example from ProjectController.ts
async getUserProjects(req: AuthRequest, res: Response) {
  try {
    const projects = await this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.tasks', 'tasks')
      .leftJoinAndSelect('project.owner', 'owner')
      .where('owner.id = :userId', { userId: req.user?.id })
      .getMany();

    return res.json(projects);
  } catch (error) {
    // Error handling
  }
}
```

### Entity Relationships

The database schema is designed to enforce ownership and access control:

- Projects have an owner (User)
- Tasks belong to a Project and have a creator and assignee (User)
- Teams have members (Users) and are associated with Projects

## Access Control Rules

The following rules determine who can access what data:

1. **Projects**:
   - A user can access a project if they are the owner
   - A user can access a project if they are a member of the project's team

2. **Tasks**:
   - A user can access a task if they are the owner of the associated project
   - A user can access a task if they are the creator of the task
   - A user can access a task if they are the assignee of the task
   - A user can access a task if they are a member of the project's team

## Testing User Data Isolation

To verify that user data isolation is working correctly:

1. Create multiple user accounts
2. Create projects and tasks with different owners and assignees
3. Verify that each user can only see their own projects and tasks
4. Verify that team members can access shared projects and tasks

## Security Considerations

- Always validate user access at the API level, not just in the frontend
- Use the resource access validation middleware for all endpoints that access user-specific data
- Regularly audit the codebase to ensure all new endpoints follow the user data isolation pattern
- Consider implementing additional logging for access control decisions to help with debugging and security audits 