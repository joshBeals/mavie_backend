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

exports.weightValidation = (data) => {
    const schema = Joi.object({
        weight: Joi.string().required()
    });
    return schema.validate(data);
}

exports.memoryValidation = (data) => {
    const schema = Joi.object({
        img_path: Joi.string().required(),
        description: Joi.string().required()
    });
    return schema.validate(data);
}
