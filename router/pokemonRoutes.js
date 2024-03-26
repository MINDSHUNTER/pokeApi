const pokemonRoutes = require("express").Router();
const pokemonController = require('../controllers/pokemonController')


pokemonRoutes.post('/pokemons/dresseur/:dresseurId', pokemonController.createPokemon);

pokemonRoutes.get('/pokemons', pokemonController.getAllPokemon);
pokemonRoutes.get('/pokemon/:id', pokemonController.getPokemonById);
pokemonRoutes.get('/pokemons/type/:type', pokemonController.getPokemonByType);
pokemonRoutes.put('/pokemon/:id', pokemonController.updatePokemon);
pokemonRoutes.delete('/dresseur/:dresseurId/pokemon/:pokemonId', pokemonController.deletePokemon)

module.exports = pokemonRoutes ;