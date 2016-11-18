const path = require('path');
const express = require('express');
const app = express();
const Pokemon = require('./models/pokemon_model');
const User = require('./models/user_model');
const Team = require('./models/team_model');

app.listen(3000, () => console.log('servering port 3000'));


User.find({ where: { username: 'jared' } }).then((user) => {
  Pokemon.find({ where: { name: 'BULBASAUR' } }).then((pokemon) => {
    user.setPokemons(pokemon);
  });
});
