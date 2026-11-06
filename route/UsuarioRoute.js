import { Router } from "express";
import * as usuarioController from "../controller/UsuarioController.js"

const router = Router()

router.get("/",usuarioController.index)
router.get("/:id",usuarioController.find)
router.post("/",usuarioController.create)
router.put("/:id",usuarioController.update)
router.delete("/:id",usuarioController.destroy)

export default router
