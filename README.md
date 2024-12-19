# Blog Backend Project

## Overview
The Blog Project is a backend application for a blogging platform that supports two roles: Admin and User. Admins can manage users and their blogs, while users can perform CRUD operations on their own blogs. It features secure authentication, role-based access control, and a public API for blog retrieval with search, sort, and filter functionalities.

## Features
### User Roles
- **Admin**:
  - Manually created in the database with predefined credentials.
  - Can delete any blog.
  - Can block any user by updating the `isBlocked` property.
  - Cannot update any blog.
- **User**:
  - Can register and log in.
  - Can create, update, and delete their own blogs.
  - Cannot perform admin actions.

### Authentication & Authorization
- **Authentication**:
  - Required for all write, update, and delete operations.
- **Authorization**:
  - Differentiates between Admin and User roles and restricts actions based on roles.

### Blog API
- Publicly accessible API for reading blogs with the following features:
  - Search by title or content.
  - Sort by specific fields (e.g., `createdAt`, `title`).
  - Filter by author ID.

## Technologies Used
- TypeScript
- Node.js
- Express.js
- MongoDB with Mongoose

## Live Demo
Access the live project here: [Blog Backend Project Live](https://blog-project-mu-eight.vercel.app)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd blog-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory with the following variables:
     ```
     PORT=3000
     MONGO_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     ```

4. Build the application:
   ```bash
   npm run build
   ```

5. Start the application:
   - Development:
     ```bash
     npm run start:dev
     ```
   - Production:
     ```bash
     npm run start:prod
     ```

## API Documentation
### 1. Authentication
#### 1.1 Register User
**Endpoint:** `POST /api/auth/register`
#### 1.2 Login User
**Endpoint:** `POST /api/auth/login`

### 2. Blog Management
#### 2.1 Create Blog
**Endpoint:** `POST /api/blogs`

**Request Header:** `Authorization: Bearer <token>`

#### 2.2 Update Blog
**Endpoint:** `PATCH /api/blogs/:id`
**Request Header:** `Authorization: Bearer <token>`


#### 2.3 Delete Blog
**Endpoint:** `DELETE /api/blogs/:id`
**Request Header:** `Authorization: Bearer <token>`

#### 2.4 Get All Blogs (Public)
**Endpoint:** `GET /api/blogs`

**Query Parameters:**
- `search`: Search blogs by title or content.
- `sortBy`: Sort blogs by specific fields (e.g., `createdAt`).
- `sortOrder`: Sorting order (`asc` or `desc`).
- `filter`: Filter blogs by author ID.


### 3. Admin Actions
#### 3.1 Block User
**Endpoint:** `PATCH /api/admin/users/:userId/block`
**Request Header:** `Authorization: Bearer <admin_token>`


#### 3.2 Delete Blog
**Endpoint:** `DELETE /api/admin/blogs/:id`
**Request Header:** `Authorization: Bearer <admin_token>`

## Scripts
- `npm run start`: Start the application.
- `npm run start:dev`: Start the application in development mode.
- `npm run build`: Build the application.
- `npm run lint`: Run ESLint to check for linting issues.
- `npm run lint:fix`: Fix linting issues.
- `npm run format`: Format the code using Prettier.


