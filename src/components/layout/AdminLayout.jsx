import React, { useState, useEffect } from 'react';
import { Layout, Menu, Dropdown, Avatar, Button, theme } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  HistoryOutlined,
  BankOutlined,
  CalendarOutlined,
  FileImageOutlined,
  QuestionCircleOutlined,
  CrownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  TeamOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import Logo from '../common/Logo';

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children, setIsLoggedIn }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [userRole, setUserRole] = useState('admin'); // 默认为管理员角色
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken();

  useEffect(() => {
    // 获取当前用户角色，在实际应用中应该从本地存储或API获取
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.role) {
      setUserRole(currentUser.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    navigate('/login');
  };

  // 根据用户角色生成菜单项
  const generateMenuItems = () => {
    // 所有用户都可以访问的菜单
    const commonItems = [
      {
        key: '/dashboard',
        icon: <DashboardOutlined />,
        label: <Link to="/dashboard">控制面板</Link>,
      },
    ];

    // 仅管理员可访问的菜单
    const adminOnlyItems = [
      {
        key: '/member-promotion',
        icon: <CrownOutlined />,
        label: <Link to="/member-promotion">会员宣传管理</Link>,
      },
      {
        key: '/user-management',
        icon: <TeamOutlined />,
        label: <Link to="/user-management">用户管理</Link>,
      },
    ];

    // 管理员和编辑员都可以访问的菜单（但编辑员仅可查看，无删除权限）
    const sharedItems = [
      {
        key: 'museum',
        icon: <BankOutlined />,
        label: '博物馆管理',
        children: [
          {
            key: '/museum/city',
            label: <Link to="/museum/city">晓城博物馆</Link>,
          },
          {
            key: '/museum/season',
            label: <Link to="/museum/season">晓时博物馆</Link>,
          },
        ],
      },
      {
        key: 'citytravel',
        icon: <CalendarOutlined />,
        label: '城市漫游管理',
        children: [
          {
            key: '/citytravel/carousel',
            label: <Link to="/citytravel/carousel">月份轮播管理</Link>,
          },
          {
            key: '/citytravel/city-card',
            label: <Link to="/citytravel/city-card">城市卡片管理</Link>,
          },
        ],
      },
      {
        key: 'questions',
        icon: <QuestionCircleOutlined />,
        label: '知识题目管理',
        children: [
          {
            key: '/questions/training',
            label: <Link to="/questions/training">训练题目</Link>,
          },
          {
            key: '/questions/pk',
            label: <Link to="/questions/pk">PK赛题目</Link>,
          },
        ],
      },
    ];

    // 根据用户角色返回对应菜单项
    return userRole === 'admin'
      ? [...commonItems, ...adminOnlyItems, ...sharedItems]
      : [...commonItems, ...sharedItems];
  };

  const items = generateMenuItems();

  const userMenu = [
    {
      key: 'role',
      icon: <UserSwitchOutlined />,
      label: `角色: ${userRole === 'admin' ? '管理员' : '编辑员'}`,
      disabled: true,
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '账号设置',
      onClick: () => navigate('/user-profile'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          background: colorBgContainer,
          borderRight: `1px solid ${colorBorderSecondary}`,
        }}
        theme="light"
        width={250}
      >
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <Logo size={collapsed ? 32 : 40} />
          {!collapsed && <h1 style={{ fontSize: '18px', margin: '8px 0 0 0' }}>晓时节管理系统</h1>}
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={[location.pathname.split('/')[1]]}
          style={{ borderRight: 0 }}
          items={items}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 250, transition: 'all 0.2s' }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            borderBottom: `1px solid ${colorBorderSecondary}`,
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <div style={{ marginRight: 24 }}>
            <Dropdown
              menu={{ items: userMenu }}
              placement="bottomRight"
              arrow
            >
              <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Avatar style={{ backgroundColor: userRole === 'admin' ? '#4CAF50' : '#2196F3' }} icon={<UserOutlined />} />
                <span style={{ marginLeft: 8 }}>{userRole === 'admin' ? '管理员' : '编辑员'}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: 8,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout; 