const { sequelize, User } = require('../src/models');
const logger = require('../src/utils/logger');

async function initDatabase() {
  try {
    logger.info('开始初始化数据库...');
    
    // 测试数据库连接
    await sequelize.authenticate();
    logger.info('数据库连接成功');
    
    // 同步数据库模型
    await sequelize.sync({ force: true }); // 注意：force: true 会删除现有表
    logger.info('数据库模型同步完成');
    
    // 创建默认管理员用户
    const adminUser = await User.create({
      username: 'admin',
      password: 'admin123',
      name: '系统管理员',
      role: 'admin'
    });
    logger.info('默认管理员用户创建成功:', adminUser.username);
    
    // 创建默认编辑员用户
    const editorUser = await User.create({
      username: 'editor',
      password: 'editor123',
      name: '内容编辑员',
      role: 'editor'
    });
    logger.info('默认编辑员用户创建成功:', editorUser.username);
    
    logger.info('数据库初始化完成！');
    logger.info('默认账号信息：');
    logger.info('管理员 - 用户名: admin, 密码: admin123');
    logger.info('编辑员 - 用户名: editor, 密码: editor123');
    
  } catch (error) {
    logger.error('数据库初始化失败:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  initDatabase();
}

module.exports = initDatabase; 