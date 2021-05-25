import axios from 'axios';

const API_URL = "http://localhost:8080/api/auth/";

const login = (username, password) => {
    return axios.post(API_URL + "signin", {
            username,
            password
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        })
}

const register = (username, password, firstName, lastName, profileLink, dob) => {
    let ageDiff = Date.now() - new Date(dob).getTime()
    let ageDate = new Date(ageDiff)
    let age = Math.abs(ageDate.getFullYear() - 1970)
    return axios.post(API_URL + "signup", {
        username,
        password,
        firstName,
        lastName,
        profileLink,
        dob,
        age
    })
}

const logout = () => {
    localStorage.removeItem("user");
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

export default {
    login,
    logout,
    getCurrentUser,
    register
}