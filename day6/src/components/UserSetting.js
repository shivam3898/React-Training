import React, { useState, useReducer } from 'react';
import Header from './Header';
import Footer from './Footer';
import Login from './Login'
import { users } from '../utils/users';
import { useParams, Link } from "react-router-dom";

const UserSetting = (props) => {
    const { id } = useParams();
    // console.log(id);
    const user = users.find(user => user.id == id);

    const [username, setName] = useState(user.username);
    const [password, setPassword] = useState(user.password);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [profileLink, setProfileLink] = useState(user.profileLink);

    const onSubmit = (event) => {
        event.preventDefault();
        // console.log(username);
        // console.log(password);
        // console.log(firstName);
        // console.log(lastName);
        // console.log(profile);


    }

    const reducer = (state, action) => {
        const userId = action.payload.id;
        const index = users.findIndex(user => user.id == userId);
        switch (action.type) {
            case "update":
                let updatedUser = state.userState[index];
                updatedUser.username = action.payload.username;
                updatedUser.password = action.payload.password;
                updatedUser.firstName = action.payload.firstName;
                updatedUser.lastName = action.payload.lastName;
                updatedUser.profileLink = action.payload.profileLink;
                state.userState[index] = updatedUser;
                break;
            case "delete":
                state.userState.splice(index, 1);
                break;
        }
    }

    const [state, dispatch] = useReducer(reducer, { userState: users });

    return <div>{
        (localStorage.getItem("loggedIn") === "true" && localStorage.getItem("loggedInId")) === id.toString() ? (
            <div>
                <Header id={id} />
                <div className="login-body">
                    <form method="POST">
                        <h1>Login</h1>
                        <input type="text" name="username" id="username" defaultValue={user.username} onInput={e => setName(e.target.value)} />
                        <input type="password" name="password" id="password" defaultValue={user.password} onInput={e => setPassword(e.target.value)} />
                        <input type="text" name="firstName" id="firstName" defaultValue={user.firstName} onInput={e => setFirstName(e.target.value)} />
                        <input type="text" name="lastName" id="lastName" defaultValue={user.lastName} onInput={e => setLastName(e.target.value)} />
                        <input type="text" name="profile" id="profile" defaultValue={user.profileLink} onInput={e => setProfileLink(e.target.value)} />
                        <button type="button" className="login-button" onClick={() => {
                            dispatch({
                                type: "update",
                                payload: {
                                    id: id,
                                    username: username,
                                    password: password,
                                    firstName: firstName,
                                    lastName: lastName,
                                    profileLink: profileLink
                                }
                            })
                        }}>Update</button>
                        <Link to="/">
                            <button type="button" className="delete-button" onClick={() => {
                                dispatch({
                                    type: "delete",
                                    payload: {
                                        id: id
                                    }
                                })
                            }}>Delete</button>
                        </Link>
                    </form>
                </div>
                <Footer />
            </div>
        ) : (<Login />)}
    </div>
}

export default UserSetting;