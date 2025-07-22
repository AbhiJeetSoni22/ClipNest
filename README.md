# Dobby Ads File Management System

## Overview
This is a web application built for the Dobby Ads internship selection task. It allows users to register, create nested folders, upload images, and search images by name. Each user can only access their own folders and images. The application uses Node.js with Express for the backend, React with Tailwind CSS for the frontend, and MongoDB for the database.

## Features
- **Signup**: Users can create an account with an email and password.
- **Login**: Users can log in to access their dashboard.
- **Logout**: Users can log out, clearing their session.
- **Create Nested Folders**: Users can create folders and nest them within other folders.
- **Upload Images**: Users can upload images with a name and optionally assign them to a folder.
- **User-Specific Access**: Users can only see their own folders and images.
- **Search Images**: Users can search their images by name.

## Tech Stack
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Multer
- **Frontend**: React, Tailwind CSS, Axios, React Router
- **Database**: MongoDB

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following:
   ```
   MONGO_URI=mongodb://localhost:27017/dobby_ads
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

### Database Setup
- Ensure MongoDB is running locally or use a MongoDB Atlas URI in the `.env` file.
- The backend will automatically create the `dobby_ads` database and collections (`users`, `folders`, `images`) upon first use.

## Deployment
- **Backend**: Deployed on Render.
  - Set up a new web service on Render, connect to your GitHub repository, and add the `.env` variables.
  - Ensure the `uploads` directory is created on the server.
- **Frontend**: Deployed on Vercel.
  - Create a new project on Vercel, connect to your GitHub repository, and set the build command to `npm run build`.
  - Update the API URL in frontend components to point to the deployed backend (e.g., replace `http://localhost:5000` with your Render URL).

## Login Credentials
- **Email**: testuser@example.com
- **Password**: testpassword123



## Submission
- **Deadline**: 25 July 2025
- **Submission Details**: Submit the GitHub repository link and deployed application URL with the login credentials to Dobby Ads HR.

## Notes
- The application uses JWT for authentication, ensuring secure user sessions.
- Images are stored in the `backend/uploads` directory and served statically.
- The frontend uses Tailwind CSS for a modern, responsive UI.
- Ensure the backend and frontend are running concurrently for local development.