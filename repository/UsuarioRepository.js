import Usuario from "../models/Usuario.js"

export const index = async () => {
    return await Usuario.findAll({
        attributes: { exclude: ["senha"] }
    })
}

export const find = async (id) => {
    return await Usuario.findByPk(Number(id), {
        attributes: { exclude: ["senha"] }
    })
}

export const create = async (nome,email,senha) => {
    return await Usuario.create({nome,email,senha})
}

export const update = async(id,nome,email,senha) => {
    const usuario =  await Usuario.findByPk(Number(id))
    
    if(!usuario) {
        return null
    }
    return await usuario.update({nome,email,senha})
}

export const destroy = async(id) => {
    const usuario = await Usuario.findByPk(Number(id))
    
    if(!usuario) {
        return null
    }

     await usuario.destroy()
     return usuario
}