import React, { Component } from 'react';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            isSubmitted: true
        }
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    usernameChangeHandler(event) {
        this.setState({
            username: event.target.value
        });
    }

    passwordChangeHandler(event) {
        this.setState({
            password: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({ isSubmitted: true });
        console.log(this.state.isSubmitted);
        this.props.onLogin(this.state);
    }

    render() {
        return <div className="login-body">
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>
                <input type="text" name="username" id="username" placeholder="Username" onChange={this.usernameChangeHandler} />
                <input type="password" name="password" id="password" placeholder="Password" onChange={this.passwordChangeHandler} />
                <button type="submit" class="login-button">Submit</button>
            </form>
        </div>
    }
}

export default Login;