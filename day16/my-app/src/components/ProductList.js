import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import productService from '../services/productService';
import Product from './Product';

const ProductList = (props) => {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const { user: currentUser } = useSelector((state) => state.auth);

    let history = useHistory();

    const perPage = 5;
    const offset = currentPage * perPage;

    const getData = async () => {
        await productService.getProducts().then((response) => {
            const data = response.data;
            console.log(data)
            const currentPageData = data.slice(offset, offset + perPage).map(product => <Product product={product} key={product.id} />);
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
