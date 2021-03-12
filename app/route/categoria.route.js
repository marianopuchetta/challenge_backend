module.exports = function(app) {
 
    const categoria = require('../controllers/categoria.controller.js');
 
   

     // Crea categoria
   app.post('/categoria', categoria.create);
 
    // todas las categorias
    app.get('/categorias/', categoria.findAll);

     // busca categoria por pk
   app.get('/categoria/:categoriaId', categoria.findByPk);

      // borra a categoria por Id
      app.delete('/categoria/:categoriaId', categoria.delete);
}