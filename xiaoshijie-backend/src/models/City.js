const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const City = sequelize.define('City', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [1, 100],
      notEmpty: true
    }
  },
  name_en: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [1, 100],
      notEmpty: true
    }
  },
  display_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  unlock_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  month: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 12
    }
  },
  day: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 31
    }
  },
  season: {
    type: DataTypes.ENUM('spring', 'summer', 'autumn', 'winter'),
    allowNull: false
  },
  cover_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  thumbnail_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  video_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  audio_url: {
    type: DataTypes.STRING(500),
    allowNull: true
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
    defaultValue: false,
    allowNull: false
  }
}, {
  tableName: 'cities',
  indexes: [
    {
      fields: ['month']
    },
    {
      fields: ['season']
    },
    {
      fields: ['unlock_date']
    },
    {
      fields: ['is_published']
    }
  ]
});

// 实例方法：检查是否已解锁
City.prototype.isUnlocked = function() {
  const moment = require('moment');
  const unlockTime = moment(this.unlock_date).hour(5).minute(0).second(0);
  return moment().isAfter(unlockTime);
};

module.exports = City; 