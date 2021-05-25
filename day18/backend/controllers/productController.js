const db = require('../models')
const Product = db.product

exports.getProducts = (req, res) => {
    Product.findAll().then(result => {
        res.send(result)
    }).catch(err => {
        res.status(500).send({ message: err.message })
    })
}

exports.createProduct = (req, res) => {
    Product.create({
        name: req.body.name,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        expiryDate: req.body.expiryDate
    }).then(product => {
        res.send({ message: "Product added successfully!" })
    }).catch(err => {
        res.status(500).send({ message: err.message })
    })
}