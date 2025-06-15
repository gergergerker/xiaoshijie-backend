const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // 微信相关信息
  openid: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  unionid: {
    type: String,
    sparse: true
  },
  sessionKey: {
    type: String,
    required: true
  },

  // 用户基本信息
  nickname: {
    type: String,
    required: true,
    default: '晓时节用户'
  },
  avatar: {
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    default: 0, // 0-未知, 1-男, 2-女
    enum: [0, 1, 2]
  },
  city: {
    type: String,
    default: ''
  },
  province: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },

  // 小树相关数据
  treeCount: {
    type: Number,
    default: 0,
    min: 0
  },
  lantingTrees: {
    type: Number,
    default: 0,
    min: 0
  },
  timeSequenceTrees: {
    type: Number,
    default: 0,
    min: 0
  },
  consumedTrees: {
    type: Number,
    default: 0,
    min: 0
  },

  // 用户状态
  status: {
    type: String,
    enum: ['active', 'inactive', 'banned'],
    default: 'active'
  },
  isVip: {
    type: Boolean,
    default: false
  },
  vipExpireAt: {
    type: Date,
    default: null
  },

  // 统计信息
  totalReadingTime: {
    type: Number,
    default: 0 // 总阅读时长（分钟）
  },
  totalReadingCount: {
    type: Number,
    default: 0 // 总阅读次数
  },
  consecutiveDays: {
    type: Number,
    default: 0 // 连续阅读天数
  },
  lastReadingDate: {
    type: Date,
    default: null
  },

  // 时间戳
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  lastLoginAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  versionKey: false
});

// 索引
userSchema.index({ openid: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ lastLoginAt: -1 });

// 虚拟字段：计算总小树数量
userSchema.virtual('totalTrees').get(function() {
  return this.lantingTrees + this.timeSequenceTrees - this.consumedTrees;
});

// 实例方法：更新小树数量
userSchema.methods.updateTreeCount = function() {
  this.treeCount = this.lantingTrees + this.timeSequenceTrees - this.consumedTrees;
  return this.save();
};

// 实例方法：获取小树
userSchema.methods.earnTree = function(source, amount = 1) {
  if (source === 'lanting') {
    this.lantingTrees += amount;
  } else if (source === 'timesequence') {
    this.timeSequenceTrees += amount;
  }
  
  this.treeCount = this.lantingTrees + this.timeSequenceTrees - this.consumedTrees;
  this.updatedAt = new Date();
  
  return this.save();
};

// 实例方法：消费小树
userSchema.methods.consumeTree = function(amount) {
  if (this.treeCount < amount) {
    throw new Error('小树数量不足');
  }
  
  this.consumedTrees += amount;
  this.treeCount = this.lantingTrees + this.timeSequenceTrees - this.consumedTrees;
  this.updatedAt = new Date();
  
  return this.save();
};

// 实例方法：更新阅读统计
userSchema.methods.updateReadingStats = function(readingTime) {
  this.totalReadingTime += readingTime;
  this.totalReadingCount += 1;
  
  // 检查连续阅读天数
  const today = new Date();
  const lastReading = this.lastReadingDate;
  
  if (lastReading) {
    const diffTime = Math.abs(today - lastReading);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      // 连续阅读
      this.consecutiveDays += 1;
    } else if (diffDays > 1) {
      // 中断了，重新开始
      this.consecutiveDays = 1;
    }
    // diffDays === 0 表示今天已经阅读过，不更新连续天数
  } else {
    // 第一次阅读
    this.consecutiveDays = 1;
  }
  
  this.lastReadingDate = today;
  this.updatedAt = new Date();
  
  return this.save();
};

// 静态方法：获取用户统计
userSchema.statics.getUserStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: null,
        totalUsers: { $sum: 1 },
        activeUsers: {
          $sum: {
            $cond: [{ $eq: ['$status', 'active'] }, 1, 0]
          }
        },
        totalTrees: { $sum: '$treeCount' },
        totalReadingTime: { $sum: '$totalReadingTime' }
      }
    }
  ]);
};

module.exports = mongoose.model('User', userSchema); 