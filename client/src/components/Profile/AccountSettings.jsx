import React, { useState,useEffect } from 'react';
import '../../styles/AccountSettings.css';

function AccountSettings() {
    const [selectedOption, setSelectedOption] = useState('changePassword');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Extract token from localStorage
    const token = sessionStorage.getItem('token');


    useEffect(() => {
        setSuccessMessage('');
    }, [selectedOption]);

    const handleChangePassword = async (e) => {
        e.preventDefault();

        // Clear previous messages
        setError('');
        setSuccessMessage('');

        if (newPassword !== confirmNewPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/v1/profile/changePassword', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ currentPassword, newPassword, confirmNewPassword })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
            } else {
                setError(data.message || 'Error updating password');
            }
        } catch (error) {
            setError(error.message || 'Error updating password');
        }
    };

    const handleChangeEmail = async (e) => {
        e.preventDefault();

        // Clear previous messages
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:3000/api/v1/profile/changeEmail', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ newEmail })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
            } else {
                setError(data.message || 'Error updating email');
            }
        } catch (error) {
            setError(error.message || 'Error updating email');
        }
    };

    const renderForm = () => {
        switch (selectedOption) {
            case 'changeEmail':
                return (
                    <div className="form-section">
                        <h2>Change Email</h2>
                        {error && <p className="error-message">{error}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        <form onSubmit={handleChangeEmail}>
                            <div className="form-group">
                                <label>New Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter new email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                );
            case 'changePassword':
                return (
                    <div className="form-section">
                        <h2>Change Password</h2>
                        {error && <p className="error-message">{error}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        <form onSubmit={handleChangePassword}>
                            <div className="form-group">
                                <label>
                                    Current Password <span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter current password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    New Password <span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    Confirm New Password <span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="account-settings-container">
            <div className="options-section">
                <ul>
                    <li onClick={() => setSelectedOption('changePassword')}>Change Password</li>
                    <li onClick={() => setSelectedOption('changeEmail')}>Change Email</li>
                </ul>
            </div>
            <div className="content-section">
                {renderForm()}
            </div>
        </div>
    );
}

export default AccountSettings;
