import React from 'react';
import profile from '../images/profile.png';
import logo from '../images/logo.png'

function Header() {
    return <nav className="navbar">
        <img src={profile} alt="Profile" className="profile" />
        <span className="username">Shivam</span>
        <img src={logo} alt="Logo" className="logo" />
    </nav>
}

export default Header;