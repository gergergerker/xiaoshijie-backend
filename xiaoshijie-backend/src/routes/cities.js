const express = require('express');
const router = express.Router();
const { authenticateToken, requireEditor, requireAdmin } = require('../middleware/auth');

// 获取城市列表 - 所有认证用户可访问
router.get('/', authenticateToken, (req, res) => {
  res.json({ message: '城市列表接口 - 待实现' });
});

// 获取单个城市详情 - 所有认证用户可访问
router.get('/:id', authenticateToken, (req, res) => {
  res.json({ message: '城市详情接口 - 待实现' });
});

// 创建城市 - 编辑员及以上权限
router.post('/', authenticateToken, requireEditor, (req, res) => {
  res.json({ message: '创建城市接口 - 待实现' });
});

// 更新城市 - 编辑员及以上权限
router.put('/:id', authenticateToken, requireEditor, (req, res) => {
  res.json({ message: '更新城市接口 - 待实现' });
});

// 删除城市 - 仅管理员权限
router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  res.json({ message: '删除城市接口 - 待实现' });
});

module.exports = router; 