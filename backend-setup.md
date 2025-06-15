# 晓时节管理系统 - 后端开发指南

## 1. 技术栈选择

### 推荐技术栈：Node.js + Express
- **运行环境**：Node.js 18+
- **Web框架**：Express.js
- **数据库**：MySQL 8.0+ 或 PostgreSQL 14+
- **ORM**：Sequelize 或 Prisma
- **认证**：JWT (JSON Web Token)
- **文件存储**：Multer + 云存储(阿里云OSS/腾讯云COS)
- **API文档**：Swagger
- **日志**：Winston
- **进程管理**：PM2

## 2. 项目结构

```
xiaoshijie-backend/
├── src/
│   ├── config/           # 配置文件
│   │   ├── database.js
│   │   ├── jwt.js
│   │   └── upload.js
│   ├── controllers/      # 控制器
│   │   ├── authController.js
│   │   ├── cityController.js
│   │   ├── museumController.js
│   │   ├── questionController.js
│   │   └── userController.js
│   ├── middleware/       # 中间件
│   │   ├── auth.js
│   │   ├── upload.js
│   │   └── validation.js
│   ├── models/          # 数据模型
│   │   ├── User.js
│   │   ├── City.js
│   │   ├── Museum.js
│   │   └── Question.js
│   ├── routes/          # 路由
│   │   ├── auth.js
│   │   ├── cities.js
│   │   ├── museums.js
│   │   ├── questions.js
│   │   └── users.js
│   ├── services/        # 业务逻辑
│   │   ├── authService.js
│   │   ├── cityService.js
│   │   └── uploadService.js
│   ├── utils/           # 工具函数
│   │   ├── logger.js
│   │   ├── response.js
│   │   └── validator.js
│   └── app.js           # 应用入口
├── uploads/             # 文件上传目录
├── logs/               # 日志目录
├── tests/              # 测试文件
├── docs/               # API文档
├── .env                # 环境变量
├── .env.example        # 环境变量示例
├── package.json
├── README.md
└── ecosystem.config.js  # PM2配置
```

## 3. 数据库设计

### 3.1 用户表 (users)
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'editor') DEFAULT 'editor',
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
```

### 3.2 城市卡片表 (cities)
```sql
CREATE TABLE cities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    name_en VARCHAR(100),
    country VARCHAR(100) NOT NULL,
    display_date DATE NOT NULL,
    unlock_date DATE NOT NULL,
    month INT NOT NULL,
    day INT NOT NULL,
    season ENUM('spring', 'summer', 'autumn', 'winter') NOT NULL,
    cover_url VARCHAR(500),
    thumbnail_url VARCHAR(500),
    video_url VARCHAR(500),
    audio_url VARCHAR(500),
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_published BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (created_by) REFERENCES users(id)
);
```

### 3.3 城市内容板块表 (city_sections)
```sql
CREATE TABLE city_sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    city_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    image_url VARCHAR(500),
    section_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
);
```

### 3.4 题目表 (questions)
```sql
CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('single_choice', 'multiple_choice', 'fill_blank') NOT NULL,
    category ENUM('city', 'season') NOT NULL,
    question_text TEXT NOT NULL,
    options JSON, -- 选择题选项
    correct_answer JSON NOT NULL, -- 正确答案
    publish_date DATE NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_published BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (created_by) REFERENCES users(id)
);
```

### 3.5 博物馆展品表 (museum_items)
```sql
CREATE TABLE museum_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    museum_type ENUM('city', 'season') NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    category VARCHAR(100),
    display_order INT DEFAULT 0,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_published BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (created_by) REFERENCES users(id)
);
```

## 4. 环境配置

### 4.1 创建 .env 文件
```env
# 服务器配置
NODE_ENV=development
PORT=8080
HOST=localhost

# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_NAME=xiaoshijie
DB_USER=root
DB_PASSWORD=your_password

# JWT配置
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d

# 文件上传配置
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760  # 10MB

# 云存储配置 (可选)
OSS_REGION=oss-cn-hangzhou
OSS_ACCESS_KEY_ID=your_access_key
OSS_ACCESS_KEY_SECRET=your_secret_key
OSS_BUCKET=xiaoshijie-files

# 日志配置
LOG_LEVEL=info
LOG_FILE=./logs/app.log

