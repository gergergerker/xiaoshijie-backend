const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.ENUM('single_choice', 'multiple_choice', 'fill_blank'),
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('city', 'season'),
    allowNull: false
  },
  question_text: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  options: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: '选择题选项，JSON格式存储'
  },
  correct_answer: {
    type: DataTypes.JSON,
    allowNull: false,
    comment: '正确答案，JSON格式存储'
  },
  publish_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
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
  tableName: 'questions',
  indexes: [
    {
      fields: ['type']
    },
    {
      fields: ['category']
    },
    {
      fields: ['publish_date']
    },
    {
      fields: ['is_published']
    }
  ]
});

// 实例方法：检查是否已发布
Question.prototype.isPublished = function() {
  const moment = require('moment');
  const publishTime = moment(this.publish_date).hour(5).minute(0).second(0);
  return moment().isAfter(publishTime);
};

// 实例方法：验证答案
Question.prototype.validateAnswer = function(userAnswer) {
  const correctAnswer = this.correct_answer;
  
  if (this.type === 'single_choice') {
    return userAnswer === correctAnswer;
  } else if (this.type === 'multiple_choice') {
    if (!Array.isArray(userAnswer) || !Array.isArray(correctAnswer)) {
      return false;
    }
    return userAnswer.sort().join(',') === correctAnswer.sort().join(',');
  } else if (this.type === 'fill_blank') {
    if (Array.isArray(correctAnswer)) {
      return correctAnswer.some(answer => 
        userAnswer.toLowerCase().trim() === answer.toLowerCase().trim()
      );
    }
    return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
  }
  
  return false;
};

module.exports = Question; 