const posteoService = require('../services/posteo.service')



// Crear: crear un nuevo post para una categoria
exports.create = async (req, res) => {
	const { titulo, contenido, fk_categoriaId } = req.body;
	let posteo = {};

	try {
		posteo = await posteoService.createPosteo(
			titulo, contenido, fk_categoriaId)
	}
	catch (err) {
		console.log(err)
		res.send(err)
	};
	res.send(posteo);
};

// Traer todos los posts con informacion reducida, solo su titulo, id y categoria
// Bonus 2: Paginacion
exports.findAll = async (req, res) => {

	let { limit, offset } = req.query;
	let posteos;
	let code = 200;

	try {
		posteos = await posteoService.findAllPosteos(limit,offset)
	} catch (err) {
		code = error.statusCode || 500;
		content = { error : error.errorMessage}	
	};
	res.status(code).json(posteos)
};

// Bonus 1: Traer posts segun categoria
// Bonus 2: Paginacion
exports.findAllByCategoria = async (req, res) => {

	let { limit, offset, fk_categoriaId} = req.query;
	let code = 200;
	let posteosByCategoria = {};

	try {
		 posteosByCategoria = await posteoService.findAllPosteoByCategoria(limit, offset, fk_categoriaId)

	} catch (error) {
		code = error.statusCode || 500;
		content = { error : error.errorMessage}	
	};
	res.status(code).json(posteosByCategoria)

};



// Traer la informacion de 1 post
exports.findByPk = async (req, res) => {

	let code = 200
	let content = {}
  
	try {
	  content = await posteoService.findById(req.params.posteoId)
	} catch (error) {
	  console.log(error)
	  code = error.statusCode || 500
	  content = { error: error.errorMessage }
	}
  
	res.status(code).json(content)

};

// Actualizar: editar un post existente
exports.update = async (req, res) => {
	let id = req.params.posteoID;
	const { titulo, contenido, fk_categoriaId } = req.body;
	let code = 200;
	let posteoUpdated = {};
console.log(req.params)
	try {
		posteoUpdated = await posteoService.updatePosteo(id,titulo,contenido,fk_categoriaId)
	} catch (error) {
		console.log(error)
	  code = error.statusCode || 500
	  content = { error: error.errorMessage }
	}

	res.status(code).json(posteoUpdated)

};

// Borrar: Borrar un post existente.
exports.remove = async (req, res) => {
	let posteoId = req.params.posteoId
	let code = 200
	let content = {}

	try {
		content = await posteoService.removePost(posteoId)
	} catch (error) {
		code = error.statusCode || 500
		content = { error: error.errorMessage }
	}

	res.status(code).json(content)
}