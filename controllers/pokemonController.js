const pokemonModel = require('../models/pokemonModel')
const dresseurModel = require('../models/dresseurModel')


exports.createPokemon = async (req, res) => {
    try {
        const dresseur = await dresseurModel.findOne({ _id: req.params.dresseurId });
        if (dresseur) {
            const newPoke = new pokemonModel(req.body);
            newPoke.validateSync();
            await newPoke.save();
            await dresseurModel.updateOne(
                { _id: req.params.dresseurId },
                { $push: { pokemons: newPoke._id } }
            );
            res.json({ success: true, data: newPoke });
        } else {
            res.json({ success: false, message: 'Dresseur non trouvé' });
        }
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};




exports.getAllPokemon = async (req, res) => {
    try {
        const pokemon = await pokemonModel.find();
        res.json(pokemon);
    } catch (error) {
        res.json(error.message);
    }
};


exports.getPokemonByType = async (req, res) => {
    try {
        let pokemon = null;

        if (req.params.type) {
            pokemon = await pokemonModel.find({ type: req.params.type });
        } else {
            pokemon = await pokemonModel.find();
        }
        res.json(pokemon);
    } catch (error) {
        res.json(error.message);
    }
};


exports.getPokemonById = async (req, res) => {
    try {
        const pokemon = await pokemonModel.findById(req.params.id);
        if (!pokemon) {
            return res.json({ message: 'Pokemon non trouvé' });
        }
        res.json(pokemon);
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


exports.updatePokemon = async (req, res) => {
    try {
        const pokemonUpdate = await pokemonModel.updateOne({ _id: req.params.id }, req.body)
        res.json(pokemonUpdate)
    } catch (error) {
        res.json(error.message)
    }
}
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
exports.deletePokemon = async (req, res) => {
    try {
        const pokemonDelete = await pokemonModel.deleteOne({ _id: req.params.pokemonId });
        await dresseurModel.updateOne({ _id: req.params.dresseurId }, { $pull: { pokemons: req.params.pokemonId } });
        res.json(pokemonDelete);
    } catch (error) {
        res.json(error.message);
    }
};