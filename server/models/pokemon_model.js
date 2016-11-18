const Sequelize = require('sequelize');
const dbURL = 'postgres://localhost:5432/pokemon_fed';
const sequelize = new Sequelize(dbURL);

const Pokemon = sequelize.define('pokemons', {
  uid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: false },
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: false },
  },
  hp: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { notEmpty: false },
  },
  attack: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { notEmpty: false },
  },
  defense: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { notEmpty: false },
  },
  specialAttack: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { notEmpty: false },
  },
  specialDefense: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { notEmpty: false },
  },
  speed: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { notEmpty: false },
  },
});

module.exports = Pokemon;
