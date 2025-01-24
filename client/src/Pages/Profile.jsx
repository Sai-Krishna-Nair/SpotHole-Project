// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import AccountSettings from '../components/Profile/AccountSettings'
// import History from '../components/Profile/History';
// import '../styles/Profile.css';
//
// function Profile({ user }) {
//     const [activeTab, setActiveTab] = useState('settings');
//
//     const handleTabClick = (tab) => {
//         setActiveTab(tab);
//     };
//     const handleSignOut = () => {
//         // Add your sign-out logic here
//         console.log('Signing out...');
//     };
//
//
//     return (
//         <>
//             <Navbar />
//             <div className="profile-page">
//                 <div className="profile-banner">
//                     <div className="profile-pic">
//                         <div className="profile-initial">
//                             {user?.username ? user.username.charAt(0).toUpperCase() : 'R'}
//                         </div>
//                     </div>
//                     <div className="profile-info">
//                         <h3>{user?.username || 'User'}</h3>
//                         <p>{user?.email || 'example123@gmail.com'}</p>
//                     </div>
//                     <button className="sign-out-button" onClick={handleSignOut}>
//                         Sign Out
//                     </button>
//                 </div>
//                 <div className="profile-action">
//                     <div
//                         className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
//                         onClick={() => handleTabClick('settings')}
//                     >
//                         Account settings
//                     </div>
//                     <div
//                         className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
//                         onClick={() => handleTabClick('orders')}
//                     >
//                         History
//                     </div>
//                 </div>
//                 <div className='profile-content'>
//                     <div className={`tab-content ${activeTab === 'settings' ? 'active' : ''}`} id="settings">
//                         <AccountSettings />
//                     </div>
//                     <div className={`tab-content ${activeTab === 'orders' ? 'active' : ''}`} id="orders">
//                         <History />
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }
//
// export default Profile;






import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AccountSettings from '../components/Profile/AccountSettings';
import History from '../components/Profile/History';
import '../styles/Profile.css';

function Profile() {
    const [activeTab, setActiveTab] = useState('settings');
    const [user, setUser] = useState({ username: '', email: '' });

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };





    const handleSignOut = () => {
        // Call the sign-out API and clear the token from localStorage
        fetch('http://localhost:3000/api/v1/profile/signout', {
            method: 'POST',
        })
            .then((response) => {
                if (response.ok) {
                    sessionStorage.removeItem('token'); // Remove token
                    window.location.href = '/login'; // Redirect to login
                } else {
                    console.error('Failed to sign out');
                }
            })
            .catch((err) => console.error('Error during sign-out:', err));
    };






    useEffect(() => {
        // Fetch user profile data from the backend
        const token = sessionStorage.getItem('token'); // Get the token from localStorage
        if (!token) {
            alert('You are not logged in!');
            window.location.href = '/login'; // Redirect to login if no token
            return;
        }

        fetch('http://localhost:3000/api/v1/profile/profileInfo', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`, // Send token in Authorization header
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch profile data');
                }
            })
            .then((data) => {
                setUser({
                    username: data.name || 'User',
                    email: data.email || 'example123@gmail.com',
                });
            })
            .catch((err) => {
                console.error(err);
                alert('Failed to load user data. Please log in again.');
                window.location.href = '/login'; // Redirect to login on error
            });
    }, []);










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
                <div className="profile-content">
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