# CORS配置
CORS_ORIGIN=http://localhost:3000
```

### 4.2 package.json
```json
{
  "name": "xiaoshijie-backend",
  "version": "1.0.0",
  "description": "晓时节管理系统后端API",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "test": "jest",
    "migrate": "sequelize-cli db:migrate",
    "seed": "sequelize-cli db:seed:all"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.0",
    "sequelize": "^6.32.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "express-rate-limit": "^6.8.1",
    "joi": "^17.9.2",
    "winston": "^3.10.0",
    "moment": "^2.29.4",
    "dotenv": "^16.3.1",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.2",
    "supertest": "^6.3.3",
    "sequelize-cli": "^6.6.1"
  }
}
```

## 5. 核心代码实现

### 5.1 应用入口 (src/app.js)
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const logger = require('./utils/logger');
const { sequelize } = require('./models');

// 路由导入
const authRoutes = require('./routes/auth');
const cityRoutes = require('./routes/cities');
const museumRoutes = require('./routes/museums');
const questionRoutes = require('./routes/questions');
const userRoutes = require('./routes/users');

const app = express();

// 中间件配置
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// 限流配置
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100 // 限制每个IP 15分钟内最多100个请求
});
app.use('/api', limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API路由
app.use('/api/auth', authRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/museums', museumRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/users', userRoutes);

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({
    code: 500,
    message: '服务器内部错误',
    data: null
  });
});

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({
    code: 404,
    message: '接口不存在',
    data: null
  });
});

const PORT = process.env.PORT || 8080;

// 启动服务器
async function startServer() {
  try {
    // 数据库连接测试
    await sequelize.authenticate();
    logger.info('数据库连接成功');
    
    // 同步数据库模型
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      logger.info('数据库模型同步完成');
    }
    
    app.listen(PORT, () => {
      logger.info(`服务器启动成功，端口: ${PORT}`);
      logger.info(`API文档: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    logger.error('服务器启动失败:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
```

### 5.2 用户认证控制器 (src/controllers/authController.js)
```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { successResponse, errorResponse } = require('../utils/response');
const logger = require('../utils/logger');

class AuthController {
  // 用户登录
  async login(req, res) {
    try {
      const { username, password } = req.body;
      
      // 查找用户
      const user = await User.findOne({ 
        where: { username, is_active: true } 
      });
      
      if (!user) {
        return errorResponse(res, '用户名或密码错误', 401);
      }
      
      // 验证密码
      const isValidPassword = await bcrypt.compare(password, user.password);
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
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      
      // 更新最后登录时间
      await user.update({ last_login: new Date() });
      
      // 返回用户信息和token
      const userData = {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
      };
      
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
  
  // 获取当前用户信息
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
  
  // 修改密码
  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user.userId;
      
      const user = await User.findByPk(userId);
      if (!user) {
        return errorResponse(res, '用户不存在', 404);
      }
      
      // 验证旧密码
      const isValidPassword = await bcrypt.compare(oldPassword, user.password);
      if (!isValidPassword) {
        return errorResponse(res, '原密码错误', 400);
      }
      
      // 加密新密码
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      
      // 更新密码
      await user.update({ password: hashedPassword });
      
      logger.info(`用户修改密码: ${user.username}`);
      
      return successResponse(res, '密码修改成功');
    } catch (error) {
      logger.error('修改密码失败:', error);
      return errorResponse(res, '修改密码失败', 500);
    }
  }
}

module.exports = new AuthController();
```

### 5.3 城市卡片控制器 (src/controllers/cityController.js)
```javascript
const { City, CitySection } = require('../models');
const { successResponse, errorResponse } = require('../utils/response');
const logger = require('../utils/logger');
const moment = require('moment');

class CityController {
  // 获取城市列表
  async getCities(req, res) {
    try {
      const { page = 1, limit = 10, search, month, season } = req.query;
      const offset = (page - 1) * limit;
      
      const whereClause = {};
      if (search) {
        whereClause.name = { [Op.like]: `%${search}%` };
      }
      if (month) {
        whereClause.month = month;
      }
      if (season) {
        whereClause.season = season;
      }
      
      const { count, rows } = await City.findAndCountAll({
        where: whereClause,
        include: [{
          model: CitySection,
          as: 'sections'
        }],
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['created_at', 'DESC']]
      });
      
      // 计算是否已解锁
      const cities = rows.map(city => {
        const unlocked = moment().isAfter(
          moment(city.unlock_date).hour(5).minute(0).second(0)
        );
        return {
          ...city.toJSON(),
          unlocked
        };
      });
      
      return successResponse(res, '获取城市列表成功', {
        list: cities,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit)
      });
    } catch (error) {
      logger.error('获取城市列表失败:', error);
      return errorResponse(res, '获取城市列表失败', 500);
    }
  }
  
  // 创建城市卡片
  async createCity(req, res) {
    try {
      const cityData = req.body;
      cityData.created_by = req.user.userId;
      
      // 创建城市记录
      const city = await City.create(cityData);
      
      // 创建内容板块
      if (cityData.sections && cityData.sections.length > 0) {
        const sections = cityData.sections.map((section, index) => ({
          ...section,
          city_id: city.id,
          section_order: index
        }));
        await CitySection.bulkCreate(sections);
      }
      
      logger.info(`创建城市卡片: ${city.name}, 操作人: ${req.user.username}`);
      
      return successResponse(res, '城市卡片创建成功', city);
    } catch (error) {
      logger.error('创建城市卡片失败:', error);
      return errorResponse(res, '创建城市卡片失败', 500);
    }
  }
  
  // 更新城市卡片
  async updateCity(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const city = await City.findByPk(id);
      if (!city) {
        return errorResponse(res, '城市卡片不存在', 404);
      }
      
      // 更新城市信息
      await city.update(updateData);
      
      // 更新内容板块
      if (updateData.sections) {
        // 删除原有板块
        await CitySection.destroy({ where: { city_id: id } });
        
        // 创建新板块
        if (updateData.sections.length > 0) {
          const sections = updateData.sections.map((section, index) => ({
            ...section,
            city_id: id,
            section_order: index
          }));
          await CitySection.bulkCreate(sections);
        }
      }
      
      logger.info(`更新城市卡片: ${city.name}, 操作人: ${req.user.username}`);
      
      return successResponse(res, '城市卡片更新成功');
    } catch (error) {
      logger.error('更新城市卡片失败:', error);
      return errorResponse(res, '更新城市卡片失败', 500);
    }
  }
  
  // 删除城市卡片
  async deleteCity(req, res) {
    try {
      const { id } = req.params;
      
      const city = await City.findByPk(id);
      if (!city) {
        return errorResponse(res, '城市卡片不存在', 404);
      }
      
      await city.destroy();
      
      logger.info(`删除城市卡片: ${city.name}, 操作人: ${req.user.username}`);
      
      return successResponse(res, '城市卡片删除成功');
    } catch (error) {
      logger.error('删除城市卡片失败:', error);
      return errorResponse(res, '删除城市卡片失败', 500);
    }
  }
}

