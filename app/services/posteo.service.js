const db = require('../config/db.config.js');
const { findAll } = require('../controllers/posteo.controller.js');
const Posteo = db.posteo;
const Categoria = db.categoria;
const errors = require('../errors/errors')



//Crear posteo
const createPosteo = async (titulo,contenido,fk_categoriaId) => {
 
  const newPosteo = {titulo,contenido,fk_categoriaId}

  return await  Posteo.create(newPosteo)
}

//GET posteo por pk
const findById = async (posteoId) => {
 
  let posteoById =  await  Posteo.findByPk( posteoId, {
		attributes: ['id', 'titulo', 'contenido', 'createdAt'],
		include: [{
			model: Categoria,
			where: { 'id': db.Sequelize.col('posteo.fk_categoriaId') },
			attributes: [['nombre','categoria']],
		}]
	})
  if (!posteoById) {
    throw new errors.NotFound()
  }
  return posteoById;
}

//GET todos los posteos
const findAllPosteos = async (limit,offset) => {
  limit = limit && parseInt(limit, 10)
  offset = offset && parseInt(offset, 10)

  let posteos = await Posteo.findAll({limit,offset,attributes: ['id', 'titulo'],
  include: [{
    model: Categoria,
    where: { 'id': db.Sequelize.col('posteo.fk_categoriaId') },
    attributes: [['nombre','categoria']],
  }]})
  if(!posteos){
    throw new errors.NotFound()
  }
  return posteos;
}

//GET todos los posteos por categoria
const findAllPosteoByCategoria = async (limit,offset,categoriaId) => {
  limit = limit && parseInt(limit,10)
  offset = offset && parseInt(offset,10)

  let posteosByCategoria = await Posteo.findAll({where:{fk_categoriaId : categoriaId}})

  if(!posteosByCategoria){
    throw new errors.NotFound()
  }

  return posteosByCategoria;

}

//Update posteo
const updatePosteo = async (id,titulo,contenido,fk_categoriaId) => {

  let posteoToUpdate = await Posteo.findOne({where:{id:id}})

  if(!posteoToUpdate){
    throw new errors.NotFound();
  }
// console.log(posteoToUpdate)
  posteoToUpdate.titulo = titulo ? titulo : posteoToUpdate.titulo;
  posteoToUpdate.contenido = contenido ? contenido : posteoToUpdate.contenido;
  posteoToUpdate.fk_categoriaId = fk_categoriaId ? fk_categoriaId : posteoToUpdate.fk_categoriaId;

  await posteoToUpdate.save();
  await posteoToUpdate.reload();

  return posteoToUpdate.toJSON();
}
// Borrar posteo
const removePost = async (posteoId) => {

    let posteoToDelete = await Posteo.findOne({ where: { id: posteoId } })

    if (!posteoToDelete) {
      throw new errors.NotFound()
    }
    await posteoToDelete.destroy()
  
    return { ok: true }
  }

  module.exports = {createPosteo, findAllPosteos, findAllPosteoByCategoria, findById, updatePosteo, removePost}
