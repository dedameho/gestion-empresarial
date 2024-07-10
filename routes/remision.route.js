import { RemisionController } from "../controllers/remision.controller.js";
import { validateRemisionSchema } from "../schemas/remision.schema.js";
import { Router } from 'express'
export const RemisionRouter = Router()

RemisionRouter.get('/api/v1/remisiones', RemisionController.getRemisions)

RemisionRouter.post('/api/v1/remision', [validateRemisionSchema], RemisionController.createRemision)

RemisionRouter.get('/api/v1/remision/:id', RemisionController.getRemisionById)

RemisionRouter.get('/api/v1/remision/:remisionId/pdf', RemisionController.getPDFRemision)

RemisionRouter.get('/api/v1/remision/cotizacion/:cotizacionId', RemisionController.getRemisionByBudgetId)

RemisionRouter.put('/api/v1/remision/:remisionId/pdf', RemisionController.updateRemisionPDF)

RemisionRouter.patch('/api/v1/remision/:id', RemisionController.signRemision)

RemisionRouter.delete('/api/v1/remision/:id', RemisionController.deleteRemision)