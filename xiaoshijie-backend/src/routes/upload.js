const express = require('express');
const router = express.Router();
const { authenticateToken, requireEditor } = require('../middleware/auth');

// 上传图片文件 - 编辑员及以上权限
router.post('/image', authenticateToken, requireEditor, (req, res) => {
  res.json({ message: '图片上传接口 - 待实现' });
});

// 上传视频文件 - 编辑员及以上权限
router.post('/video', authenticateToken, requireEditor, (req, res) => {
  res.json({ message: '视频上传接口 - 待实现' });
});

// 上传音频文件 - 编辑员及以上权限
router.post('/audio', authenticateToken, requireEditor, (req, res) => {
  res.json({ message: '音频上传接口 - 待实现' });
});

// 上传PDF文件 - 编辑员及以上权限
router.post('/pdf', authenticateToken, requireEditor, (req, res) => {
  res.json({ message: 'PDF上传接口 - 待实现' });
});

// 删除文件 - 编辑员及以上权限
router.delete('/:filename', authenticateToken, requireEditor, (req, res) => {
  res.json({ message: '文件删除接口 - 待实现' });
});

module.exports = router; 