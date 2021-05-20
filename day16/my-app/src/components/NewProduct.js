import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import productService from "../services/productService";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const NewProduct = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    if (!props.isAdmin) {
        return <Redirect to="/home" />;
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangePrice = (e) => {
        setPrice(e.target.value);
    }

    const onChangeExpiryDate = (e) => {
        setExpiryDate(e.target.value);
    }

    const onChangeImageUrl = (e) => {
        setImageUrl(e.target.value);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            productService.addProduct(name, price, imageUrl, expiryDate).then(response => {
                setMessage(response.data.message);
                setSuccessful(true);
            }, error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            })
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
                                <label htmlFor="name">Name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={name}
                                    onChange={onChangeName}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <Input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    value={price}
                                    onChange={onChangePrice}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="imageUrl">Image URL</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="imageUrl"
                                    value={imageUrl}
                                    onChange={onChangeImageUrl}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="expiryDate">Expiry Date</label>
                                <Input
                                    type="date"
                                    className="form-control"
                                    name="expiryDate"
                                    value={expiryDate}
                                    onChange={onChangeExpiryDate}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group mt-3">
                                <button className="btn btn-primary login-btn">Add Product</button>
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

export default NewProduct;