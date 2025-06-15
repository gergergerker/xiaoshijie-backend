const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { successResponse, errorResponse } = require('../utils/response');
const logger = require('../utils/logger');

class AuthController {
  /**
   * 用户登录
   */
  async login(req, res) {
    try {
      const { username, password } = req.body;
      
      // 验证输入
      if (!username || !password) {
        return errorResponse(res, '用户名和密码不能为空', 400);
      }
      
      // 查找用户
      const user = await User.findOne({ 
        where: { username, is_active: true } 
      });
      
      if (!user) {
        return errorResponse(res, '用户名或密码错误', 401);
      }
      
      // 验证密码
      const isValidPassword = await user.validatePassword(password);
      if (!isValidPassword) {
        return errorResponse(res, '用户名或密码错误', 401);
      }
      
      // 生成JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          username: user.username, 
          role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );
      
      // 更新最后登录时间
      await user.update({ last_login: new Date() });
      
      // 返回用户信息和token
      const userData = user.toSafeJSON();
      
      logger.info(`用户登录成功: ${username}`);
      
      return successResponse(res, '登录成功', {
        user: userData,
        token
      });
      
    } catch (error) {
      logger.error('登录失败:', error);
      return errorResponse(res, '登录失败', 500);
    }
  }
  
  /**
   * 获取当前用户信息
   */
  async getCurrentUser(req, res) {
    try {
      const user = await User.findByPk(req.user.userId, {
        attributes: ['id', 'username', 'name', 'role', 'last_login', 'created_at']
      });
      
      if (!user) {
        return errorResponse(res, '用户不存在', 404);
      }
      
      return successResponse(res, '获取用户信息成功', user);
    } catch (error) {
      logger.error('获取用户信息失败:', error);
      return errorResponse(res, '获取用户信息失败', 500);
    }
  }
  
  /**
   * 修改密码
   */
  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user.userId;
      
      // 验证输入
      if (!oldPassword || !newPassword) {
        return errorResponse(res, '原密码和新密码不能为空', 400);
      }
      
      if (newPassword.length < 6) {
        return errorResponse(res, '新密码长度不能少于6位', 400);
      }
      
      const user = await User.findByPk(userId);
      if (!user) {
        return errorResponse(res, '用户不存在', 404);
      }
      
      // 验证旧密码
      const isValidPassword = await user.validatePassword(oldPassword);
      if (!isValidPassword) {
        return errorResponse(res, '原密码错误', 400);
      }
      
      // 更新密码
      await user.update({ password: newPassword });
      
      logger.info(`用户修改密码: ${user.username}`);
      
      return successResponse(res, '密码修改成功');
    } catch (error) {
      logger.error('修改密码失败:', error);
      return errorResponse(res, '修改密码失败', 500);
    }
  }
  
  /**
   * 用户登出
   */
  async logout(req, res) {
    try {
      // JWT是无状态的，客户端删除token即可
      logger.info(`用户登出: ${req.user.username}`);
      return successResponse(res, '登出成功');
    } catch (error) {
      logger.error('登出失败:', error);
      return errorResponse(res, '登出失败', 500);
    }
  }
}

module.exports = new AuthController(); 