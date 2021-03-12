const db = require('../config/db.config.js');
const Categoria = db.categoria;
const Posteo = db.posteo;


// Crear: crear un nuevo post para una categoria
exports.create = (req, res) => {
	const { titulo, contenido, fk_categoriaId } = req.body
	console.log(req.body)

	Posteo.create({
		titulo: titulo,
		contenido: contenido,
		fk_categoriaId: fk_categoriaId
	}).then(posteo => {
		res.send(posteo);
	}).catch(err => {
		res.send(err.errors[0].message)
	});
};

// Traer todos los posts con informacion reducida, solo su titulo, id y categoria
exports.findAll = (req, res) => {
	Posteo.findAll({
		attributes: ['id', 'titulo', 'fk_categoriaId'],
	}).then(posteos => {

		res.send(posteos);
	}).catch(err => {
		res.send(err)
	});;
};

// Bonus 1: Traer posts segun categoria
exports.findAllByCategoria = (req, res) => {
	Posteo.findAll({
		where: {
			fk_categoriaId: req.params.fk_categoriaId
		}
	}).then(posteos => {
		res.send(posteos);
	}).catch(err => {
		res.send(err)
	});;
};

// Traer la informacion de 1 post
exports.findByPk = (req, res) => {

	Posteo.findByPk(req.params.posteoID, {
		attributes: ['id', 'titulo', 'contenido', 'createdAt'],
		include: [{
			model: Categoria,
			where: {'id' : db.Sequelize.col('posteo.fk_categoriaId') },
			attributes: ['nombre']
		}]
	}).then(posteo => {
		res.send(posteo);
	}).catch(err => {
		res.send(err)
	});
};

// Actualizar: editar un post existente
exports.update = (req, res) => {

	const id = req.params.posteoID;
	const { titulo, contenido, fk_categoriaId } = req.body
	console.log(id + ' ' + titulo + ' ' + contenido + ' ' + fk_categoriaId)
	Posteo.update({ titulo: titulo, contenido: contenido, fk_categoriaId: fk_categoriaId },
		{ where: { id: id } }
	).then(() => {
		res.status(200).send('Actualizando posteo por id = ' + id)
	}).catch(err => {
		res.send(err)
	});;
};

// Borrar: Borrar un post existente.
exports.delete = (req, res) => {
	const id = req.params.posteoID;
	Posteo.destroy({
		where: { id: id }
	}).then(() => {
		res.status(200).send('Borrando posteo por id = ' + id);
	}).catch(err => {
		res.send(err)
	});;
}
