import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src={currentUser.profileLink}
                    alt="profile-img"
                    className="profile-img-card"
                />
                <div className="text-center mt-3">
                    <h5>{currentUser.username}</h5>
                    <hr />
                    <p>First Name: {currentUser.firstName}</p>
                    <p>Last Name: {currentUser.lastName}</p>
                    <p>DoB: {currentUser.dob}</p>
                    <p>Age: {currentUser.age}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile;