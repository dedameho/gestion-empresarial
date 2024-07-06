import { Router } from "express";
import { ProductoController } from "../controllers/producto.controller.js";
import { validateProductSchema } from "../schemas/producto.schema.js";
export const ProductoRouter = Router();

ProductoRouter.post('/api/v1/producto', [validateProductSchema], ProductoController.createProduct)

ProductoRouter.get('/api/v1/productos', ProductoController.getProducts)

ProductoRouter.put('/api/v1/producto/:id', [validateProductSchema], ProductoController.editProduct)

ProductoRouter.delete('/api/v1/producto/:id', ProductoController.deleteProduct)