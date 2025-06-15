const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MuseumItem = sequelize.define('MuseumItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  museum_type: {
    type: DataTypes.ENUM('city', 'season'),
    allowNull: false,
    comment: 'city: 晓城博物馆, season: 晓时博物馆'
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      len: [1, 200],
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: '展品分类'
  },
  display_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: '展示顺序'
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  is_published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
}, {
  tableName: 'museum_items',
  indexes: [
    {
      fields: ['museum_type']
    },
    {
      fields: ['category']
    },
    {
      fields: ['display_order']
    },
    {
      fields: ['is_published']
    }
  ]
});

module.exports = MuseumItem; 