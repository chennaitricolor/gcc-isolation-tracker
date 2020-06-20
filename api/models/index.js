const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const camelCase = require('camelcase');
const config = require('../config');

const db = {};

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db);
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[camelCase(model.name)] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;