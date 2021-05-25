import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'

function Header({ currentUser, logOut }) {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
                <img src={logo} className="logo" />
            </Link>

            {currentUser ? (<>
                <div className="navbar-nav">
                    <li className="nav-item"><a className="nav-link">{currentUser.username}</a></li>
                </div>
                <div className="navbar-nav nav-right mr-5">
                    <li className="nav-item">
                        <a href="/login" className="nav-link" onClick={logOut()}>
                            Logout  <i className="bi bi-box-arrow-right"></i>
                        </a>
                    </li>
                </div></>
            ) : (
                <div className="navbar-nav nav-right">
                    <li className="nav-item">
                        <Link to={"/login"} className="nav-link">
                            Login
                        </Link>
                    </li>
                </div>
            )}
        </nav>
    )
}

export default Header
