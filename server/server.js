const path = require('path');
const express = require('express');
const app = express();
const Pokemon = require('./models/pokemon_model');
const User = require('./models/user_model');
const Team = require('./models/team_model');
const Promise = require('bluebird');
const request = require('request-promise');
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.listen(3000, () => console.log('servering port 3000'));

const url = 'http://pokeapi.co/api/v1/pokemon/';
const table = {
  attack: true,
  defense: true,
  sp_atk: true,
  sp_def: true,
  speed: true,
  name: true,
  types: true,
  hp: true
}

function createReqObject(num) {
  const requests = [];
  var index = 1;
  while (index <= num) {
    requests.push({ url: `${url + index++}` });
  }
  return requests;
}

function getTypes(arr) {
  if (arr.length === 1) return arr[0].name;
  return arr.reduce((types, item) => {
    types.push(item.name);
    return types;
  }, []);
}
const requests = createReqObject(151);

Promise.map(requests, function (obj) {
  return request(obj).then(function (body) {
    return JSON.parse(body);
  });
}).then(function (results) {
  const pokeData = [];
  results.forEach((pokemon) => {
    pokeData.push(Object.keys(pokemon)
      .filter((attr) => {
        return table[attr];
      }).reduce((pokemonObj, data) => {
        pokemonObj[data] = data !== 'types' ? pokemon[data] : getTypes(pokemon[data]);
        return pokemonObj;
      }, {}));
  })
Pokemon.sync({force:true}).then(() => {
  pokeData.forEach((currPokemon) => {
    console.log('about to create entry,', currPokemon)
    const bulb = {meow : 'BULBASAURZZZ'};
    if (Array.isArray(currPokemon.types)) currPokemon.types = currPokemon.types.join('');
    Pokemon.create({
      name: currPokemon.name,
      type: currPokemon.types,
      hp: +currPokemon.hp,
      attack: +currPokemon.attack,
      defense: +currPokemon.defense,
      specialAttack: +currPokemon.sp_atk,
      specialDefense: +currPokemon.sp_def,
      speed: +currPokemon.speed,
    });
  });
});
}, function (err) {
  console.log(err)
});




// User.find({ where: { username: 'jared' } }).then((user) => {
//   Pokemon.find({ where: { name: 'BULBASAUR' } }).then((pokemon) => {
//     user.setPokemons(pokemon);
//   });
// });