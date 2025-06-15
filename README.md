# 晓时节管理系统

这是一个完整的前后端分离的内容管理系统，包含React前端和Node.js后端。

## 🌐 访问地址

- **管理系统界面**: http://localhost:8080 （这是你要打开的地址）
- **后端API服务**: http://localhost:3001 （仅提供API接口，无界面）

## 🏗️ 系统架构

### 技术栈

**前端技术栈：**
- 前端框架：React 18
- UI组件库：Ant Design 5
- 路由：React Router 6
- 状态管理：React Hooks (useState, useEffect)
- 日期处理：Moment.js
- 构建工具：Vite 4
- HTTP客户端：Axios

**后端技术栈：**
- 运行环境：Node.js 16+
- Web框架：Express.js 4
- 数据库：SQLite 3 + Sequelize ORM 6
- 身份认证：JWT (JSON Web Token)
- 密码加密：bcryptjs
- 文件上传：multer
- 日志管理：Winston
- 安全中间件：helmet, cors
- 限流保护：express-rate-limit
- 开发工具：nodemon
- 环境变量：dotenv

**数据库设计：**
- 主数据库：SQLite（轻量级，适合中小型应用）
- ORM框架：Sequelize（支持模型定义、关联关系、数据迁移）
- 数据表：users（用户）、cities（城市）、city_sections（城市板块）、questions（题目）、museum_items（博物馆展品）

### 架构图

```
┌─────────────────┐    HTTP/HTTPS    ┌─────────────────┐    Sequelize ORM    ┌─────────────────┐
│   前端 (React)   │ ◄──────────────► │  后端 (Express)  │ ◄─────────────────► │ SQLite Database │
│   Port: 8080    │                  │   Port: 3001    │                     │  (本地文件)      │
│                 │                  │                 │                     │                 │
│ • Ant Design    │                  │ • JWT Auth      │                     │ • 用户表         │
│ • React Router  │                  │ • File Upload   │                     │ • 城市表         │
│ • Axios         │                  │ • Rate Limiting │                     │ • 题目表         │
│ • Vite          │                  │ • Winston Log   │                     │ • 博物馆表       │
└─────────────────┘                  └─────────────────┘                     └─────────────────┘
```

### 认证与授权流程

```
用户登录 → 后端验证用户名密码 → 生成JWT Token → 前端存储Token
    ↓
前端发起API请求 → 携带Authorization Header → 后端验证Token
    ↓
权限检查中间件 → 验证用户角色 → 允许/拒绝访问 → 返回结果
```

## 项目结构

```
晓时节后端/
├── xiaoshijie-backend/     # 后端API服务
│   ├── src/               # 后端源码
│   │   ├── config/        # 配置文件（数据库、JWT等）
│   │   ├── controllers/   # 控制器（业务逻辑处理）
│   │   ├── middleware/    # 中间件（认证、权限等）
│   │   ├── models/        # 数据模型（Sequelize模型定义）
│   │   ├── routes/        # 路由定义（API端点）
│   │   ├── services/      # 业务逻辑服务层
│   │   └── utils/         # 工具函数（日志、加密等）
│   ├── uploads/           # 文件上传目录
│   ├── logs/              # 日志文件目录
│   ├── database.sqlite    # SQLite数据库文件
│   ├── .env               # 环境变量配置
│   └── package.json       # 后端依赖配置
├── src/                   # 前端源码
│   ├── assets/            # 静态资源文件夹
│   ├── components/        # 公共组件
│   ├── pages/             # 页面组件
│   ├── utils/             # 工具函数（API请求、权限检查等）
│   └── App.jsx            # 应用入口
├── public/                # 前端静态资源
├── vite.config.js         # 前端构建配置
└── package.json           # 前端依赖配置
```

## 技术栈

### 前端
- React 18
- Ant Design 5
- Vite 4
- React Router 6

### 后端
- Node.js + Express
- SQLite + Sequelize ORM
- JWT 认证
- Winston 日志

## 🚀 快速启动

### 1. 启动后端服务

```bash
cd xiaoshijie-backend
npm install
npm run init-db  # 初始化数据库和创建默认账号（仅首次运行）
npm run dev      # 启动开发服务器
```

后端服务将在 http://localhost:3001 启动

### 2. 启动前端服务

