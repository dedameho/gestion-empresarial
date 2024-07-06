import { Router } from "express";
import { ClienteController } from "../controllers/cliente.controller.js";
import { validateClientSchema } from "../schemas/cliente.schema.js";
export const ClienteRouter = Router()

ClienteRouter.post('/api/v1/cliente', [validateClientSchema], ClienteController.createClient)

ClienteRouter.get('/api/v1/clientes', ClienteController.getClients)

ClienteRouter.put('/api/v1/cliente/:id', [validateClientSchema], ClienteController.editClient)

ClienteRouter.delete('/api/v1/cliente/:id', ClienteController.deleteClient)