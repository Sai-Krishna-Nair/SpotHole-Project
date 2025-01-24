import React, { useState } from 'react';
import '../../styles/AccountSettings.css';

function AccountSettings() {
    const [selectedOption, setSelectedOption] = useState('changePassword');

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleChangePassword = (e) => {
        e.preventDefault();
        // Add your password change logic here
        console.log('Password changed:', { currentPassword, newPassword, confirmNewPassword });
    };

    const renderForm = () => {
        switch (selectedOption) {
            case 'changeEmail':
                return (
                    <div className="form-section">
                        <h2>Change Email</h2>
                        <form>
                            <div className="form-group">
                                <label>New Email</label>
                                <input type="email" placeholder="Enter new email" />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                );
            case 'changePassword':
                return (
                    <div className="form-section">
                        <h2>Change Password</h2>
                        {newPassword !== confirmNewPassword && (
                            <p className="error-message">Passwords do not match</p>
                        )}
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
