import React from 'react';
import profile from '../images/profile.png';
import logo from '../images/logo.png'

function Header(props) {
    return <nav className="navbar">
        <img src={profile} alt="Profile" className="profile" />
        <span className="username">{props.username}</span>
        <img src={logo} alt="Logo" className="logo" />
        <a href="/" class="logout">Logout</a>
    </nav>
}

export default Header;