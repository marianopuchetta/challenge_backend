const db = require('../config/db.config.js');
const Categoria = db.categoria;
const Posteo = db.posteo;
const postService = require('../services/posteo.service')



// Crear: crear un nuevo post para una categoria
exports.create = async (req, res) => {

	const { titulo, contenido, fk_categoriaId } = req.body;
	let posteo = {};

	try {
		posteo = await Posteo.create({
			titulo: titulo,
			contenido: contenido,
			fk_categoriaId: fk_categoriaId
		})
	}
	catch (err) {
		console.log(err)
		res.send('hello')
	};
	res.send(posteo);
};

// Traer todos los posts con informacion reducida, solo su titulo, id y categoria
// Bonus 2: Paginacion
exports.findAll = async (req, res) => {

	let { currentPage, perPage } = req.query;
	let posteos;
	currentPage = currentPage || 1;
	perPage = perPage || 5;

	try {
		posteos = await Posteo.findAll({
			attributes: ['id', 'titulo', 'fk_categoriaId'],
		})
	} catch (err) {
		res.send(err)
	};
	res.send(pagination(posteos, currentPage, perPage));

};

// Bonus 1: Traer posts segun categoria
// Bonus 2: Paginacion
exports.findAllByCategoria = (req, res) => {
	let { currentPage, perPage } = req.query;
	 currentPage = currentPage || 1;
	 perPage = perPage || 5;

	Posteo.findAll({
		where: {
			fk_categoriaId: req.params.fk_categoriaId
		}
	}).then(posteos => {
		res.send(pagination(posteos, currentPage, perPage));
	}).catch(err => {
		res.send(err)
	});;
};



// Traer la informacion de 1 post
exports.findByPk = async (req, res) => {
console.log(req.params)
	Posteo.findByPk(req.params.posteoID, {
		attributes: ['id', 'titulo', 'contenido', 'createdAt'],
		include: [{
			model: Categoria,
			where: { 'id': db.Sequelize.col('posteo.fk_categoriaId') },
			attributes: ['nombre'],
		}]
	}).then(posteo => {
		if (!posteo) {
			return res.status(400).json({
				ok: false,
				err: {
					message: 'no encontrado'
				}
			})
		}
		res.send(posteo);
	}).catch(err => {
		res.send(err)
	});
};

// Actualizar: editar un post existente
exports.update = (req, res) => {
	const id = req.params.posteoID;
	const { titulo, contenido, fk_categoriaId } = req.body

	Posteo.update({ titulo: titulo, contenido: contenido, fk_categoriaId: fk_categoriaId },
		{ where: { id: id } }
	).then((err) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err: {
					message: 'no encontrado'
				}
			})
		}
		res.status(200).send('Actualizando posteo por id = ' + id)
	}).catch(err => {
		res.send(err)
	});;
};

// Borrar: Borrar un post existente.
exports.remove = async (req, res) => {
	console.log('remove')
	const  posteoID  = req.params.posteoID
	let code = 200
	let content = {}
  
	try {
	  content = await postService.removePost(posteoID)
	} catch (error) {
	  code = error.statusCode || 500
	  content = { error: error.errorMessage }
	}
  
	res.status(code).json(content)
  }


//metodo para paginacion
const pagination = (items, currentPage, perPage) => {

	let first_index = (Number(currentPage - 1)) * perPage;
	let last_index =
		(Number(first_index) + Number(perPage)) > items.length
			? items.length
			: (Number(first_index) + Number(perPage));
	return items.slice(first_index, last_index);
}
