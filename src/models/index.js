import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import {dbConfig} from '../config';

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  ...dbConfig,
  logging: false,
});

fs
    .readdirSync(__dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

Object.keys(db).forEach((modelName) => {
  if ('loadScopes' in db[modelName]) {
    db[modelName].loadScopes(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
