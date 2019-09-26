export default {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'root',
  host: process.env.DB_HOSTNAME || 'localhost',
  port: process.env.DB_PORT || '5432',
  dialect: 'postgres',
};
