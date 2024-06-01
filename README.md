# Green Stitch Todo

A Todo application built with React, Redux, and Tailwind CSS, using Vite for the frontend and json-server for the backend.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Get Pending Tasks](#get-pending-tasks)
  - [Add New Task](#add-new-task)
  - [Move Task to Progress](#move-task-to-progress)
  - [Complete Task](#complete-task)
- [Project Structure](#project-structure)

## Installation

### Frontend

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/green_stitch_todo.git
    cd green_stitch_todo
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

### Backend

1. Navigate to the `data-api` directory:
    ```bash
    cd data-api
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Setup

### Frontend

1. Configure Tailwind CSS by ensuring `tailwind.config.js` is properly set:
    ```js
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        './src/**/*.{js,jsx,ts,tsx}',
        'node_modules/flowbite-react/lib/esm/**/*.js'
      ],
      theme: {
        extend: {},
      },
      plugins: [
        require('flowbite/plugin')
      ],
    }
    ```
2. Configure `postcss.config.js` :
    ```js
    export default {
     plugins: {
      tailwindcss: {},
      autoprefixer: {},
     },
    } 
    ```
2. Configure `index.css` :
    ```js
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

### Backend

1. Ensure `db.json` file is present in the `data-api` directory with the following structure:
    ```json
    {
      "pending": [
        {
          "id": "f4fe",
          "task": "Create a post for LinkedIn",
          "description": "Display your new project"
        }
      ],
      "progress": [
        {
          "id": "70bb",
          "task": "Completed task",
          "description": "Go on Morning Walk"
        },
        {
          "id": "c284",
          "task": "Test App",
          "description": "Test the app works properly"
        }
      ],
      "completed": []
    }
    ```

## Running the Application

### Frontend

1. Start the frontend development server:
    ```bash
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:5173`.

### Backend

1. Setup the json-server:

   Add this to `scripts` in package.json.
   ```bash 
   "start": "json-server --watch db.json --port 3004"
   ```
2. Start the json-server:
    ```bash
    npm start
    ```

3. json-server will run at `http://localhost:3004`.

## API Endpoints

### Get Pending Tasks

- **Endpoint:** `GET /pending`
- **Response:**
    ```json
    [
      {
        "id": "0896",
        "task": "asdfa",
        "description": "asdfa"
      }
    ]
    ```

### Add New Task

- **Endpoint:** `POST /pending`
- **Request Body:**
    ```json
    {
      "id": "1234",
      "task": "New Task",
      "description": "Task description"
    }
    ```
- **Response:**
    ```json
    {
      "id": "1234",
      "task": "New Task",
      "description": "Task description"
    }
    ```

### Move Task to Progress

- **Endpoint:** `POST /progress`
- **Request Body:**
    ```json
    {
      "id": "1234",
      "task": "New Task",
      "description": "Task description"
    }
    ```
- **Response:**
    ```json
    {
      "id": "1234",
      "task": "New Task",
      "description": "Task description"
    }
    ```

### Complete Task

- **Endpoint:** `POST /completed`
- **Request Body:**
    ```json
    {
      "task": "New Task",
      "description": "Task description",
      "date": "DD/MM/YY, HH:mm"
    }
    ```
- **Response:**
    ```json
    {
      "task": "New Task",
      "description": "Task description",
      "date": "DD/MM/YY, HH:mm"
    }
    ```

## Project Structure

```plaintext
GREEN_STITCH_TODO
│
├── data-api
│   ├── node_modules
│   ├── db.json
│   ├── package-lock.json
│   ├── package.json
│
├── node_modules
├── public
├── src
│   ├── assets
│   │   └── react.svg
│   ├── components
│   ├── redux
│   │   ├── store.js
│   │   └── todo.slice.js
│   ├── styles
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── vite.config.js
