const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// 获取用户列表 - 仅管理员
router.get('/', authenticateToken, requireAdmin, (req, res) => {
  res.json({ message: '用户列表接口 - 待实现' });
});

// 获取单个用户详情 - 仅管理员
router.get('/:id', authenticateToken, requireAdmin, (req, res) => {
  res.json({ message: '用户详情接口 - 待实现' });
});

// 创建用户 - 仅管理员
router.post('/', authenticateToken, requireAdmin, (req, res) => {
  res.json({ message: '创建用户接口 - 待实现' });
});

// 更新用户 - 仅管理员
router.put('/:id', authenticateToken, requireAdmin, (req, res) => {
  res.json({ message: '更新用户接口 - 待实现' });
});

// 禁用/启用用户 - 仅管理员
router.patch('/:id/status', authenticateToken, requireAdmin, (req, res) => {
  res.json({ message: '用户状态切换接口 - 待实现' });
});

module.exports = router; 