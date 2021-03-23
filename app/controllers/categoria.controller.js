const categoriaService = require('../services/categoria.service')

// Crear Categoria
exports.create = async (req, res) => {
	let nombre = req.body.nombre;
	let categoria = {};
	try {
		categoria = await categoriaService.createCategoria(nombre)
	} catch (err) {
		res.send(err)
	}

	res.json(categoria);

};



//GET todas las categorias
exports.findAll = async (req, res) => {
	let code = 200
	let content = {};

	try {
		content = await categoriaService.findAllCategorias()
	} catch (error) {
		console.log(error)
		code = error.statusCode || 500
		content = { error: error.errorMessage }
	}

	res.status(code).json(content)


};

//GET categoria by PK
exports.findByPk = async (req, res) => {
	let code = 200;
	let content = {};
	let categoriaId = req.params.categoriaId;

	try {
		content = await categoriaService.findByPkCategoria(categoriaId)
	} catch (error) {
		console.log(error)
		code = error.statusCode || 500
		content = { error: error.errorMessage }
	}

	res.status(code).json(content)

};


// Delete categoria by Id
exports.delete = async (req, res) => {
	let id = req.params.categoriaId;
	let code = 200;
	let content = {};

	try {
		content = await categoriaService.removeCategoria(id);
	} catch (error) {
		code = error.statusCode || 500
		content = { error: error.errorMessage }	
	}
	res.status(code).json(content)
}

//Update categoria by Id
exports.update = async (req,res) => {
	let id = req.params.categoriaId;
	let nombre = req.body.nombre;
	let code = 200;
	let content = {};

	try {
		content = await categoriaService.updateCategoria(nombre,id)
	} catch (error) {
		code = error.statusCode || 500;
		content = { error : error.errorMessage}
	}
	res.status(code).json(content)
}