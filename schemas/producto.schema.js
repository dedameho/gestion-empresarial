import Joi from "joi";
import { ErrorResponse } from "../utils/errorResponse.js";

const productSchema = Joi.object({
    codigo:Joi.string().min(5).max(10).required(),
    nombre:Joi.string().min(3).max(255).required(),
    descripcion:Joi.string().min(0).max(255).required(),
    precio:Joi.number().min(0).required(),
    stock:Joi.number().min(0).required()
})

export function validateProductSchema(req, res, next) {
    const { error } = productSchema.validate(req.body);

    if (error) {
        return next(new ErrorResponse(error.details[0].message, 400));
    }
    next();
}