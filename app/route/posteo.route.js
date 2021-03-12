module.exports = function(app) {
 
    const posteo = require('../controllers/posteo.controller.js');
   // Crear: crear un nuevo post para una categoria
   app.post('/posteo', posteo.create);
 
   // Traer todos los posts con informacion reducida, solo su titulo, id y categoria
   app.get('/posteos', posteo.findAll);

   // Traer la informacion de 1 post
   app.get('/posteo/:posteoID', posteo.findByPk);

   // Actualizar: editar un post existente
   app.put('/posteo/:posteoID', posteo.update);

   // Borrar: Borrar un post existente
   app.delete('/posteo/:posteoID', posteo.delete);
   
   // Bonus 1: Traer posts segun categoria
   app.get('/posteos/categoria/:fk_categoriaId',posteo.findAllByCategoria)
} 