module.exports = function(app) {
 
    const posteo = require('../controllers/posteo.controller.js');
    const joiValidator = require('../middleware/joiValidator')
    const posteoSchema = require('../joi/posteo.joi')

   // Crear: crear un nuevo post para una categoria
   app.post('/posteo',joiValidator(posteoSchema.create, 'body'), posteo.create);
 
   // Traer todos los posts con informacion reducida, solo su titulo, id y categoria
   app.get('/posteos', posteo.findAll);

   // Traer la informacion de 1 post
   app.get('/posteo/:posteoId', posteo.findByPk);

   // Actualizar: editar un post existente
   app.put('/posteo/:posteoId', posteo.update);

   // Borrar: Borrar un post existente
   app.delete('/posteo/:posteoId', posteo.remove);
   
   // Bonus 1: Traer posts segun categoria
   app.get('/posteos/categoria/',posteo.findAllByCategoria)


} 