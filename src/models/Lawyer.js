import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import elasticClient from '../config/elasticsearch.js';

const Lawyer = sequelize.define('Lawyer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  specialty: {
    type: DataTypes.STRING,
    allowNull: false
  },
  experience_years: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  hooks: {
    afterCreate: async (lawyer) => {
      await elasticClient.index({
        index: 'lawyers',
        body: lawyer.toJSON()
      });
    },
    afterUpdate: async (lawyer) => {
      await elasticClient.update({
        index: 'lawyers',
        id: lawyer.id,
        body: { doc: lawyer.toJSON() }
      });
    }
  }
});

export default Lawyer;