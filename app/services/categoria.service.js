const db = require('../config/db.config.js');
const Categoria = db.categoria;
const errors = require('../errors/errors')

//Crear categoria
const createCategoria = async(nombre) => {
    const newCategoria = {nombre};
    return await Categoria.create(newCategoria)
}

//GET todas las categorias
const findAllCategorias = async () => {

    let categorias = await Categoria.findAll({attributes: [['id', 'categoriaId'], 'nombre']})
    
    if (!categorias) {
        throw new errors.NotFound()
      }

      return categorias;
}

//GET categorias by pk

const findByPkCategoria = async (categoriaId) =>{

    let categoriaByPk = await Categoria.findByPk(categoriaId)

    if(!categoriaByPk){
        throw new errors.NotFound()
    }
    return categoriaByPk;
}

//delete categoria
const removeCategoria = async (categoriaId) =>{
   
    let categoriaToRemove = await Categoria.findOne({ where:{id:categoriaId}})
    
    if(!categoriaToRemove){
        throw new errors.NotFound()
    }

    await categoriaToRemove.destroy()

    return {ok: true}
}

//UPDATE categoria
const updateCategoria = async (nombre,categoriaId)=> {

    let categoria = await Categoria.findOne({where:{id:categoriaId}})
    if(!categoria){
        throw new errors.NotFound()
    }
    categoria.nombre = nombre ? nombre : categoria.nombre;

    await categoria.save();
    await categoria.reload();

    return categoria.toJSON();
}

module.exports = {createCategoria, findAllCategorias, findByPkCategoria, removeCategoria, updateCategoria}