const Sequelize = require('sequelize');
const dbUrl = 'postgres://localhost:5432/pokemon_fed';
const sequelize = new Sequelize(dbUrl);

const User = sequelize.define('users', {
  uid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
});

module.exports = User;
