const db = require('../config/db.config.js');
const Categoria = db.categoria;
const Posteo = db.posteo;


// Crear Categoria
exports.create = async (req, res) => {
    let nombre = req.body.nombre;
	let categoria = {};
	try {
		categoria = await Categoria.create({
			nombre: nombre
		})
	} catch (err) {
		res.send(err)
	}

	res.send(categoria);

};




exports.findAll = (req, res) => {
	Categoria.findAll({
		attributes: [['id', 'categoriaId'], 'nombre']
	}).then(categorias => {
		res.send(categorias);
	}).catch(err => {
		res.send(err.errors[0].message)
	});;
};


exports.findByPk = (req, res) => {
	Categoria.findByPk(1).then(categoria => {
		console.log(req.params.d)

		res.send(categoria);
	}).catch(err => {
		res.send(err.errors[0].message)
	});;
};


// Delete categoria by Id
exports.delete = (req, res) => {
	const id = req.params.categoriaId;
	console.log(req.params)
	Categoria.destroy({
		where: { id: id }
	}).then(() => {
		res.status(200).send('borrado categoria por id = ' + id);
	}).catch(err => {
		res.send(err.errors[0].message)
	});;
}