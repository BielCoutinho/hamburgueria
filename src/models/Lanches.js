const mongoose = require('mongoose')

const lancheSchema = new mongoose.Schema({
    nomeLanche: {
        type: String,
        required: true,
        unique: true, // Garantir que o nome do lanche seja único
    },
    descricaoLanche: {
        type: String,
        required: true,
    },
    precoLanche: {
        type: Number,
        required: true,
    },
    imagemLanche: {
        type: String,
    }
})

// Criando o modelo
const lancheModel = mongoose.model('Lanche', lancheSchema)

module.exports = lancheModel
