const Joi = require('joi')

const create = Joi.object({
    titulo: Joi.string().min(3).max(20).required().messages({
        "string.base": `"Titulo" should be a type of 'text'`,
        "string.min": `"Titulo" debe tener un mínimo de {#limit} caracteres`,
        "string.max": `Titulo" debe tener un maximo de {#limit} caracteres`,
        "any.required": `"Titulo" es un campo necesario`
      }),
    contenido: Joi.string().min(3).max(200).required().messages({
        "string.min": `"Contenido" debe tener un mínimo de {#limit} caracteres`,
        "string.max": `Contenido" debe tener un maximo de {#limit} caracteres`,
        "any.required": `"Contenido" es un campo necesario`
      }),
    fk_categoriaId: Joi.string().required()
})

module.exports = { create}