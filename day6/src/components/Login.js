import React, { useState } from 'react';
import { users } from '../utils/users';
import { useHistory } from "react-router-dom";

const Login = () => {

    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [invalidCredentials, setInvalidCredentials] = useState('');


    const history = useHistory();

    const usernameChangeHandler = (event) => {
        setInvalidCredentials("");
        setName(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setInvalidCredentials("");
        setPassword(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const user = users.find(user => (user.username === username && user.password === password));
        console.log(user);
        if (user) {
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("loggedInId", user.id);
            history.push(`/home/${user.id}`);
        } else {
            setInvalidCredentials("Invalid Username or Password");
        }
    }

    const Error = () => {
        if (invalidCredentials) {
            return <p className="error-msg">{invalidCredentials}</p>
        }
        return <p></p>
    }

    return (
        <div className="login-body">
            <form onSubmit={onSubmit}>
                <h1>Login</h1>
                <Error />
                <input type="text" name="username" id="username" placeholder="Username" onChange={usernameChangeHandler} />
                <input type="password" name="password" id="password" placeholder="Password" onChange={passwordChangeHandler} />
                <button type="submit" className="login-button">Submit</button>
            </form>
        </div>
    )
}

export default Login;