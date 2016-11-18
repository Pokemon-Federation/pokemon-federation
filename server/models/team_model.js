const Sequelize = require('sequelize');
const dbURL = 'localhost:5432/pokemon_fed';
const sequelize = new Sequelize(dbURL);
const Pokemon = require('./pokemon_model');
const User = require('./user_model');

const Team = sequelize.define('user-pokemon', {});

Pokemon.belongsToMany(User, { through: Team });
User.belongsToMany(Pokemon, { through: Team });

module.exports = Team;
