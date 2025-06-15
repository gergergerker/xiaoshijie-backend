const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// 微信小程序登录
router.post('/login', authController.login);

// 验证token
router.post('/validate', authController.validateToken);

// 刷新token
router.post('/refresh', authController.refreshToken);

// 登出（可选，主要是清除客户端token）
router.post('/logout', authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: '登出成功'
  });
});

module.exports = router; 