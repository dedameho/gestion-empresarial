import Joi from 'joi'

const clientSchema = Joi.object({
    nombre: Joi.string().max(50).required(),
    nit: Joi.string().length(11).required(),
    direccion: Joi.string().max(50).required(),
    ciudad: Joi.string().max(50).required(),
    telefono: Joi.string().length(10).optional().allow(null, ''),
    email: Joi.string().email().max(50).optional().allow(null, '')
});

export function validateClientSchema(req, res, next) {
    const { error } = clientSchema.validate(req.body);

    if (error) {
        return next(new ErrorResponse(error.details[0].message, 400));
    }
    next();
}