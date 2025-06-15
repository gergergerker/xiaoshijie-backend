const express = require('express');
const router = express.Router();
const { authenticateToken, requireEditor, requireAdmin } = require('../middleware/auth');

// 获取博物馆展品列表
router.get('/', authenticateToken, (req, res) => {
  res.json({ message: '博物馆展品列表接口 - 待实现' });
});

// 获取单个展品详情
router.get('/:id', authenticateToken, (req, res) => {
  res.json({ message: '展品详情接口 - 待实现' });
});

// 创建展品 - 编辑员及以上权限
router.post('/', authenticateToken, requireEditor, (req, res) => {
  res.json({ message: '创建展品接口 - 待实现' });
});

// 更新展品 - 编辑员及以上权限
router.put('/:id', authenticateToken, requireEditor, (req, res) => {
  res.json({ message: '更新展品接口 - 待实现' });
});

// 删除展品 - 仅管理员权限
router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  res.json({ message: '删除展品接口 - 待实现' });
});

module.exports = router; 