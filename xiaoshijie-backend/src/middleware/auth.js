const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { errorResponse } = require('../utils/response');
const logger = require('../utils/logger');

/**
 * JWT认证中间件
 */
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return errorResponse(res, '访问令牌缺失', 401);
    }

    // 验证token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 查找用户
    const user = await User.findByPk(decoded.userId, {
      attributes: ['id', 'username', 'name', 'role', 'is_active']
    });

    if (!user || !user.is_active) {
      return errorResponse(res, '用户不存在或已被禁用', 401);
    }

    // 将用户信息添加到请求对象
    req.user = {
      userId: user.id,
      username: user.username,
      name: user.name,
      role: user.role
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return errorResponse(res, '无效的访问令牌', 401);
    } else if (error.name === 'TokenExpiredError') {
      return errorResponse(res, '访问令牌已过期', 401);
    }
    
    logger.error('认证中间件错误:', error);
    return errorResponse(res, '认证失败', 401);
  }
};

/**
 * 权限检查中间件
 * @param {Array} roles - 允许的角色数组
 */
const requireRoles = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, '用户未认证', 401);
    }

    if (!roles.includes(req.user.role)) {
      return errorResponse(res, '权限不足', 403);
    }

    next();
  };
};

/**
 * 管理员权限中间件
 */
const requireAdmin = requireRoles(['admin']);

/**
 * 编辑员及以上权限中间件
 */
const requireEditor = requireRoles(['admin', 'editor']);

module.exports = {
  authenticateToken,
  requireRoles,
  requireAdmin,
  requireEditor
}; 