import db from '../../models';

const startDB = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await db.sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startDB();

export default db;
