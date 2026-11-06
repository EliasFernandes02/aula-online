import * as usuarioRepository from "../repository/UsuarioRepository.js"

export const index = async (req,res) => {
    try {
    
        const usuarios = await usuarioRepository.index()
        
        return res.status(200).send(usuarios)

    } catch (error) {
        return res.status(500).send("Não foi possível listar as usuarios")
    }
}

export const find = async(req,res) => {
    try {
        const id = req.params.id
        const usuario = await usuarioRepository.find(id)

        if(!id) {
            return res.status(404).send("Não foi possível encontrar a usuario")
        }

        return res.status(200).send(usuario)
    } catch (error) {
        return res.status(500).send("Não foi possível detalhar a usuario")
    }
}


export const create = async (req,res) => {
    try {
        const {nome,email,senha} = req.body

        await usuarioRepository.create(nome,email,senha)

        return res.status(201).send("usuario cadastrado com sucesso")

    } catch (error) {
        return res.status(500).send("Não foi possível cadastrar um usuario")
    }
}

export const update = async (req,res) => {
    try {
        const id = req.params.id
        const {nome,email,senha} = req.body
        
        
        if(!id) {
            return res.status(404).send("Não foi possível encontrar o usuario")
        }

        await usuarioRepository.update(id,nome,email,senha)

        return res.status(200).send("usuario atualizada com sucesso")
    } catch (error) {
        return res.status(500).send("Não foi possível atualizar um usuario")
    }
}

export const destroy = async(req,res) => {
    try {
        const id = req.params.id

        if(!id) {
            return res.status(404).send("Não foi possível encontrar a usuario")
        }

        const usuario = await usuarioRepository.destroy(id)
       

        return res.status(200).send("usuario removido com sucesso")
    } catch (error) {
        return res.status(500).send("Não foi possível remover o usuario")
    }
}