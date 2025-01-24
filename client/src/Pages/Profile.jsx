import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AccountSettings from '../components/Profile/AccountSettings'
import History from '../components/Profile/History';
import '../styles/Profile.css';

function Profile({ user }) {
    const [activeTab, setActiveTab] = useState('settings');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const handleSignOut = () => {
        // Add your sign-out logic here
        console.log('Signing out...');
    };


    return (
        <>
            <Navbar />
            <div className="profile-page">
                <div className="profile-banner">
                    <div className="profile-pic">
                        <div className="profile-initial">
                            {user?.username ? user.username.charAt(0).toUpperCase() : 'R'}
                        </div>
                    </div>
                    <div className="profile-info">
                        <h3>{user?.username || 'User'}</h3>
                        <p>{user?.email || 'example123@gmail.com'}</p>
                    </div>
                    <button className="sign-out-button" onClick={handleSignOut}>
                        Sign Out
                    </button>
                </div>
                <div className="profile-action">
                    <div 
                        className={`tab ${activeTab === 'settings' ? 'active' : ''}`} 
                        onClick={() => handleTabClick('settings')}
                    >
                        Account settings
                    </div>
                    <div 
                        className={`tab ${activeTab === 'orders' ? 'active' : ''}`} 
                        onClick={() => handleTabClick('orders')}
                    >
                        History
                    </div>
                </div>
                <div className='profile-content'>
                    <div className={`tab-content ${activeTab === 'settings' ? 'active' : ''}`} id="settings">
                        <AccountSettings />
                    </div>
                    <div className={`tab-content ${activeTab === 'orders' ? 'active' : ''}`} id="orders">
                        <History />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Profile;
