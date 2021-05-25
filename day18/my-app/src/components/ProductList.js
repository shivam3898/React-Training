import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import productService from '../services/productService';
import Product from './Product';

Modal.setAppElement('#root')

const ProductList = (props) => {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});

    const { user: currentUser } = useSelector((state) => state.auth);

    let history = useHistory();

    const perPage = 5;
    const offset = currentPage * perPage;

    const getData = async () => {
        await productService.getProducts().then((response) => {
            const data = response.data;
            console.log(data)
            const currentPageData = data.slice(offset, offset + perPage)
                .map(product => <Product openModal={openModal} product={product} key={product.id} />);
            setProducts(currentPageData);
            setPageCount(Math.ceil(data.length / perPage));

        }, error => {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            setMessage(resMessage);
        })
    }

    useEffect(() => {
        getData();
    }, [offset]);

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    }

    const openModal = (e) => {
        setSelectedProduct(e);
        setIsOpen(true);
    }

    function afterOpenModal() {

    }

    function closeModal() {
        setIsOpen(false);
    }

    return (message ? (<div className="form-group">
        <div className="alert alert-danger" role="alert">
            {message}
        </div>
    </div>) : (
        <div>
            {props.isAdmin && (<div className="fs-1 text-center">
                <Link to="/addProduct">
                    <i className="bi bi-plus-circle-fill add-button"></i>
                </Link>
            </div>)}
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Product Modal"
                className="Modal"
                overlayClassName="Overlay"
            >
                <span className="close" onClick={closeModal}>&times;</span>
                <div className="card user-card" >
                    <img src={selectedProduct.imageUrl} alt="Product Pic" />
                    <div className="card-body">
                        <h5 className="card-title">{selectedProduct.name}</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Price: {selectedProduct.price}</li>
                        <li className="list-group-item">Expiry Date: {selectedProduct.expiryDate}</li>
                    </ul>
                </div>
            </Modal>
            { products}
            <ReactPaginate
                previousLabel={"← Prev"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            />
        </div >
    )
    )
}

export default ProductList
