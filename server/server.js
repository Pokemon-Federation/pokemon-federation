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

function createReqObject(num){
  const requests = [];
  var index = 1;
  while(index <= num){
    requests.push({ url: `${url+index++}`});
  }
  return requests;
}

function getTypes(arr){
  if (arr.length === 1) return arr[0].name;
  return arr.reduce((types,item) => {
    types.push(item.name);
    return types;
  },[]);
}
const requests = createReqObject(151);

Promise.map(requests,function(obj) {
  return request(obj).then(function(body) {
    return JSON.parse(body);
  });
}).then(function(results) {
  const data = [];
  results.forEach((pokemon) => {
    const pokeObj = {};
    pokeObj.name = pokemon.name;
    pokeObj.type = getTypes(pokemon.types);
    pokeObj.hp = pokemon.hp;
    pokeObj.attack = pokemon.attack;
    pokeObj.defense = pokemon.defense;
    pokeObj.sp_atk = pokemon.sp_atk;
    pokeObj.sp_def = pokemon.sp_def;
    pokeObj.speed = pokemon.speed;
    data.push(pokeObj);
  })
  //write to the DB with this pokedata braj :)
  console.log(data);
}, function(err) {
  console.log(err)
});




// User.find({ where: { username: 'jared' } }).then((user) => {
//   Pokemon.find({ where: { name: 'BULBASAUR' } }).then((pokemon) => {
//     user.setPokemons(pokemon);
//   });
// });