```bash
# 在项目根目录
npm install
npm run dev      # 启动前端开发服务器
```

前端服务将在 http://localhost:8080 启动

### 3. 访问系统

打开浏览器访问：**http://localhost:8080**

## 🔑 默认账号

系统已预置两个测试账号：

- **管理员账号**
  - 用户名: `admin`
  - 密码: `admin123`
  - 权限: 完整的系统管理权限，包括所有CRUD操作

- **编辑员账号**
  - 用户名: `editor`
  - 密码: `editor123`
  - 权限: 内容编辑权限（可查看和编辑，但无删除功能）

**⚠️ 重要提醒**: 这些是系统初始化时自动创建的测试账号，生产环境中请及时修改密码或创建新的管理员账号。

## 📋 使用说明

1. **启动服务**: 确保前后端服务都已启动
2. **打开浏览器**: 访问 http://localhost:8080
3. **登录系统**: 使用上述默认账号登录
4. **开始管理**: 可以管理城市卡片、博物馆展品、题目等内容

## API 接口

后端提供以下主要接口：

- `POST /api/auth/login` - 用户登录
- `GET /api/health` - 健康检查
- `GET /api/cities` - 获取城市列表
- `POST /api/cities` - 创建城市
- `PUT /api/cities/:id` - 更新城市
- `DELETE /api/cities/:id` - 删除城市
- `GET /api/questions` - 获取题目列表
- `GET /api/museums` - 获取博物馆列表
- `POST /api/upload` - 文件上传

## 开发说明

### 环境配置

后端环境变量配置文件：`xiaoshijie-backend/.env`

```env
# 服务器配置
NODE_ENV=development
PORT=3001
HOST=localhost

# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_NAME=xiaoshijie
DB_USER=root
DB_PASSWORD=

# JWT配置
JWT_SECRET=xiaoshijie_super_secret_key_2024_change_in_production
JWT_EXPIRES_IN=7d

# 文件上传配置
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760

# 日志配置
LOG_LEVEL=info
LOG_FILE=./logs/app.log

# CORS配置
CORS_ORIGIN=http://localhost:8080
```

### 数据库

系统使用SQLite数据库，数据库文件位于 `xiaoshijie-backend/database.sqlite`

主要数据表：
- `users` - 用户表（存储用户账号、密码、角色等信息）
- `cities` - 城市卡片表（存储城市基本信息）
- `city_sections` - 城市内容板块表（存储城市详细内容）
- `questions` - 题目表（存储训练题目和PK赛题目）
- `museum_items` - 博物馆展品表（存储博物馆相关内容）

### 前后端通信

前端通过Vite代理将 `/api` 请求转发到后端服务：

```javascript
// vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:3001',
    changeOrigin: true,
  },
}
```

## 部署说明

### 生产环境构建

```bash
# 构建前端
npm run build

# 后端生产环境启动
cd xiaoshijie-backend
npm start
```

### 环境变量

生产环境需要修改以下配置：
- `NODE_ENV=production`
- `JWT_SECRET` 使用强密码
- `CORS_ORIGIN` 设置为实际域名
- 配置反向代理（如Nginx）

## 功能特性

- ✅ 用户认证与权限管理（基于JWT）
- ✅ 城市卡片内容管理
- ✅ 题目管理（训练题目、PK赛题目）
- ✅ 博物馆展品管理
- ✅ 文件上传功能
- ✅ 响应式设计
- ✅ 数据导入导出
- ✅ 安全防护（限流、CORS、Helmet）
- ✅ 日志记录与监控

## 故障排除

### 常见问题

1. **端口占用**
   - 前端默认端口：8080
   - 后端默认端口：3001
   - 如有冲突，可修改对应配置文件

2. **数据库连接失败**
   - 确保SQLite文件权限正确
   - 运行 `npm run init-db` 重新初始化

3. **API请求失败**
   - 检查后端服务是否启动
   - 确认代理配置是否正确

4. **无法访问管理界面**
   - 确保访问的是 http://localhost:8080 而不是 3001
   - 检查前端服务是否正常启动

5. **登录失败**
   - 确认使用的是正确的默认账号
   - 检查后端数据库是否正确初始化

## 联系方式

如有问题请联系开发团队。

---

最后更新：2025-06-14 