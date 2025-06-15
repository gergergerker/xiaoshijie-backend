import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, message, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../components/common/Logo';

const { Title } = Typography;

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);
`;

const LoginCard = styled(Card)`
  width: 380px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const Login = ({ setIsLoggedIn }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 模拟用户数据库
  const userDatabase = [
    { username: 'admin', password: 'admin123', role: 'admin', name: '系统管理员' },
    { username: 'editor', password: 'editor123', role: 'editor', name: '内容编辑员' }
  ];

  const onFinish = (values) => {
    setLoading(true);
    
    // 模拟登录验证
    setTimeout(() => {
      const { username, password } = values;
      const user = userDatabase.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        // 登录成功
        const { role, name } = user;
        const currentUser = { username, role, name };
        
        // 保存用户信息和token
        localStorage.setItem('token', 'user-token-' + username);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        setIsLoggedIn(true);
        message.success(`欢迎回来，${name}！`);
        navigate('/dashboard');
      } else {
        // 登录失败
        message.error('用户名或密码错误');
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <LoginWrapper>
      <LoginCard>
        <Spin spinning={loading} tip="登录中...">
          <LogoWrapper>
            <Logo size={64} />
            <Title level={2} style={{ margin: '16px 0 0', color: '#2E7D32' }}>
              晓时节管理系统
            </Title>
          </LogoWrapper>
          
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名！' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="用户名" 
                size="large"
                autoComplete="username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码！' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="密码"
                size="large"
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large" 
                block
                style={{ 
                  height: '48px', 
                  fontSize: '16px',
                  backgroundColor: '#4CAF50',
                  borderColor: '#4CAF50' 
                }}
              >
                登录
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center', margin: '16px 0', color: '#9E9E9E', fontSize: '13px' }}>
            <p>测试账号：admin / admin123 (管理员)</p>
            <p>测试账号：editor / editor123 (编辑员)</p>
          </div>

          <div style={{ textAlign: 'center', color: '#757575', fontSize: '12px' }}>
            © {new Date().getFullYear()} 晓时节博物馆 版权所有
          </div>
        </Spin>
      </LoginCard>
    </LoginWrapper>
  );
};

export default Login; 