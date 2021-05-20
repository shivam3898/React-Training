import axios from 'axios';
import authHeader from './authHeader';

const API_URL = "http://localhost:8080/api/";

const getProducts = () => {
    return axios.get(API_URL + "products", { headers: authHeader() })
}

const addProduct = (name, price, imageUrl, expiryDate) => {
    return axios.post(API_URL + "addProduct", {
        name,
        price,
        imageUrl,
        expiryDate
    }, { headers: authHeader() })
}

export default {
    getProducts,
    addProduct
}