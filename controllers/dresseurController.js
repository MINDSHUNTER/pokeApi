
const dresseurModel = require('../models/dresseurModel');
const pokemonModel = require('../models/pokemonModel')


exports.createDresseur = async (req, res) => {
    try {
        const dresseur = new dresseurModel(req.body);
        dresseur.validateSync()
        await dresseur.save()
        res.json({ success: true, data: dresseur });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

exports.getAllDresseur = async (req, res) => {
    try {
        const dresseurs = await dresseurModel.find().populate('pokemons');;
        res.json({ success: true, data: dresseurs });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

exports.getDresseurById = async (req, res) => {
    try {
        const dresseur = await dresseurModel.findById(req.params.id).populate('pokemons');
        if (!dresseur) {
            return res.json({ success: false, message: 'Dresseur non trouv"' });
        }
        res.json({ success: true, data: dresseur });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

exports.updateDresseur = async (req, res) => {
    try {
        const dresseur = await dresseurModel.findByIdAndUpdate(req.params.id, req.body, {

        });
        if (!dresseur) {
            return res.json({ success: false, message: 'Dresseur non trouvé' });
        }
        res.json({ success: true, data: dresseur });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};


exports.DissocierPokemon = async (req, res) => {
    try {
        const pokemonId = req.params.pokemonId;
        const dresseurId = req.params.dresseurId;

        const pokemon = await pokemonModel.findById(pokemonId);
        if (!pokemon) {
            return res.json({ message: 'Pokémon non trouvé' });
        }

        const dresseur = await dresseurModel.findById(dresseurId);
        if (!dresseur) {
            return res.json({ message: 'Dresseur non trouvé' });
        }
        dresseur.pokemons.pull(pokemonId);  
        await dresseur.save();

        res.json({ success: true, message: 'Pokémon dissocié du Dresseur avec succès' });
    } catch (error) {
        res.json({ success: false, message: 'Erreur lors de la dissociation du Pokémon', error: error.message });
    }
}



exports.deleteDresseur = async (req, res) => {
    try {
        const dresseur = await dresseurModel.findByIdAndDelete(req.params.id);
        if (!dresseur) {
            return res.json({ success: false, message: 'Dresseur pas trouvé' });
        }
        res.json({ success: true, data: {} });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};