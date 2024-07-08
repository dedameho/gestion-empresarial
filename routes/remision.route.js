import { RemisionController } from "../controllers/remision.controller.js";
import { validateRemisionSchema } from "../schemas/remision.schema.js";
import { Router } from 'express'
export const RemisionRouter = Router()

RemisionRouter.get('/api/v1/remisiones',RemisionController.getRemisions)

RemisionRouter.post('/api/v1/remision',[validateRemisionSchema],RemisionController.createRemision)

RemisionRouter.get('/api/v1/remision/:id',RemisionController.getRemisionById)

RemisionRouter.get('/api/v1/remision/:remisionId/pdf',RemisionController.getPDFRemision)