module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        profileLink: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dob: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
    return User
}