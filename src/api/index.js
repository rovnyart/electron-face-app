import db from './database';

const getAll = async () => {
  const faces = await db.models.faces.findAll({ order: [['id', 'DESC']] });
  return faces || [];
};

const create = (values) => db.models.faces.create(values);

export default {
  getAll,
  create,
};
