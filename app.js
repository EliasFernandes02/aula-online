import "dotenv/config"
import express from "express"

import categoriasRoutes from "./route/CategoriaRoute.js"
import usuarioRoutes from "./route/UsuarioRoute.js"

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.static("public"))
app.use("/categorias", categoriasRoutes)
app.use("/usuarios", usuarioRoutes)

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
            
        })
    } catch (error) {
        console.error("Não foi possível iniciar o servidor")
    }
}

start()
