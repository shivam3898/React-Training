import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { register } from "../actions/auth";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const NewUser = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profileLink, setProfileLink] = useState("");
    const [dob, setDob] = useState("");

    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    if (!props.isAdmin) {
        return <Redirect to="/home" />;
    }

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const onChangeLastName = (e) => {
        setLastName(e.target.value);
    }

    const onChangeProfileLink = (e) => {
        setProfileLink(e.target.value);
    }

    const onChangeDob = (e) => {
        setDob(e.target.value);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(register(username, password, firstName, lastName, profileLink, dob))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                });
        }
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required, vusername]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required, vpassword]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    value={firstName}
                                    onChange={onChangeFirstName}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    value={lastName}
                                    onChange={onChangeLastName}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="profileLink">Profile Image</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="profileLink"
                                    value={profileLink}
                                    onChange={onChangeProfileLink}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="dob">Date of Birth</label>
                                <Input
                                    type="date"
                                    className="form-control"
                                    name="dob"
                                    value={dob}
                                    onChange={onChangeDob}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group mt-3">
                                <button className="btn btn-primary login-btn">Add User</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );
}

export default NewUser;