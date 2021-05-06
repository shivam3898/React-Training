import React from 'react';
import logo from '../images/logo.png'
import { Link } from 'react-router-dom';
import { users } from '../utils/users';

const Header = (props) => {

    const user = users.find(user => user.id.toString() === props.id);
    console.log(user);

    const logout = () => {
        localStorage.setItem("loggedIn", false);
        localStorage.setItem("loggedInId", undefined);
    }

    return <nav className="navbar">
        <Link to={`/home/${user.id}`}>
            <img src={user.profileLink} alt="Profile" className="profile" />
        </Link>
        <span className="username">{user.username}</span>
        <Link to={`/edit/${user.id}`} className="nav-item" > Edit</Link>
        <Link to="/" className="nav-item" onClick={logout}>Logout</Link>
        <img src={logo} alt="Logo" className="logo" />
    </nav>
}

export default Header;