import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar(props) {
    return (
        <div className="offcanvas offcanvas-start w-25" tabIndex="-1" id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="false">
            <div className="offcanvas-header">
                <h6 className="offcanvas-title d-none d-sm-block" id="offcanvas">Menu</h6>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body px-0">
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link text-truncate">
                            <i className="fs-5 bi-house"></i><span className="ms-1 d-none d-sm-inline">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/profile"} className="nav-link text-truncate">
                            <i className="fs-5 bi-speedometer2"></i><span className="ms-1 d-none d-sm-inline">Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/products"} className="nav-link text-truncate">
                            <i className="fs-5 bi-grid"></i><span className="ms-1 d-none d-sm-inline">Products</span>
                        </Link>
                    </li>
                    {props.isAdmin && (
                        <li>
                            <Link to={"/userList"} className="nav-link text-truncate">
                                <i className="fs-5 bi-people"></i><span className="ms-1 d-none d-sm-inline">Users</span>
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link to={"/settings"} className="nav-link text-truncate">
                            <i className="fs-5 bi-gear"></i><span className="ms-1 d-none d-sm-inline">Settings</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
