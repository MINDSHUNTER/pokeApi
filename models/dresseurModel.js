
const mongoose =require("mongoose")
const dresseurSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true,"Name required"]
    },
    
    age:{
        type:String,
        required : [true,"age required"]
    },
    
    pokemons:{
        type:[{
           type : mongoose.Schema.Types.ObjectId,
           ref :"pokemons"
        }   
        ],
    },
})
const dresseurModel = mongoose.model('dresseurs', dresseurSchema);
 module.exports = dresseurModel;