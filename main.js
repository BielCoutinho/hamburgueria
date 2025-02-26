/**
 * Processo principal
 * Estudo do CRUD com MongDB
 */

//Importação do módulo de conexão (database.js)
const {conectar, desconectar } = require('./database.js')

// Immportação do modelo de dados do lanches
const lancheModel = require('./src/models/Lanches.js')

//importação do pacote string-similarity para aprimorar a busca por nome
const stringSimilarity = require('string-similarity')

//CRUD Create (função para adicionar um novo Lanche)
const criarLanche = async (nomeLan, descricaoLan, precoLan, imagemLan) => {
    try {
        const novoLanche = new lancheModel (
            {
            nomeLanche: nomeLan,
            descricaoLanche: descricaoLan,
            precoLanche: precoLan,
            imagemLanche: imagemLan,
            }
            
        )
        // A linha abaixo salva os dados do cliente no banco
        await novoLanche.save()
        console.log("Lanche adicionado com sucesso ")
    } catch (error) {

        //tratamento de exceções especificas 
        if(error.code = 11000) {
            console.log(`Erro: O Lanche ${precoLan} já está cadastrado`)
        } else {
            console.log(error)
        }
        console.log(error)
        
    }
}

//exexução de aplicação 
const app = async () => {
    await conectar()
    //CRUD - Create
     await criarLanche("Big Mac")

    //CRUD-Read (Exemplo 1 - listar todos clientes)
    //await listarCLientes()

    //CRUD-Read (Exemplo 2 - listar todos clientes)
    //await buscarCliente("Gabriel Santos Coutinho")
    // CRUD - Update
    //await atulizarCliente('67b90512a9fecad594c08894', 'Gabriel Santos Coutinho Filho', '(11) 12345-4323', '293.540.414-23')
    //await buscarCliente("Gabriel Santos Coutinho Filho")
    //await deletarCliente ("67b903c75904c173220efca0")
    //await listarCLientes()

    await desconectar()


}
