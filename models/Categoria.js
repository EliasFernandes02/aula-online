import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

const Categoria = sequelize.define("Categoria", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nome:{
        type:DataTypes.STRING,
        allowNull:false
    },
    descricao:{
        type:DataTypes.TEXT
    }
}, {
    tableName:"categorias",
    timestamps:false
})

export default Categoria