
const mongoose =require("mongoose")
const pokemonSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true,"Name required"]
    },
    
    type:{
        type:String,
        required : [true,"Type required"]
    },
    
    level:{
        type:Number,
        required : [true,"Number required"]
    },
    attack:{
        type:String,
        required : [true,"Attack required"]
    },
    
   
})
const pokemonModel = mongoose.model('pokemons', pokemonSchema);
 module.exports = pokemonModel;