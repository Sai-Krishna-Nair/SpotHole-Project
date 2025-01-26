import React, { useState, useEffect } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Docs from './Pages/Docs';
import Team from './Pages/Team';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function App() {
    const [user, setUser] = useState(null); // State to store logged-in user details

    // Check sessionStorage for an existing token on app initialization
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setUser(token); // Restore the user session
        }
    }, []);

    // Simulate login/signup success
    const handleAuthSuccess = (userData) => {
        sessionStorage.setItem('token', userData); // Store the token in sessionStorage
        setUser(userData); // Store the user's details
    };

    const router = createBrowserRouter(
        [
            {
                path: '/',
                element: user ? <Home /> : <Navigate to="/login" />, // Redirect to login if not logged in
            },
            {
                path: '/login',
                element: user ? <Navigate to="/" /> : <Login onAuthSuccess={handleAuthSuccess} />,
            },
            {
                path: '/signup',
                element: user ? <Navigate to="/" /> : <Signup onAuthSuccess={handleAuthSuccess} />,
            },
            {
                path: '/documentation',
                element: user ? <Docs /> : <Navigate to="/login" />,
            },
            {
                path: '/history',
                element: user ? <History /> : <Navigate to="/login" />,
            },
            {
                path: '/team',
                element: user ? <Team /> : <Navigate to="/login" />,
            },
            {
                path: '/profile',
                element: user ? <Profile user={user} /> : <Navigate to="/login" />,
            },
        ],
    );

    return (
        <div className="app">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
