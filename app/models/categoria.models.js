module.exports = (sequelize, Sequelize) => {
	const Categoria = sequelize.define('categoria', {
	  id: {
		type: Sequelize.INTEGER,
        autoIncrement: true,
		primaryKey: true
	  },
	  nombre: {
		  type: Sequelize.STRING,
		  allowNull: false,
			validate: {
				notNull: {
					msg: 'Ingrese nombre'
				}
			}
	  }
	});
	
	return Categoria;
}
