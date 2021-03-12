const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.categoria = require('../models/categoria.models.js')(sequelize, Sequelize);
db.posteo = require('../models/posteo.models.js')(sequelize, Sequelize);

// categorias y productos por categoria'id
db.categoria.hasMany(db.posteo, {foreignKey: 'fk_categoriaId', sourceKey: 'id'});
db.posteo.belongsTo(db.categoria, {foreignKey: 'fk_categoriaId', targetKey: 'id'});

module.exports = db;