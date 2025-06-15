import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Row,
  Col,
} from 'antd';
import {
  UserOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LockOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import moment from 'moment';

const { Title } = Typography;
const { Option } = Select;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { role: 'admin' };

  useEffect(() => {
    loadUsers();
  }, []);

  // 加载用户数据
  const loadUsers = () => {
    setLoading(true);
    // 这里应该是从API获取用户列表
    setTimeout(() => {
      // 模拟数据
      const mockUsers = [
        {
          id: '1',
          username: 'admin',
          name: '系统管理员',
          role: 'admin',
          lastLogin: '2023-06-01 08:30:45',
          createTime: '2023-01-01 00:00:00',
        },
        {
          id: '2',
          username: 'editor',
          name: '内容编辑员',
          role: 'editor',
          lastLogin: '2023-06-02 09:15:30',
          createTime: '2023-01-15 10:30:00',
        },
      ];
      setUsers(mockUsers);
      setLoading(false);
    }, 500);
  };

  // 列定义
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'green' : 'blue'}>
          {role === 'admin' ? '管理员' : '编辑员'}
        </Tag>
      ),
    },
    {
      title: '最后登录',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          {currentUser.role === 'admin' && record.username !== 'admin' && (
            <Popconfirm
              title="确定要删除此用户吗？"
              onConfirm={() => handleDelete(record.id)}
              okText="确定"
              cancelText="取消"
            >
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
              >
                删除
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  // 处理添加用户
  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setModalVisible(true);
  };

  // 处理编辑用户
  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue({
      username: user.username,
      name: user.name,
      role: user.role,
      password: '',
      confirmPassword: '',
    });
    setModalVisible(true);
  };

  // 处理删除用户
  const handleDelete = (userId) => {
    // 这里应该是调用API删除用户
    setUsers(users.filter((user) => user.id !== userId));
    message.success('用户已删除');
  };

  // 处理表单提交
  const handleSubmit = (values) => {
    if (editingUser) {
      // 更新用户
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id
          ? {
              ...user,
              username: values.username,
              name: values.name,
              role: values.role,
              // 如果输入了新密码，则更新密码（实际应用中不会直接存储密码）
            }
          : user
      );
      setUsers(updatedUsers);
      message.success('用户信息已更新');
    } else {
      // 添加新用户
      const newUser = {
        id: Date.now().toString(),
        username: values.username,
        name: values.name,
        role: values.role,
        lastLogin: '-',
        createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
      setUsers([...users, newUser]);
      message.success('用户已添加');
    }
    setModalVisible(false);
  };

  return (
    <div>
      <Title level={2}>
        <UserOutlined /> 用户管理
      </Title>

      <Card style={{ marginBottom: 16 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <span>当前共有 {users.length} 个用户账号</span>
          </Col>
          <Col>
            {currentUser.role === 'admin' && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                添加用户
              </Button>
            )}
          </Col>
        </Row>
      </Card>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={false}
      />

      <Modal
        title={editingUser ? '编辑用户' : '添加用户'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ role: 'editor' }}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3个字符' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="姓名" />
          </Form.Item>

          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="选择角色">
              <Option value="admin">管理员（全部权限）</Option>
              <Option value="editor">编辑员（有限权限）</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[
              { required: !editingUser, message: '请输入密码' },
              { min: 6, message: '密码至少6个字符' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={editingUser ? '留空则不修改密码' : '请输入密码'}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="确认密码"
            dependencies={['password']}
            rules={[
              { required: !editingUser, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<KeyOutlined />}
              placeholder="确认密码"
            />
          </Form.Item>

          <Form.Item>
            <Space style={{ float: 'right' }}>
              <Button onClick={() => setModalVisible(false)}>取消</Button>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement; 