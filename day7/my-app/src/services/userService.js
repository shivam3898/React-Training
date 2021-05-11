import axios from 'axios';
import authHeader from './authHeader';

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const editUser = (username, firstName, lastName, profileLink) => {
    return axios.put(API_URL + "user/edit", {
        username,
        firstName,
        lastName,
        profileLink
    }, {
        headers: authHeader()
    })
}

export default {
    getPublicContent,
    editUser
}