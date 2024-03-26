const dresseurRoutes = require("express").Router();
const dresseurController = require('../controllers/dresseurController.js');

// Routes pour les Dresseurs
dresseurRoutes.post('/dresseurs', dresseurController.createDresseur);
dresseurRoutes.get('/dresseurs', dresseurController.getAllDresseur);
dresseurRoutes.get('/dresseurs/:id', dresseurController.getDresseurById);
dresseurRoutes.put('/dresseurs/:id', dresseurController.updateDresseur);
dresseurRoutes.put('/dresseurs/:dresseurId/pokemons/:pokemonId/dissocier', dresseurController.DissocierPokemon);

dresseurRoutes.delete('/dresseurs/:id', dresseurController.deleteDresseur);

module.exports = dresseurRoutes;