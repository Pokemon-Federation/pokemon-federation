const path = require('path');
const express = require('express');
const app = express();
const Pokemon = require('./models/pokemon_model');
const User = require('./models/user_model');
const Team = require('./models/team_model');
const bluebird = require('bluebird');
const request = require('request-promise');
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.listen(3000, () => console.log('servering port 3000'));
var pokemonNum = 1;
const promises = [];
const url = 'http://pokeapi.co/api/v1/pokemon/'
while (pokemonNum <= 151) {
  var num = pokemonNum;
  promises.push(new Promise((resolve, reject) => {
    request(url + num.toString(), (error, response) => {
      console.log('response',num,JSON.parse(response.body).name);
      const pokeObj = {};
       pokeObj.name = JSON.parse(response.body).name;
      if (!error) {
        resolve(pokeObj);
      }
    })
  }))
  pokemonNum++;
}



// User.find({ where: { username: 'jared' } }).then((user) => {
//   Pokemon.find({ where: { name: 'BULBASAUR' } }).then((pokemon) => {
//     user.setPokemons(pokemon);
//   });
// });