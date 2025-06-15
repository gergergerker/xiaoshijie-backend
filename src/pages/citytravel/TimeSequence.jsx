import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  Row,
  Col,
  Form,
  Input,
  Upload,
  Button,
  message,
  Spin,
  Select,
  Modal,
  Table,
  Space,
  Image,
} from 'antd';
import {
  UploadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import moment from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const months = [
  { value: 1, label: '一月' },
  { value: 2, label: '二月' },
  { value: 3, label: '三月' },
  { value: 4, label: '四月' },
  { value: 5, label: '五月' },
  { value: 6, label: '六月' },
  { value: 7, label: '七月' },
  { value: 8, label: '八月' },
  { value: 9, label: '九月' },
  { value: 10, label: '十月' },
  { value: 11, label: '十一月' },
  { value: 12, label: '十二月' },
];

// 季节颜色映射
const seasonColors = {
  spring: '#E8F5E9',
  summer: '#E3F2FD',
  autumn: '#FFF3E0',
  winter: '#F3E5F5',
};

// 根据月份判断季节
const getSeasonByMonth = (month) => {
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
};

// 根据月份获取对应节气
const getSolarTermsByMonth = (month) => {
  const solarTerms = {
    1: ['小寒', '大寒'],
    2: ['立春', '雨水'],
    3: ['惊蛰', '春分'],
    4: ['清明', '谷雨'],
    5: ['立夏', '小满'],
    6: ['芒种', '夏至'],
    7: ['小暑', '大暑'],
    8: ['立秋', '处暑'],
    9: ['白露', '秋分'],
    10: ['寒露', '霜降'],
    11: ['立冬', '小雪'],
    12: ['大雪', '冬至'],
  };
  return solarTerms[month] || [];
};

const TimeSequence = () => {
  const [carousels, setCarousels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentCarousel, setCurrentCarousel] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [form] = Form.useForm();
  const [selectedMonth, setSelectedMonth] = useState(1);

  // 加载数据
  useEffect(() => {
    loadCarousels();
  }, []);

  const loadCarousels = () => {
    setLoading(true);
    // 模拟加载数据
    setTimeout(() => {
      const demoData = months.map(month => ({
        key: month.value.toString(),
        month: month.value,
        title: `${month.label}·${getSolarTermsByMonth(month.value)[0]}`,
        description: `${month.value}月的季节特点描述`,
        imageUrl: month.value % 2 === 0 
          ? 'https://example.com/carousel1.jpg' 
          : 'https://example.com/carousel2.jpg',
        updateTime: '2023-01-15 10:00',
        season: getSeasonByMonth(month.value),
      }));
      setCarousels(demoData);
      setLoading(false);
    }, 1000);
  };

  // 表格列定义
  const columns = [
    {
      title: '月份',
      dataIndex: 'month',
      key: 'month',
      render: text => `${text}月`,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '季节',
      dataIndex: 'season',
      key: 'season',
      render: text => {
        const seasonMap = {
          spring: '春季',
          summer: '夏季',
          autumn: '秋季',
          winter: '冬季',
        };
        return (
          <div
            style={{
              backgroundColor: seasonColors[text],
              padding: '2px 8px',
              borderRadius: '4px',
              display: 'inline-block',
            }}
          >
            {seasonMap[text]}
          </div>
        );
      },
    },
    {
      title: '轮播图片',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: text => (
        <Image
          src={text}
          width={100}
          height={50}
          alt="轮播图"
          style={{ objectFit: 'cover' }}
          preview={{
            visible: false,
            onVisibleChange: visible => {
              if (visible) {
                setPreviewImage(text);
                setPreviewVisible(true);
              }
            },
          }}
        />
      ),
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
            icon={<EyeOutlined />}
            onClick={() => {
              setPreviewImage(record.imageUrl);
              setPreviewVisible(true);
            }}
          >
            预览
          </Button>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
        </Space>
      ),
    },
  ];

  // 处理添加按钮点击
  const handleAddClick = () => {
    form.resetFields();
    setUploadModalVisible(true);
  };

  // 处理编辑按钮点击
  const handleEdit = (record) => {
    setCurrentCarousel(record);
    form.setFieldsValue({
      month: record.month,
      title: record.title,
      description: record.description,
    });
    setSelectedMonth(record.month);
    setEditModalVisible(true);
  };

  // 处理上传提交
  const handleUploadSubmit = (values) => {
    const newCarousel = {
      key: values.month.toString(),
      month: values.month,
      title: values.title,
      description: values.description,
      imageUrl: 'https://example.com/carousel_new.jpg', // 实际应用中应上传图片后获取URL
      updateTime: moment().format('YYYY-MM-DD HH:mm'),
      season: getSeasonByMonth(values.month),
    };

    // 更新轮播图列表
    const updatedCarousels = carousels.map(item => 
      item.month === values.month ? newCarousel : item
    );
    
    setCarousels(updatedCarousels);
    message.success(`${values.month}月轮播图上传成功！`);
    setUploadModalVisible(false);
  };

  // 处理编辑提交
  const handleEditSubmit = (values) => {
    // 更新轮播图
    const updatedCarousels = carousels.map(item => {
      if (item.month === currentCarousel.month) {
        return {
          ...item,
          title: values.title,
          description: values.description,
          updateTime: moment().format('YYYY-MM-DD HH:mm'),
        };
      }
      return item;
    });
    
    setCarousels(updatedCarousels);
    message.success(`${currentCarousel.month}月轮播图更新成功！`);
    setEditModalVisible(false);
  };

  // 月份选择变化时的回调
  const handleMonthChange = (value) => {
    setSelectedMonth(value);
    const solarTerms = getSolarTermsByMonth(value);
    form.setFieldsValue({
      title: `${months.find(m => m.value === value)?.label}·${solarTerms[0]}`,
    });
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        <CalendarOutlined /> 月份轮播管理
      </Title>

      <Card style={{ marginBottom: 24 }}>
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={handleAddClick}
          style={{ marginBottom: 16 }}
        >
          上传月份轮播图
        </Button>

        <Table
          columns={columns}
          dataSource={carousels}
          rowKey="key"
          loading={loading}
          pagination={false}
        />
      </Card>

      {/* 上传模态框 */}
      <Modal
        title="上传月份轮播图"
        open={uploadModalVisible}
        onCancel={() => setUploadModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUploadSubmit}
        >
          <Form.Item
            name="month"
            label="选择月份"
            rules={[{ required: true, message: '请选择月份!' }]}
          >
            <Select placeholder="请选择月份" onChange={handleMonthChange}>
              {months.map(month => (
                <Option key={month.value} value={month.value}>
                  {month.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="title"
            label="轮播图标题"
            rules={[{ required: true, message: '请输入轮播图标题!' }]}
          >
            <Input placeholder="例如: 五月·立夏" />
          </Form.Item>

          <Form.Item
            name="description"
            label="轮播图描述"
            rules={[{ required: true, message: '请输入轮播图描述!' }]}
          >
            <TextArea rows={3} placeholder="请输入轮播图描述" />
          </Form.Item>

          <Form.Item
            name="carouselImage"
            label="轮播图片"
            rules={[{ required: true, message: '请上传轮播图片!' }]}
            extra="建议尺寸: 750×200px, 格式: jpg/png, 大小不超过500KB"
          >
            <Upload
              name="carouselImage"
              listType="picture-card"
              showUploadList={true}
              maxCount={1}
              beforeUpload={() => false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              上传
            </Button>
            <Button 
              style={{ marginLeft: 8 }} 
              onClick={() => setUploadModalVisible(false)}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 编辑模态框 */}
      <Modal
        title="编辑月份轮播图"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditSubmit}
        >
          <Form.Item
            name="month"
            label="月份"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="title"
            label="轮播图标题"
            rules={[{ required: true, message: '请输入轮播图标题!' }]}
          >
            <Input placeholder="例如: 五月·立夏" />
          </Form.Item>

          <Form.Item
            name="description"
            label="轮播图描述"
            rules={[{ required: true, message: '请输入轮播图描述!' }]}
          >
            <TextArea rows={3} placeholder="请输入轮播图描述" />
          </Form.Item>

          <Form.Item
            name="carouselImage"
            label="轮播图片"
            extra="如需更换图片，请上传新图片，否则保持原图片不变"
          >
            <Upload
              name="carouselImage"
              listType="picture-card"
              showUploadList={true}
              maxCount={1}
              beforeUpload={() => false}
              defaultFileList={
                currentCarousel
                  ? [
                      {
                        uid: '-1',
                        name: `month_${currentCarousel.month}.jpg`,
                        status: 'done',
                        url: currentCarousel.imageUrl,
                      },
                    ]
                  : []
              }
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>更换图片</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
            <Button 
              style={{ marginLeft: 8 }} 
              onClick={() => setEditModalVisible(false)}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 图片预览 */}
      <Modal
        open={previewVisible}
        title="轮播图预览"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default TimeSequence; 