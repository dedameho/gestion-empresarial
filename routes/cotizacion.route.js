import { Router } from "express";
import { CotizacionController } from "../controllers/cotizacion.controller.js";
import { validateCotizacionSchema } from "../schemas/cotizacion.schema.js";
export const CotizacionRouter = Router()

CotizacionRouter.post('/api/v1/cotizacion',[validateCotizacionSchema],CotizacionController.createBudget)

CotizacionRouter.get('/api/v1/cotizaciones',CotizacionController.getBudgets)

CotizacionRouter.get('/api/v1/cotizacion/:id',CotizacionController.getBudgetById)

CotizacionRouter.get('/api/v1/cotizacion/:cotizacionId/pdf',CotizacionController.getPDFbudget)

CotizacionRouter.put('/api/v1/cotizacion/:id',[validateCotizacionSchema],CotizacionController.updateBudget)

CotizacionRouter.delete('/api/v1/cotizacion/:id',CotizacionController.deleteBudget)