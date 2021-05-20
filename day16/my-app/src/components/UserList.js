import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { useHistory, Link, Redirect } from 'react-router-dom';

import UserService from '../services/userService';
import User from './User';

const UserList = (props) => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const { user: currentUser } = useSelector((state) => state.auth);

    let history = useHistory();

    const perPage = 5;
    const offset = currentPage * perPage;

    const getData = async () => {
        await UserService.userList().then(
            response => {
                const data = response.data;
                const currentPageData = data.slice(offset, offset + perPage).map(user => <User user={user} onDelete={onDelete} key={user.id} />);
                setUsers(currentPageData);
                setPageCount(Math.ceil(data.length / perPage));
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            }
        );
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

    const onDelete = async (id) => {
        await UserService.deleteUser(id).then(() => {
            setUsers(users.filter(user => user.id !== id))
            setCurrentPage(1);
            history.push("/profile")
        })
    }

    return (message ? (<div className="form-group">
        <div className="alert alert-danger" role="alert">
            {message}
        </div>
    </div>) : (<div>
        <div className="fs-1 text-center">
            <Link to="/addUser">
                <i className="bi bi-plus-circle-fill add-button"></i>
            </Link>
        </div>
        {users}
        <ReactPaginate
            previousLabel={"← Prev"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
        />
    </div>
    )
    )
}

export default UserList;