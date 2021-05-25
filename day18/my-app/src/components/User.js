import React from 'react';

const User = (props) => {
    const { id, username, firstName, lastName, profileLink } = props.user;

    return (
        <div className="card user-card">
            <img src={profileLink} className="card-img-top" alt="User Profile Pic" />
            <div className="card-body">
                <h5 className="card-title">{username}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">First Name: {firstName}</li>
                <li className="list-group-item">Last Name: {lastName}</li>
            </ul>
            <div className="card-body">
                <div className="btn-group">
                    <a href="#" className="btn btn-danger" onClick={() => { props.onDelete(id) }}>Delete</a>
                </div>
            </div>
        </div>
    )
}

export default User;