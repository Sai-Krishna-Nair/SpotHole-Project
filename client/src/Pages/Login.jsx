import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';

function Login({ onAuthSuccess }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    // Check for token on component mount and restore authentication state
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            onAuthSuccess(token); // Update the parent with the stored token
        }
    }, [onAuthSuccess]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Store the token in localStorage
                localStorage.setItem('token', data.token);

                // Handle successful login
                onAuthSuccess(data.token);
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('An error occurred. Please try again later.');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Login to SpotHole</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="auth-button">Login</button>
                </form>
                <p className="auth-link">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
