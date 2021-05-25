module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('products', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.STRING,
            allowNull: false
        },
        imageUrl: {
            type: Sequelize.STRING,
            defaultValue: 'https://place-hold.it/240x140',
            allowNull: false
        },
        expiryDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    })
    return Product
}