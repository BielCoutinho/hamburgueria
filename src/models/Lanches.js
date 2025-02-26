const { model, Schema } = require('mongoose')

//criação da estrutura de dados ("coleção") que será usada no banco
const lancheSchema = new Schema({
    nomeLanche: {
        type: String
    },
    descricaoLanche: {
        type: String
    },
    precoLanche: {
        type: String
       
    },
    imagemLanche: {
        type: String
            
    }
}, {versionKey: false})

//importação do modelo de dados
//obs: Clientes será o noime da coleção
module.exports = model('Lanches', lancheSchema)