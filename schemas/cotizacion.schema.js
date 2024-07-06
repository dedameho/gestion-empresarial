import Joi from 'joi'
import { ErrorResponse } from '../utils/errorResponse.js';

const cotizacionSchema = Joi.object({
    clienteId: Joi.number().integer().required(),
    subtotal:Joi.number().positive().required(),
    total: Joi.number().precision(2).required(),
    estado: Joi.string().required(),
});

const detalleCotizacionSchema = Joi.object({
    id:Joi.number().integer().optional().allow(null),
    productoId: Joi.number().integer().required(),
    cantidad: Joi.number().integer().min(1).required(),
    precio: Joi.number().precision(2).required()
});

const cotizacionConDetallesSchema = Joi.object({
    cotizacion: cotizacionSchema.required(),
    detalles: Joi.array().items(detalleCotizacionSchema).required()
});

export function validateCotizacionSchema(req, res, next) {
    const { error } = cotizacionConDetallesSchema.validate(req.body);

    if (error) {
        return next(new ErrorResponse(error.details[0].message, 400));
    }
    next();
}