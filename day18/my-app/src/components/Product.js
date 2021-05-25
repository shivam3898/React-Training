import React from 'react'

const Product = (props) => {
    const { id, name, price, imageUrl, expiryDate } = props.product;
    return (
        <div className="card user-card" onClick={() => { props.openModal(props.product) }}>
            <img src={imageUrl} className="card-img-top" alt="Product Pic" />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
            </div>
            {/* <ul className="list-group list-group-flush">
                <li className="list-group-item">Price: {price}</li>
                <li className="list-group-item">Expiry Date: {expiryDate}</li>
            </ul> */}
        </div>
    )
}

export default Product
