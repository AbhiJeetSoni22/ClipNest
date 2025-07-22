# Dobby Ads Frontend

This is the frontend for the Dobby Ads MERN project, built with [React](https://react.dev/) and [Vite](https://vitejs.dev/). It provides a modern UI for user authentication, folder management, image upload, and search.

## Features

- User Signup & Login
- Dashboard with sidebar navigation
- Folder creation, renaming, and deletion
- Image upload (with preview, drag & drop, and size/type validation)
- Search images by name
- Download and delete images
- Responsive design with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. Clone the repository and navigate to the frontend folder:

   ```sh
   git clone <repo-url>
   cd dobby-ads/frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:

   Edit `.env` and set your backend URL:

   ```
   VITE_BACKEND_URL='http://localhost:5000'
   ```

### Running the App

Start the development server:

```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Building for Production

```sh
npm run build
```

## Project Structure

```
frontend/
  ├── public/
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── App.jsx
  │   ├── main.jsx
  │   └── index.css
  ├── .env
  ├── package.json
  ├── vite.config.js
  └── README.md
```

## Tech Stack

- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Linting

Run ESLint:

```sh
npm run