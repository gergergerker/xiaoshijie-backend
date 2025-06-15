import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Typography, Table, List, Avatar, Badge } from 'antd';
import {
  TeamOutlined,
  FileImageOutlined,
  SoundOutlined,
  QuestionCircleOutlined,
  BankOutlined,
  CalendarOutlined,
  UserOutlined,
  CloudUploadOutlined,
  DashboardOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    cityMuseumUploads: 0,
    seasonMuseumUploads: 0,
    monthlyCarousels: 0,
    cityCards: 0,
    pkQuestions: 0,
    trainingQuestions: 0,
    membershipCount: 0,
  });

  useEffect(() => {
    // 模拟加载数据
    setTimeout(() => {
      setStats({
        cityMuseumUploads: 85,
        seasonMuseumUploads: 76,
        monthlyCarousels: 12,
        cityCards: 218,
        pkQuestions: 150,
        trainingQuestions: 172,
        membershipCount: 3580,
      });
      setLoading(false);
    }, 1000);
  }, []);

  const recentActivities = [
    {
      id: 1,
      user: '管理员',
      action: '上传了新的城市卡片',
      target: '伦敦',
      time: '10分钟前',
      icon: <FileImageOutlined style={{ color: '#4CAF50' }} />,
    },
    {
      id: 2,
      user: '管理员',
      action: '更新了晓城博物馆音频',
      target: '概念篇',
      time: '30分钟前',
      icon: <SoundOutlined style={{ color: '#2196F3' }} />,
    },
    {
      id: 3,
      user: '管理员',
      action: '新增了PK赛题目',
      target: '15题',
      time: '1小时前',
      icon: <QuestionCircleOutlined style={{ color: '#FF9800' }} />,
    },
    {
      id: 4,
      user: '管理员',
      action: '修改了会员介绍',
      target: '价格方案',
      time: '2小时前',
      icon: <TeamOutlined style={{ color: '#9C27B0' }} />,
    },
    {
      id: 5,
      user: '管理员',
      action: '上传了1月轮播图',
      target: '2023年1月',
      time: '3小时前',
      icon: <CalendarOutlined style={{ color: '#607D8B' }} />,
    },
  ];

  const todoItems = [
    {
      title: 'PK赛题目更新',
      description: '明日19:30前更新',
      status: 'urgent',
    },
    {
      title: '二月轮播图上传',
      description: '1月28日前完成',
      status: 'normal',
    },
    {
      title: '晓时博物馆冬季节气A4资源',
      description: '1月31日前完成',
      status: 'normal',
    },
    {
      title: '城市卡片挑战题设置',
      description: '定期检查',
      status: 'low',
    },
  ];

  const systemStatus = [
    {
      key: '1',
      module: '晓城博物馆',
      status: '正常',
      apiStatus: '正常',
      lastUpdate: '2023-01-20 15:30',
    },
    {
      key: '2',
      module: '晓时博物馆',
      status: '正常',
      apiStatus: '正常',
      lastUpdate: '2023-01-20 14:45',
    },
    {
      key: '3',
      module: '时序经纬',
      status: '正常',
      apiStatus: '正常',
      lastUpdate: '2023-01-20 16:10',
    },
    {
      key: '4',
      module: 'PK赛系统',
      status: '正常',
      apiStatus: '正常',
      lastUpdate: '2023-01-20 18:00',
    },
    {
      key: '5',
      module: '会员系统',
      status: '正常',
      apiStatus: '正常',
      lastUpdate: '2023-01-20 17:20',
    },
  ];

  const columns = [
    {
      title: '模块',
      dataIndex: 'module',
      key: 'module',
    },
    {
      title: '运行状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        return text === '正常' ? (
          <Badge status="success" text="正常" />
        ) : (
          <Badge status="error" text="异常" />
        );
      },
    },
    {
      title: 'API状态',
      dataIndex: 'apiStatus',
      key: 'apiStatus',
      render: (text) => {
        return text === '正常' ? (
          <Badge status="success" text="正常" />
        ) : (
          <Badge status="error" text="异常" />
        );
      },
    },
    {
      title: '最后更新',
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
    },
  ];

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        <DashboardOutlined /> 控制台
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="城市博物馆资源"
              value={stats.cityMuseumUploads}
              prefix={<BankOutlined style={{ color: '#4CAF50' }} />}
              suffix="个"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="时节博物馆资源"
              value={stats.seasonMuseumUploads}
              prefix={<BankOutlined style={{ color: '#8BC34A' }} />}
              suffix="个"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="月份轮播图"
              value={stats.monthlyCarousels}
              prefix={<CalendarOutlined style={{ color: '#2196F3' }} />}
              suffix="个"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="城市卡片"
              value={stats.cityCards}
              prefix={<FileImageOutlined style={{ color: '#FF9800' }} />}
              suffix="张"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="PK赛题目"
              value={stats.pkQuestions}
              prefix={<QuestionCircleOutlined style={{ color: '#9C27B0' }} />}
              suffix="题"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="训练题目"
              value={stats.trainingQuestions}
              prefix={<QuestionCircleOutlined style={{ color: '#607D8B' }} />}
              suffix="题"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="会员总数"
              value={stats.membershipCount}
              prefix={<TeamOutlined style={{ color: '#F44336' }} />}
              suffix="人"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="今日上传资源"
              value={5}
              prefix={<CloudUploadOutlined style={{ color: '#00BCD4' }} />}
              suffix="个"
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title="最近活动"
            loading={loading}
            style={{ marginBottom: 16 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar icon={item.icon || <UserOutlined />} />
                    }
                    title={`${item.user} ${item.action} "${item.target}"`}
                    description={item.time}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title="待办事项"
            loading={loading}
            style={{ marginBottom: 16 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={todoItems}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Badge
                        status={
                          item.status === 'urgent'
                            ? 'error'
                            : item.status === 'normal'
                            ? 'warning'
                            : 'default'
                        }
                      />
                    }
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col span={24}>
          <Card title="系统状态" loading={loading}>
            <Table
              columns={columns}
              dataSource={systemStatus}
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 