    import Categoria from "../models/Categoria.js"

    export const index = async () => {
        return await Categoria.findAll()
    }

    export const find = async (id) => {
        return await Categoria.findByPk(Number(id))
    }

    export const create = async (nome, descricao) => {
        return await Categoria.create({nome,descricao})
    }

    export const update = async(id,nome,descricao) => {
        const categoria =  await Categoria.findByPk(Number(id))
        
        if(!categoria) {
            return null
        }
        return await categoria.update({nome,descricao})
    }

    export const destroy = async(id) => {
        const categoria = await Categoria.findByPk(Number(id))
        
        if(!categoria) {
            return null
        }

        await categoria.destroy()
        return categoria
    }