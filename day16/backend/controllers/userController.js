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
                profileLink: user.profileLink,
                dob: user.dob,
                age: user.age
            })
        }).catch(err => {
            res.status(500).send({ message: err.message })
        })
        // res.status(200).send("update" + req.userId)
}

exports.getUsers = (req, res) => {
    User.findAll().then(result => {
        res.send(result)
    }).catch(err => {
        res.status(500).send({ message: err.message })
    })
}

exports.getOneUser = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    }).then(result => {
        if (!result) {
            res.status(404).json({ message: "User not found" })
        }
        res.send(result)
    }).catch(err => {
        res.status(500).send({ message: err.message })
    })
}

exports.deleteUser = (req, res) => {
    User.destroy({
            where: {
                id: req.params.id
            }
        }).then((deletedRecord) => {
            if (deletedRecord === 1) {
                res.status(200).json(deletedRecord);
            } else {
                res.status(404).json({ message: "User not found" })
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message })
        })
}