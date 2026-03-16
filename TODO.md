# Project Building Guide: Test-My-Api (Postman Clone)

Follow this step-by-step guide to build a full-stack API testing application similar to Postman.

## 1. Project Initialization
- Create a parent folder named `API Tester`.
- Inside it, create two folders: `server` (Backend) and `client` (Frontend).
- Initialize Git: `git init`.

---

## 2. Backend Setup (`server`)

### Step 2.1: Initialize Node.js
- Navigate to `server` folder.
- Run `npm init -y`.
- In `package.json`, add `"type": "module"` to use ES6 imports.

### Step 2.2: Install Dependencies
- Run: `npm install express mongoose dotenv cors bcrypt jsonwebtoken`
- Install dev dependency for auto-restart: `npm install -D nodemon`

### Step 2.3: Folder Structure
Create the following folders:
- `config/`: Database connection logic.
- `models/`: Mongoose schemas (User, History).
- `routes/`: API route definitions.
- `controllers/`: Logic for handling requests.
- `utils/`: Middlewares and helper functions.

### Step 2.4: Core Files
1. **`.env`**: Port, MongoDB URI, JWT Secret.
2. **`config/db.js`**: Function to connect to MongoDB using Mongoose.
3. **`index.js`**: Main entry point. Configure Express, middlewares (JSON, CORS), and routes.

### Step 2.5: Implementation
- **Models**: Create `User.js` (email, password) and `History.js` (url, method, headers, body, userId).
- **Auth**: Use `bcrypt` to hash passwords and `jsonwebtoken` for login sessions.
- **Routes**: Create auth routes (signup/login) and history routes (save/get request history).

---

## 3. Frontend Setup (`client`)

### Step 3.1: Initialize Vite + React
- Run: `npm create vite@latest . -- --template react`
- Run: `npm install`

### Step 3.2: Install Tailwind CSS
- Follow the official [Vite + Tailwind CSS installation guide](https://tailwindcss.com/docs/guides/vite).
- Install icons: `npm install lucide-react`.

### Step 3.3: Install Router and Axios
- Run: `npm install react-router-dom axios`.

### Step 3.4: Folder Structure (`src`)
- `components/`: UI pieces (Header, Sidebar, Panels).
- `pages/`: Full pages (Dashboard, Login, Signup).
- `utils/`: Axios instance configuration.

---

## 4. UI Implementation

### Step 4.1: Authentication Pages
- **Signup Page**: Form to collect user details, send to `/api/auth/signup`.
- **Login Page**: Form to authenticate user, store JWT token in `localStorage`.

### Step 4.2: Dashboard Components
- **Sidebar**: List of previous requests (History) fetched from the backend.
- **Header**: User profile summary and Logout button.
- **Request Panel**:
  - Input for URL.
  - Dropdown for HTTP Methods (GET, POST, PUT, DELETE).
  - Tabs for Headers and Body (JSON).
  - "Send" button to trigger the API call.
- **Response Panel**:
  - Display Status Code, Time, and Size.
  - JSON Viewer for the response data.

---

## 5. Integration Logic

### Step 5.1: Making the API Request
- When the user clicks "Send":
  - Use `axios` to send the request to the specified URL.
  - Capture the response data, status, and headers.
  - Send the request details to your backend `/api/history` to save it.

### Step 5.2: State Management
- Use `useState` to manage:
  - Current URL and method.
  - Request headers and body.
  - API response.
  - Loading states and error messages.

---

## 6. Polishing and Deployment
- **Design**: Use Tailwind for a dark-themed, premium UI with smooth transitions and glassmorphism.
- **Verification**: Test with various public APIs (like JSONPlaceholder).
- **Deployment**:
  - Backend: Render or Railway.
  - Frontend: Vercel or Netlify.

---

**Happy Coding!**
