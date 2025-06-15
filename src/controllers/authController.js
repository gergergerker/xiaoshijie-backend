const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/User');
const { JWT_SECRET, WECHAT_APP_ID, WECHAT_APP_SECRET } = process.env;

class AuthController {
  // 微信小程序登录
  async login(req, res) {
    try {
      const { code, userInfo } = req.body;

      if (!code) {
        return res.status(400).json({
          success: false,
          message: '缺少微信授权码'
        });
      }

      // 向微信服务器获取session_key和openid
      const wechatResponse = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
        params: {
          appid: WECHAT_APP_ID,
          secret: WECHAT_APP_SECRET,
          js_code: code,
          grant_type: 'authorization_code'
        }
      });

      const { openid, session_key, errcode, errmsg } = wechatResponse.data;

      if (errcode) {
        console.error('微信登录错误:', errcode, errmsg);
        return res.status(400).json({
          success: false,
          message: '微信登录失败'
        });
      }

      // 查找或创建用户
      let user = await User.findOne({ openid });
      
      if (!user) {
        // 创建新用户
        user = new User({
          openid,
          nickname: userInfo?.nickName || '晓时节用户',
          avatar: userInfo?.avatarUrl || '',
          gender: userInfo?.gender || 0,
          city: userInfo?.city || '',
          province: userInfo?.province || '',
          country: userInfo?.country || '',
          sessionKey: session_key,
          treeCount: 0,
          lantingTrees: 0,
          timeSequenceTrees: 0,
          consumedTrees: 0
        });
      } else {
        // 更新用户信息
        if (userInfo) {
          user.nickname = userInfo.nickName || user.nickname;
          user.avatar = userInfo.avatarUrl || user.avatar;
          user.gender = userInfo.gender || user.gender;
          user.city = userInfo.city || user.city;
          user.province = userInfo.province || user.province;
          user.country = userInfo.country || user.country;
        }
        user.sessionKey = session_key;
        user.lastLoginAt = new Date();
      }

      await user.save();

      // 生成JWT token
      const token = jwt.sign(
        { 
          userId: user._id, 
          openid: user.openid 
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        message: '登录成功',
        token,
        user: {
          id: user._id,
          nickname: user.nickname,
          avatar: user.avatar,
          treeCount: user.treeCount,
          lantingTrees: user.lantingTrees,
          timeSequenceTrees: user.timeSequenceTrees,
          consumedTrees: user.consumedTrees
        }
      });

    } catch (error) {
      console.error('登录错误:', error);
      res.status(500).json({
        success: false,
        message: '服务器内部错误'
      });
    }
  }

  // 验证token
  async validateToken(req, res) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({
          success: false,
          message: '缺少访问令牌'
        });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: '用户不存在'
        });
      }

      res.json({
        success: true,
        user: {
          id: user._id,
          nickname: user.nickname,
          avatar: user.avatar,
          treeCount: user.treeCount,
          lantingTrees: user.lantingTrees,
          timeSequenceTrees: user.timeSequenceTrees,
          consumedTrees: user.consumedTrees
        }
      });

    } catch (error) {
      console.error('Token验证错误:', error);
      res.status(401).json({
        success: false,
        message: 'Token无效或已过期'
      });
    }
  }

  // 刷新token
  async refreshToken(req, res) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({
          success: false,
          message: '缺少访问令牌'
        });
      }

      const decoded = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: '用户不存在'
        });
      }

      // 生成新的token
      const newToken = jwt.sign(
        { 
          userId: user._id, 
          openid: user.openid 
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        token: newToken,
        user: {
          id: user._id,
          nickname: user.nickname,
          avatar: user.avatar,
          treeCount: user.treeCount
        }
      });

    } catch (error) {
      console.error('Token刷新错误:', error);
      res.status(401).json({
        success: false,
        message: 'Token刷新失败'
      });
    }
  }
}

module.exports = new AuthController(); 