export default {
  sequelize: {
    dialect: 'postgres',
    host: 'localhost',
    port: '5432',
    database: 'face_app_db',
    username: 'developer',
    password: 'developer',
    pool: {
      max: 10, min: 0, idle: 10000, acquire: 60000, evict: 1000,
    },
    logging: false,
    define: {
      paranoid: true,
    },
  },
};
