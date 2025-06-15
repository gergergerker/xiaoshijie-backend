const express = require('express');
const router = express.Router();
const { authenticateToken, requireEditor, requireAdmin } = require('../middleware/auth');

// 获取题目列表
router.get('/', authenticateToken, (req, res) => {
  res.json({ message: '题目列表接口 - 待实现' });
});

// 获取单个题目详情
router.get('/:id', authenticateToken, (req, res) => {
  res.json({ message: '题目详情接口 - 待实现' });
});

// 创建题目 - 编辑员及以上权限
router.post('/', authenticateToken, requireEditor, (req, res) => {
  res.json({ message: '创建题目接口 - 待实现' });
});

// 更新题目 - 编辑员及以上权限
router.put('/:id', authenticateToken, requireEditor, (req, res) => {
  res.json({ message: '更新题目接口 - 待实现' });
});

// 删除题目 - 仅管理员权限
router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  res.json({ message: '删除题目接口 - 待实现' });
});

// 验证答案
router.post('/:id/validate', authenticateToken, (req, res) => {
  res.json({ message: '验证答案接口 - 待实现' });
});

module.exports = router; 