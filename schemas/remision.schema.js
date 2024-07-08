import Joi from 'joi'
import { ErrorResponse } from '../utils/errorResponse.js';

const remisionSchema = Joi.object({
    cotizacionId: Joi.number().positive().required(),
    ordenCompra: Joi.string().required()
})

export function validateRemisionSchema(req, res, next) {
    const { error } = remisionSchema.validate(req.body)
    if (error) {
        return next(new ErrorResponse(error.details[0].message, 400));
    }
    next();
}