module.exports = (sequelize, Sequelize) => {
	const Posteo = sequelize.define('posteo', {
		titulo: {
			type: Sequelize.STRING,
			// allowNull: false,
			// validate: {
			// 	notNull: {
			// 		msg: 'Ingrese titulo'
			// 	}
			// }
		},
		contenido: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Ingrese contenido'
				}
			}
		}
	});

	return Posteo;
}