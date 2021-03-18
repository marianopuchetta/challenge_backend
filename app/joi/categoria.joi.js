const Joi = require('joi')

const create = Joi.object({
    nombre: Joi.string().min(3).max(15).required().messages({
        "string.base": `"Nombre" should be a type of 'text'`,
        "string.min": `"Nombre" debe tener un mínimo de {#limit} caracteres`,
        "string.max": `Nombre" debe tener un maximo de {#limit} caracteres`,
        "any.required": `"Nombre" es un campo necesario`
      }),
})

module.exports = { create}