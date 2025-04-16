
# SpotHole Project

SpotHole is a full-stack web application designed to detect potholes in images using Neural Nets. 
It integrates machine learning, a modern web stack, and a database to offer a seamless user experience for pothole detection.
The project uses Convolutional Neural Networks (CNNs) to identify potholes in images and provides the detection results through a user-friendly interface.

## 🚀 Features
- **CNN-powered Pothole Detection**: 
  - A CNN model detects potholes in uploaded images. The model is integrated with FastAPI for inference, which is connected to the backend.
- **Frontend**: 
  - Built with **React** and **Vite**, offering a fast and responsive UI for users to upload images and view results.
- **Backend**: 
  - **Node.js + Express** for handling user authentication, API requests, and MongoDB interactions.
  - **FastAPI** for serving the CNN model, processing images, and sending detection results.
- **Database**: 
  - **MongoDB** stores user information, image data, and detection results.
## 🛠️ Installation

To get started with SpotHole, follow these steps:

### 1. Clone the repository
```bash
  git clone https://github.com/Sai-Krishna-Nair/SpotHole-Project.git
  cd SpotHole-Project
```

### 2. Install dependencies
    
- For the **frontend** (React + Vite):
```bash
    cd client
    npm install
```

- For the **backend** (Node.js + Express):
```bash
    cd server
    npm install
```

- For the **AI backend** (FastAPI):
```bash
    cd FastAPI_server
    pip install -r requirements.txt
```

### 3. Start the servers

Run all the servers concurrently with the following command:
```bash
  npm run start
```

This command will:
- Start the **Node.js server** on `http://localhost:3000`
- Start the **React frontend** on `http://localhost:5173+`
- Start the **FastAPI AI backend** on `http://localhost:8000`

### 4. Access the App

Once the servers are running, open your browser and go to `http://localhost:5173` to interact with the frontend and start uploading images for pothole detection.

## Project Structure
```
SpotHole Project/
├── client/              # React frontend (Vite)
├── server/              # Node.js backend (auth, DB)
├── FastAPI_server/      # CNN model + FastAPI backend
├── .gitignore
├── package.json         # Frontend dependencies
├── requirements.txt     # FastAPI dependencies
```

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Model**: Convolutional Neural Network (CNN)
- **API**: FastAPI

## 🔧 Development Setup

- **Concurrent Server Running**: The `npm run start` command will run all three servers at once using `concurrently`. This enables you to have your frontend, backend, and AI services running simultaneously.

## ⚙️ Configuration

- **Frontend**: The React app is configured to use Vite for fast builds and hot reloading during development.
- **Backend**: The Node.js backend is connected to MongoDB to store user information and image data.
- **Model**: The CNN model is hosted with FastAPI and serves pothole detection results based on the images uploaded by users.

## 💬 Questions?

If you have any questions, feel free to open an issue or contact me directly via email: [saikrishna.nair2412@gmail.com](mailto:saikrishna.nair2412@gmail.com).

---