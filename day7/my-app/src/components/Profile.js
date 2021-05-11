import React from 'react';
import AuthService from '../services/authService';


const Profile = () => {
    const user = AuthService.getCurrentUser();
    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src={user.profileLink}
                    alt="profile-img"
                    className="profile-img-card"
                />
                <h5>Username: {user.username}</h5>
                <p>First Name: {user.firstName}</p>
                <p>Last Name: {user.lastName}</p>
            </div>
        </div>
    )
}

export default Profile;