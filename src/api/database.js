import Sequelize from 'sequelize';

import config from './config';

const sequelize = new Sequelize(config.sequelize);

sequelize.define('faces', {
  gender: { type: sequelize.Sequelize.DataTypes.ENUM('male', 'female') },
  age: { type: sequelize.Sequelize.DataTypes.INTEGER },
  image: { type: sequelize.Sequelize.DataTypes.JSONB },
});

sequelize.authenticate();

/* force creating table if not exists */
sequelize.sync({ logging: console.log }); // eslint-disable-line no-console

export default sequelize;
