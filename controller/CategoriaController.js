import * as categoriasRepository from "../repository/CategoriaRepository.js"

export const index = async (req,res) => {
    try {
        
        
        const categorias = await categoriasRepository.index()
        
        return res.status(200).send(categorias)

    } catch (error) {
        return res.status(500).send("Não foi possível listar as categorias")
    }
}

export const find = async(req,res) => {
    try {
        const id = req.params.id
        const categoria = await categoriasRepository.find(id)

        if(!id) {
            return res.status(404).send("Não foi possível encontrar a categoria")
        }

        return res.status(200).send(categoria)
    } catch (error) {
        return res.status(500).send("Não foi possível detalhar a categoria")
    }
}


export const create = async (req,res) => {
    try {
        const {nome,descricao} = req.body

        await categoriasRepository.create(nome,descricao)

        return res.status(201).send("Categoria cadastrada com sucesso")

    } catch (error) {
        return res.status(500).send("Não foi possível cadastrar uma categoria")
    }
}

export const update = async (req,res) => {
    try {
        const id = req.params.id
        const {nome,descricao} = req.body
        
        
        if(!id) {
            return res.status(404).send("Não foi possível encontrar a categoria")
        }

        await categoriasRepository.update(id,nome,descricao)

        return res.status(200).send("Categoria atualizada com sucesso")
    } catch (error) {
        return res.status(500).send("Não foi possível atualizar uma categoria")
    }
}

export const destroy = async(req,res) => {
    try {
        const id = req.params.id

        if(!id) {
            return res.status(404).send("Não foi possível encontrar a categoria")
        }

        const categoria = await categoriasRepository.destroy(id)
       

        return res.status(200).send("Categoria removida com sucesso")
    } catch (error) {
        return res.status(500).send("Não foi possível remover a categoria")
    }
}