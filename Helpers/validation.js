// VALIDATION
const Joi = require('@hapi/joi');

exports.registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

exports.loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });
    return schema.validate(data);
};

exports.noteValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required()
    });
    return schema.validate(data);
}
