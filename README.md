# ⚡TaskSync⚡
<p align="center">
  <img src="https://skillicons.dev/icons?i=next,vite,ts,tailwind,express,mongodb,nodejs" />
  <br/>
  <a href="https://task-sync-todo.vercel.app/"><kbd>task-sync-todo.vercel.app</kbd></a>
</p>
<br/><br/>

Check it out at <a href="https://task-sync-todo.vercel.app/"><kbd>task-sync-todo.vercel.app</kbd></a>.

## Overview
TaskSync is a task manager application that allows users to perform CRUD operations on tasks while incorporating user authentication and authorization. The project consists of a TypeScript and Express backend API integrated with a Next.js 14 based client interface.

## 🔥Features
- **User Authentication & Authorization:** TaskSync provides secure user authentication and authorization, ensuring that only authenticated users can access and manage tasks.
- **CRUD Operations:** Users can create, read, update, and delete tasks associated with their account.

#### 🧬 Running locally for development

## Installation
1. Clone the TaskSync repository to your local machine:
```bash
git clone https://github.com/falcon71181/TaskSync
cd TaskSync
```

2. Navigate to the `client/` directory:
```bash
cd client/
```

3. Install client dependencies using your preferred package manager (e.g., bun, npm, yarn):
```bash
bun install
```

4. Create a `.env` file in the `client/` directory and add the following variables:
```dotenv
NEXT_PUBLIC_SERVER=http://localhost:3333
```

5. Navigate to the `server/` directory:
```bash
cd ../server/
```

6. Install server dependencies using your preferred package manager:
```bash
npm install
```

7. Create a `.env` file in the `server/` directory and add the following variables:
```dotenv
SERVER_PORT=3333
JWT_SECRET=secret
MONGO_URI=mongodb+srv://xxxxxxxxx:xxxxxxxxxxxxx
ALLOWED_METHODS="GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
ALLOWED_ORIGIN="https://task-sync-todo.vercel.app,http://localhost:5173,http://localhost:3000,http://localhost:8000,http://localhost:3333,http://localhost:5432"
```

## Usage
1. Start the server:
```bash
bun dev
```
### or
```bash
nodemon
```

2. Start the client:
```bash
cd ../client/
bun dev
```

3. Access the client interface at http://localhost:3000.

4. Ensure your MongoDB server is running and accessible with the provided URI in the `.env` file.

#### API Endpoints
- **User Authentication:**
    - GET `/health`: Health Check
    - GET `/users/validate`: Validate user using their JWT token.
    - POST `/users/register`: Register a new user.
    - POST `/users/login`: Log in and authenticate a user.
- **Task Management:**
    - GET `/tasks`: Retrieve tasks for the authenticated user.
    - POST `/tasks/create`: Create a new task for the authenticated user.
    - PATCH `/tasks/:id/change`: Update the progress status of an existing task belonging to the authenticated user.
    - DELETE `/tasks/:id/delete`: Delete a task specific to the authenticated user.

## 🍄Technologies Used
- TypeScript
- Tailwind CSS
- Express
- Node.js
- Next.js 14 (for the client interface)
- JSON Web Tokens (JWT) for authentication
- Bcrypt

## 💖  Contribution 🤝
Contributions to enhance the functionality or improve the codebase are welcome! Feel free to open issues or pull requests.
