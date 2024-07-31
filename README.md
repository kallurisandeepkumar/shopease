


# Shopease

Shopease is a web application that provides an online shopping experience. This repository contains both the backend and frontend parts of the project.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites
- Node.js (>= 12.x)
- npm (>= 6.x)
- MongoDB (for backend)

## Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kallurisandeepkumar/shopease.git
   cd shopease/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the backend server:**
   ```bash
   npm start
   ```

   The backend server will start on `http://localhost:5000`.

## Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd ../my-react-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the `my-react-frontend` directory with the following variable:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Run the frontend development server:**
   ```bash
   npm start
   ```

   The frontend server will start on `http://localhost:3000`.

## Running the Project

1. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend server:**
   ```bash
   cd ../my-react-frontend
   npm start
   ```

3. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Project Structure

```
shopease/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── config.js
│   └── package.json
└── my-react-frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── App.js
    │   ├── index.js
    │   └── package.json
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.



