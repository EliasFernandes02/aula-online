import "dotenv/config"
import { Sequelize } from "sequelize"

const db = process.env.DATABASE_URL

const sequelize = new Sequelize(db, {
    dialect:"postgres",
    logging:false,
    dialectOptions: {
        ssl:{
            require:true,
            rejectUnauthorized:false
        }
    }
})

export default sequelize