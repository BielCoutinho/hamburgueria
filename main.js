// Importação do módulo de conexão (database.js)
const { conectar, desconectar } = require('./database.js')

// Importação do modelo de dados do lanche
const lancheModel = require('./src/models/lanches.js')

// Importação do módulo stringSimilarity
const stringSimilarity = require('string-similarity')

// CRUD Create (função para adicionar um novo Lanche)
const criarLanche = async (nomeLan, descricaoLan, precoLan, imagemLan) => {
    try {
        const novoLanche = new lancheModel(
            {
                nomeLanche: nomeLan,
                descricaoLanche: descricaoLan,
                precoLanche: precoLan,
            }
        )
        // A linha abaixo salva os dados do cliente no banco
        await novoLanche.save()
        console.log("Lanche adicionado com sucesso ")
    } catch (error) {
        //tratamento de exceções específicas
        if (error.code === 11000) {
            console.log(`Erro: O Lanche ${nomeLan} já está cadastrado`)
        } else {
            console.log(error)
        }
    }
}

// CRUD Read - Função para listar todos os lanches cadastrados
const listarLanches = async () => {
    try {
        // a linha abaixo lista todos os lanches cadastrados por ordem alfabética
        const lanches = await lancheModel.find().sort(
            {
                nomeLanche: 1
            }
        )
        console.log(lanches)
    } catch (error) {
        console.log(error)
    }
}

// CRUD Read - Função para buscar um lanche específico
const buscarLanche = async (nome) => {
    try {
        // find() - buscar no banco de dados
        // nomeLanche: new RegExp(nome) filtra pelo nome (partes que contenham (expressão regular)) 
        // 'i' significa case-insensitive (ignorar maiúsculas ou minúsculas)
        const lanche = await lancheModel.find(
            {
                nomeLanche: new RegExp(nome, 'i')
            }
        ) 

        // calcular a similaridade entre os nomes retornados e o nome pesquisado
        const nomesLanches = lanche.map(lanche => lanche.nomeLanche)
        
        // validação (se não existir o lanche pesquisado)
        if (nomesLanches.length === 0) {
            console.log("Lanche não cadastrado")
        } else {
            const match = stringSimilarity.findBestMatch(nome, nomesLanches)
            // lanches com melhor similaridade
            const melhorLanche = lanche.find(lanche => lanche.nomeLanche === match.bestMatch.target)
            
            // formatação da resposta
            const lancheFormatado = {
                nomeLanche: melhorLanche.nomeLanche,
            }
            console.log(lancheFormatado)
        }
    } catch (error) {
        console.log(error)
    }
}

// CRUD Update - Função para alterar os dados de um cliente
// Atenção!!! Obrigatóriamente o update precisa ser feito com base no ID do cliente 
const atulizarLanche = async (id, nomeLan, descricaoLan, precoLan ) => {
    try {
        const cliente = await clienteModel.findByIdAndUpdate(
            id,
            {
               nomeLanche: nomeLan,
               descricaoLanche: descricaoLan,
               precoLanche: precoLan
            },
            {
                new: true,
                runValidators: true
            },
           
        )
        //validação (retorno do banco de dados) 
        if (!lanche) {
            console.log("Lanche não encontrado")
        } else {
            console.log("Dados do lanche alterado com sucesso")
        }
    } catch (error) {
        console.log(error)
        
    }
}

// Execução da aplicação
const app = async () => {
    await conectar()
    // CRUD - Create
    // await criarLanche("Churros com Doce de Leite", "Massa de churros, doce de leite, açúcar e canela", 8.00)
    // await listarLanches()
    await buscarLanche("Big Mac")
    await atulizarCliente('67c10a5ae604083c7328329f', 'Big Mac', 'Pão, queijo cheddar, picles', '25.99')
    await buscarLanche("Big Mac")
    await desconectar()
}

app()