module.exports = new CityController();
```

## 6. 部署配置

### 6.1 PM2 配置 (ecosystem.config.js)
```javascript
module.exports = {
  apps: [{
    name: 'xiaoshijie-backend',
    script: 'src/app.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 8080
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

### 6.2 Docker 配置
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
```

## 7. 快速开始

### 7.1 安装依赖
```bash
# 创建后端项目目录
mkdir xiaoshijie-backend
cd xiaoshijie-backend

# 初始化项目
npm init -y

# 安装依赖
npm install express mysql2 sequelize bcryptjs jsonwebtoken multer cors helmet express-rate-limit joi winston moment dotenv swagger-jsdoc swagger-ui-express

# 安装开发依赖
npm install -D nodemon jest supertest sequelize-cli
```

### 7.2 数据库初始化
```bash
# 创建数据库
mysql -u root -p
CREATE DATABASE xiaoshijie CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 运行迁移
npm run migrate

# 运行种子数据
npm run seed
```

### 7.3 启动服务
```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

## 8. API 接口文档

服务启动后访问：`http://localhost:8080/api-docs`

主要接口：
- `POST /api/auth/login` - 用户登录
- `GET /api/cities` - 获取城市列表
- `POST /api/cities` - 创建城市卡片
- `PUT /api/cities/:id` - 更新城市卡片
- `DELETE /api/cities/:id` - 删除城市卡片
- `GET /api/questions` - 获取题目列表
- `POST /api/upload` - 文件上传

这样就有了一个完整的后端系统来支持前端的所有功能！ 