module.exports = function (app) {

  const categoria = require('../controllers/categoria.controller.js');
  const joiValidator = require('../middleware/joiValidator')
  const categoriaSchema = require('../joi/categoria.joi')



  // Crea categoria
  app.post('/categoria', joiValidator(categoriaSchema.create, 'body'), categoria.create);

  // todas las categorias
  app.get('/categorias/', categoria.findAll);

  // busca categoria por pk
  app.get('/categoria/:categoriaId', categoria.findByPk);

  // borra a categoria por pk
  app.delete('/categoria/:categoriaId', categoria.delete);

  //Actualiza categoria por pk
  app.put('/categoria/:categoriaId', categoria.update)
}