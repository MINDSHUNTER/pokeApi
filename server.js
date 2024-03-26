const express = require("express")
const mongoose = require("mongoose")
const pokemonModel = require("./models/pokemonModel")
const pokemonRoutes = require("./router/pokemonRoutes")
const dresseurRoutes = require("./router/dresseurRoutes")
const cors =require("cors")
const app = express()


app.use(cors())
app.use(express.json())
app.use(pokemonRoutes)      //permet a express d'utiliser le fichier de routes
app.use(dresseurRoutes)

app.listen(3002, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("conncted!!")
    }
})

mongoose.connect("mongodb://127.0.0.1:27017/pokemon")

