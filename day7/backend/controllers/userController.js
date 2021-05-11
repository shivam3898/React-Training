const db = require("../models")
const User = db.user
var bcrypt = require("bcryptjs")

exports.allAccess = (req, res) => {
    res.status(200).send("Welcome Page");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.editUser = (req, res) => {
    User.findOne({
            where: {
                id: req.userId
            }
        }).then(user => {
            user.update({
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                profileLink: req.body.profileLink
            })
            res.status(200).send({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                profileLink: user.profileLink
            })
        }).catch(err => {
            res.status(500).send({ message: err.message })
        })
        // res.status(200).send("update" + req.userId)
}