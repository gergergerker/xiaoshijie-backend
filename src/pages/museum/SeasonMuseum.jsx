import React, { useState, useEffect } from 'react';
import {
  Typography,
  Tabs,
  Card,
  Table,
  Button,
  Space,
  Upload,
  Form,
  Input,
  message,
  Modal,
  Progress,
  Select,
} from 'antd';
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  FilePdfOutlined,
  PlusOutlined,
  SoundOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

// 博物馆区域定义
const seasonAreas = [
  { id: 'base', name: '基础' },
  { id: 'spring', name: '春季' },
  { id: 'summer', name: '夏季' },
  { id: 'autumn', name: '秋季' },
  { id: 'winter', name: '冬季' },
  { id: 'astronomy', name: '天文区' },
  { id: 'climate', name: '气候区' },
  { id: 'tool', name: '工具区' },
  { id: 'calendar', name: '历法区' },
  { id: 'crop', name: '作物区' },
  { id: 'painting', name: '绘画区' },
  { id: 'literature', name: '文学区' },
  { id: 'music', name: '音乐区' },
];

const SeasonMuseum = () => {
  const [activeTab, setActiveTab] = useState('base');
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentResource, setCurrentResource] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [audioFile, setAudioFile] = useState(null);
  const [form] = Form.useForm();

  // 加载区域资源数据
  useEffect(() => {
    loadAreaResources(activeTab);
  }, [activeTab]);

  const loadAreaResources = (areaId) => {
    setLoading(true);
    // 模拟加载数据
    setTimeout(() => {
      const demoData = [
        {
          id: '1',
          areaId,
          title: `${getAreaName(areaId)} - A4图片`,
          a4ImageUrl: 'https://example.com/a4_image.jpg',
          audioUrl: 'https://example.com/audio.mp3',
          audioDuration: 180,
          updateTime: '2023-01-15 14:30',
        },
      ];
      setResources(demoData);
      setLoading(false);
    }, 500);
  };

  // 获取区域名称
  const getAreaName = (areaId) => {
    const area = seasonAreas.find(a => a.id === areaId);
    return area ? area.name : '';
  };

  // 处理音频文件上传和时长检测
  const handleAudioUpload = (file) => {
    setAudioFile(file);
    
    // 创建音频元素来检测时长
    const audio = document.createElement('audio');
    audio.preload = 'metadata';
    
    audio.onloadedmetadata = () => {
      const duration = Math.round(audio.duration);
      form.setFieldsValue({ audioDuration: duration });
      message.success(`已自动识别音频时长: ${duration}秒`);
    };
    
    audio.onerror = () => {
      message.error('无法识别音频时长，请手动输入');
    };
    
    // 设置音频源
    audio.src = URL.createObjectURL(file);
    
    return false; // 阻止自动上传
  };

  // 处理上传资源
  const handleUploadResource = (values) => {
    console.log('上传资源:', values);
    
    if (!audioFile) {
      message.error('请上传音频文件');
      return;
    }
    
    // 模拟上传进度
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        
        // 模拟上传完成
        setTimeout(() => {
          const newResource = {
            id: Date.now().toString(),
            areaId: activeTab,
            title: values.title,
            a4ImageUrl: 'https://example.com/a4_image_new.jpg',
            audioUrl: URL.createObjectURL(audioFile),
            audioDuration: parseInt(values.audioDuration),
            updateTime: new Date().toLocaleString(),
          };
          
          setResources([...resources, newResource]);
          message.success('资源上传成功！');
          setUploadModalVisible(false);
          setUploadProgress(0);
          setAudioFile(null);
          form.resetFields();
        }, 500);
      }
    }, 300);
  };

  // 处理编辑资源
  const handleEditResource = (values) => {
    if (!currentResource) return;
    
    const updatedResources = resources.map(item => {
      if (item.id === currentResource.id) {
        return {
          ...item,
          title: values.title,
          audioDuration: parseInt(values.audioDuration),
          updateTime: new Date().toLocaleString(),
        };
      }
      return item;
    });
    
    setResources(updatedResources);
    message.success('资源更新成功！');
    setEditModalVisible(false);
  };

  // 处理删除资源
  const handleDeleteResource = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个资源吗？',
      onOk: () => {
        setResources(resources.filter(item => item.id !== id));
        message.success('资源已删除');
      },
    });
  };

  // 资源表格列定义
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '音频时长',
      dataIndex: 'audioDuration',
      key: 'audioDuration',
      render: (text) => `${text} 秒`,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<FilePdfOutlined />}
            onClick={() => window.open(record.a4ImageUrl, '_blank')}
          >
            查看A4
          </Button>
          <Button
            type="text"
            icon={<PlayCircleOutlined />}
            onClick={() => window.open(record.audioUrl, '_blank')}
          >
            播放音频
          </Button>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentResource(record);
              form.setFieldsValue({
                title: record.title,
                audioDuration: record.audioDuration,
              });
              setEditModalVisible(true);
            }}
          >
            编辑
          </Button>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteResource(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        <ClockCircleOutlined /> 晓时博物馆管理
      </Title>

      <Card>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          tabBarExtraContent={
            <Button
              type="primary"
              icon={<UploadOutlined />}
              onClick={() => {
                form.resetFields();
                setUploadModalVisible(true);
              }}
            >
              上传A4图片和音频
            </Button>
          }
        >
          {seasonAreas.map(area => (
            <TabPane tab={area.name} key={area.id}>
              <Table
                columns={columns}
                dataSource={resources}
                rowKey="id"
                loading={loading}
                pagination={false}
              />
            </TabPane>
          ))}
        </Tabs>
      </Card>

      {/* 上传资源模态框 */}
      <Modal
        title={`上传${getAreaName(activeTab)}资源`}
        open={uploadModalVisible}
        onCancel={() => setUploadModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUploadResource}
        >
          <Form.Item
            name="title"
            label="资源标题"
            rules={[{ required: true, message: '请输入资源标题!' }]}
            initialValue={`${getAreaName(activeTab)} - A4资源`}
          >
            <Input placeholder="请输入资源标题" />
          </Form.Item>

          <Form.Item
            name="a4Image"
            label="A4展示图片"
            rules={[{ required: true, message: '请上传A4展示图片!' }]}
            extra="支持jpg、png格式，建议分辨率为2480×3508像素(A4尺寸)"
          >
            <Upload
              name="a4Image"
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            name="audioFile"
            label="音频文件"
            rules={[{ required: true, message: '请上传音频文件!' }]}
            extra="支持mp3格式，大小不超过10MB，上传后将自动识别时长"
          >
            <Upload
              name="audioFile"
              maxCount={1}
              beforeUpload={handleAudioUpload}
            >
              <Button icon={<SoundOutlined />}>选择音频文件</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="audioDuration"
            label="音频时长(秒)"
            rules={[{ required: true, message: '请输入音频时长!' }]}
            extra="音频文件上传后会自动识别，也可手动调整"
          >
            <Input type="number" placeholder="自动识别音频时长" />
          </Form.Item>

          {uploadProgress > 0 && (
            <Form.Item>
              <Progress percent={uploadProgress} status="active" />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              上传
            </Button>
            <Button onClick={() => setUploadModalVisible(false)}>取消</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 编辑资源模态框 */}
      <Modal
        title="编辑资源"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditResource}
        >
          <Form.Item
            name="title"
            label="资源标题"
            rules={[{ required: true, message: '请输入资源标题!' }]}
          >
            <Input placeholder="请输入资源标题" />
          </Form.Item>

          <Form.Item
            name="audioDuration"
            label="音频时长(秒)"
            rules={[{ required: true, message: '请输入音频时长!' }]}
          >
            <Input type="number" placeholder="例如: 180" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              保存
            </Button>
            <Button onClick={() => setEditModalVisible(false)}>取消</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SeasonMuseum; 