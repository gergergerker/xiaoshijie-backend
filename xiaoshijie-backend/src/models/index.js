const sequelize = require('../config/database');
const User = require('./User');
const City = require('./City');
const CitySection = require('./CitySection');
const Question = require('./Question');
const MuseumItem = require('./MuseumItem');

// 建立模型关联
// 用户与城市的关联
User.hasMany(City, { foreignKey: 'created_by', as: 'cities' });
City.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

// 城市与内容板块的关联
City.hasMany(CitySection, { foreignKey: 'city_id', as: 'sections' });
CitySection.belongsTo(City, { foreignKey: 'city_id', as: 'city' });

// 用户与题目的关联
User.hasMany(Question, { foreignKey: 'created_by', as: 'questions' });
Question.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

// 用户与博物馆展品的关联
User.hasMany(MuseumItem, { foreignKey: 'created_by', as: 'museumItems' });
MuseumItem.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

module.exports = {
  sequelize,
  User,
  City,
  CitySection,
  Question,
  MuseumItem
}; 