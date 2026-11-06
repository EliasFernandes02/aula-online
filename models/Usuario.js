import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

const Usuario = sequelize.define("Usuario", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nome:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING
    },
    senha:{
        type:DataTypes.TEXT
    }
}, {
    tableName:"usuarios",
    timestamps:false
})

export default Usuario