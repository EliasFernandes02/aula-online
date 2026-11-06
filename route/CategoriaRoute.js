import { Router } from "express";
import * as categoriasController from "../controller/CategoriaController.js"

const router = Router()

router.get("/",categoriasController.index)
router.get("/:id",categoriasController.find)
router.post("/",categoriasController.create)
router.put("/:id",categoriasController.update)
router.delete("/:id",categoriasController.destroy)

export default router
