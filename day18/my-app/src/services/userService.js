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
    });
}

const userList = async() => {
    const user = await axios.get(API_URL + "getUsers", { headers: authHeader() });
    return user;
}

const findOne = async(id) => {
    return await axios.get(API_URL + "user/" + id, { headers: authHeader() });
}

const deleteUser = (id) => {
    return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
}

export default {
    getPublicContent,
    editUser,
    userList,
    deleteUser,
    findOne
}