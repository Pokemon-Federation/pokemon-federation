const path = require('path');
const express = require('express');
const app = express();
const Pokemon = require('./models/pokemon_model');
const User = require('./models/user_model');
const Team = require('./models/team_model');

app.listen(3000, () => console.log('servering port 3000'));

Pokemon.sync().then(() => {
  return Pokemon.create({
    name: 'BULBASAUR',
    type: 'GRASS',
    hp: 50,
    attack: 50,
    defense: 50,
    specialAttack: 50,
    specialDefense: 50,
    speed: 45,
  });
});

User.sync().then(() => {
  return User.create({
    username: 'jared',
    password: 'jared',
    email: 'jared$jarde',
    location: 'jarded',
  });
});

Team.sync().then(() => {
  return User.create({
    username: 'jared',
    password: 'jared',
    email: 'jared$jarde',
    location: 'jarded',
  });
});
