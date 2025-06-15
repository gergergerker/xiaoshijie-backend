# 晓时节管理系统 - 后端API

基于 Node.js + Express + MySQL 的后端API服务，为晓时节管理系统前端提供数据支持。

## 🚀 快速开始

### 环境要求

- Node.js 18+
- MySQL 8.0+
- npm 或 yarn

### 安装步骤

1. **克隆项目**
```bash
git clone [项目地址]
cd xiaoshijie-backend
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**
```bash
cp .env.example .env
# 编辑 .env 文件，配置数据库连接等信息
```

4. **创建数据库**
```sql
CREATE DATABASE xiaoshijie CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

5. **初始化数据库**
```bash
node scripts/init-db.js
```

6. **启动服务**
```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

## 📁 项目结构

```
xiaoshijie-backend/
├── src/
│   ├── config/           # 配置文件
│   ├── controllers/      # 控制器
│   ├── middleware/       # 中间件
│   ├── models/          # 数据模型
│   ├── routes/          # 路由
│   ├── services/        # 业务逻辑
│   ├── utils/           # 工具函数
│   └── app.js           # 应用入口
├── scripts/             # 脚本文件
├── uploads/             # 文件上传目录
├── logs/               # 日志目录
├── .env.example        # 环境变量示例
└── README.md
```

## 🔧 API 接口

### 认证相关
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/me` - 获取当前用户信息
- `POST /api/auth/change-password` - 修改密码
- `POST /api/auth/logout` - 用户登出

### 城市管理
- `GET /api/cities` - 获取城市列表
- `GET /api/cities/:id` - 获取城市详情
- `POST /api/cities` - 创建城市
- `PUT /api/cities/:id` - 更新城市
- `DELETE /api/cities/:id` - 删除城市

### 博物馆管理
- `GET /api/museums` - 获取展品列表
- `GET /api/museums/:id` - 获取展品详情
- `POST /api/museums` - 创建展品
- `PUT /api/museums/:id` - 更新展品
- `DELETE /api/museums/:id` - 删除展品

### 题目管理
- `GET /api/questions` - 获取题目列表
- `GET /api/questions/:id` - 获取题目详情
- `POST /api/questions` - 创建题目
- `PUT /api/questions/:id` - 更新题目
- `DELETE /api/questions/:id` - 删除题目
- `POST /api/questions/:id/validate` - 验证答案

### 用户管理
- `GET /api/users` - 获取用户列表（仅管理员）
- `POST /api/users` - 创建用户（仅管理员）
- `PUT /api/users/:id` - 更新用户（仅管理员）
- `PATCH /api/users/:id/status` - 切换用户状态（仅管理员）

### 文件上传
- `POST /api/upload/image` - 上传图片
- `POST /api/upload/video` - 上传视频
- `POST /api/upload/audio` - 上传音频
- `POST /api/upload/pdf` - 上传PDF
- `DELETE /api/upload/:filename` - 删除文件

## 🔐 权限说明

系统支持两种用户角色：

- **管理员 (admin)**: 拥有所有功能权限
- **编辑员 (editor)**: 可以管理内容，但无法删除数据和管理用户

## 🗄️ 数据库设计

### 用户表 (users)
- 用户基本信息、角色、登录状态等

### 城市表 (cities)
- 城市卡片信息、发布时间、解锁状态等

### 城市内容板块表 (city_sections)
- 城市卡片的内容板块详情

### 题目表 (questions)
- 训练题目和PK赛题目

### 博物馆展品表 (museum_items)
- 晓城博物馆和晓时博物馆的展品信息

## 🔧 开发说明

### 默认账号
初始化数据库后会创建以下默认账号：

- **管理员**: 用户名 `admin`, 密码 `admin123`
- **编辑员**: 用户名 `editor`, 密码 `editor123`

### 环境变量配置
主要配置项：

```env
# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_NAME=xiaoshijie
DB_USER=root
DB_PASSWORD=your_password

# JWT配置
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

# 服务器配置
PORT=8080
NODE_ENV=development
```

### 日志系统
- 开发环境：控制台输出 + 文件记录
- 生产环境：仅文件记录
- 日志文件位置：`logs/` 目录

### 文件上传
- 上传目录：`uploads/`
- 支持格式：图片、视频、音频、PDF
- 文件大小限制：10MB

## 🚀 部署

### 使用 PM2 部署
```bash
npm install -g pm2
pm2 start ecosystem.config.js
```

### 使用 Docker 部署
```bash
docker build -t xiaoshijie-backend .
docker run -p 8080:8080 xiaoshijie-backend
```

## 📝 开发计划

- [x] 基础架构搭建
- [x] 用户认证系统
- [x] 权限控制中间件
- [ ] 城市管理功能实现
- [ ] 博物馆管理功能实现
- [ ] 题目管理功能实现
- [ ] 文件上传功能实现
- [ ] API文档完善
- [ ] 单元测试编写

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## �� 许可证

MIT License 