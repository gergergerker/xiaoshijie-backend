import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  InputNumber,
  Button,
  Typography,
  Row,
  Col,
  Upload,
  Space,
  Table,
  Tag,
  Modal,
  message,
  Divider,
  DatePicker,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  SaveOutlined,
  CrownOutlined,
} from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const MemberPromotion = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [benefitList, setBenefitList] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [isEditingPromotion, setIsEditingPromotion] = useState(false);
  const [currentPromotion, setCurrentPromotion] = useState(null);
  const [bannerUrl, setBannerUrl] = useState('');

  useEffect(() => {
    // 模拟数据加载
    setLoading(true);
    setTimeout(() => {
      setBenefitList([
        {
          key: '1',
          title: '城市卡片全解锁',
          description: '365座城市，每日更新，印刷级清晰度下载',
          iconUrl: 'https://example.com/icon1.png',
        },
        {
          key: '2',
          title: '博物馆全解锁',
          description: '晓城博物馆与晓时博物馆全部内容畅享',
          iconUrl: 'https://example.com/icon2.png',
        },
        {
          key: '3',
          title: '优质音频解说',
          description: '专业录音棚制作，沉浸式体验',
          iconUrl: 'https://example.com/icon3.png',
        },
      ]);

      setPromotions([
        {
          key: '1',
          id: 'spring_festival',
          title: '春节特惠',
          description: '年度会员8折优惠',
          discountRate: 0.8,
          startDate: '2023-01-20',
          endDate: '2023-02-05',
          status: 'active',
        },
        {
          key: '2',
          id: 'new_year',
          title: '元旦特惠',
          description: '月度会员9折优惠',
          discountRate: 0.9,
          startDate: '2022-12-25',
          endDate: '2023-01-10',
          status: 'expired',
        },
      ]);

      setBannerUrl('https://example.com/banner.jpg');

      // 设置表单初始值
      form.setFieldsValue({
        title: '晓时节会员',
        slogan: '探索城市与节气的奥秘',
        monthlyPrice: 28,
        yearlyPrice: 198,
        yearlyOriginalPrice: 336,
      });

      setLoading(false);
    }, 1000);
  }, [form]);

  // 会员权益表格列
  const benefitColumns = [
    {
      title: '权益标题',
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
      title: '图标',
      dataIndex: 'iconUrl',
      key: 'iconUrl',
      render: (text) => <img src={text} alt="权益图标" style={{ width: 30, height: 30 }} />,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} size="small">
            编辑
          </Button>
          <Button type="text" danger icon={<DeleteOutlined />} size="small">
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 促销活动表格列
  const promotionColumns = [
    {
      title: '活动名称',
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
      title: '折扣率',
      dataIndex: 'discountRate',
      key: 'discountRate',
      render: (text) => `${text * 100}%`,
    },
    {
      title: '活动时间',
      key: 'dateRange',
      render: (_, record) => `${record.startDate} 至 ${record.endDate}`,
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'default'}>
          {status === 'active' ? '进行中' : '已结束'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEditPromotion(record)}
          >
            编辑
          </Button>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDeletePromotion(record.key)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleSave = (values) => {
    console.log('提交的数据: ', values);
    message.success('会员宣传信息保存成功！');
  };

  const handleAddBenefit = () => {
    // 模拟添加权益
    const newBenefit = {
      key: Date.now().toString(),
      title: '新增会员权益',
      description: '请编辑权益描述',
      iconUrl: 'https://example.com/default-icon.png',
    };
    setBenefitList([...benefitList, newBenefit]);
  };

  const handleEditPromotion = (promotion) => {
    setCurrentPromotion(promotion);
    setIsEditingPromotion(true);
  };

  const handleDeletePromotion = (key) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个促销活动吗？',
      onOk: () => {
        setPromotions(promotions.filter((item) => item.key !== key));
        message.success('促销活动已删除');
      },
    });
  };

  const handlePromotionModalOk = (values) => {
    if (currentPromotion) {
      // 编辑现有促销
      setPromotions(
        promotions.map((item) =>
          item.key === currentPromotion.key
            ? {
                ...item,
                ...values,
                startDate: values.dateRange[0].format('YYYY-MM-DD'),
                endDate: values.dateRange[1].format('YYYY-MM-DD'),
              }
            : item
        )
      );
      message.success('促销活动已更新');
    } else {
      // 添加新促销
      const newPromotion = {
        key: Date.now().toString(),
        id: values.id,
        title: values.title,
        description: values.description,
        discountRate: values.discountRate,
        startDate: values.dateRange[0].format('YYYY-MM-DD'),
        endDate: values.dateRange[1].format('YYYY-MM-DD'),
        status: new Date() <= values.dateRange[1] ? 'active' : 'expired',
      };
      setPromotions([...promotions, newPromotion]);
      message.success('促销活动已创建');
    }
    setIsEditingPromotion(false);
    setCurrentPromotion(null);
  };

  const handlePromotionModalCancel = () => {
    setIsEditingPromotion(false);
    setCurrentPromotion(null);
  };

  const handleAddPromotion = () => {
    setCurrentPromotion(null);
    setIsEditingPromotion(true);
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        <CrownOutlined /> 会员宣传管理
      </Title>

      <Card loading={loading} title="基本信息" style={{ marginBottom: 24 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{}}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="会员标题"
                rules={[{ required: true, message: '请输入会员标题!' }]}
              >
                <Input placeholder="如: 晓时节会员" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="slogan"
                label="宣传语"
                rules={[{ required: true, message: '请输入宣传语!' }]}
              >
                <Input placeholder="如: 探索城市与节气的奥秘" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                name="monthlyPrice"
                label="月度价格 (元)"
                rules={[{ required: true, message: '请输入月度价格!' }]}
              >
                <InputNumber min={0} precision={2} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="yearlyPrice"
                label="年度价格 (元)"
                rules={[{ required: true, message: '请输入年度价格!' }]}
              >
                <InputNumber min={0} precision={2} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="yearlyOriginalPrice"
                label="年度原价 (元)"
                rules={[{ required: true, message: '请输入年度原价!' }]}
              >
                <InputNumber min={0} precision={2} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="bannerImage"
            label="会员宣传横幅"
            extra="建议尺寸: 750x300px, 格式: jpg/png, 大小不超过1MB"
          >
            <Upload
              name="bannerImage"
              listType="picture-card"
              showUploadList={true}
              maxCount={1}
              beforeUpload={() => false}
              defaultFileList={
                bannerUrl
                  ? [
                      {
                        uid: '-1',
                        name: 'banner.jpg',
                        status: 'done',
                        url: bannerUrl,
                      },
                    ]
                  : []
              }
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              保存基本信息
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card
        title="会员权益"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddBenefit}
          >
            添加权益
          </Button>
        }
        style={{ marginBottom: 24 }}
        loading={loading}
      >
        <Table
          columns={benefitColumns}
          dataSource={benefitList}
          rowKey="key"
          pagination={false}
        />
      </Card>

      <Card
        title="促销活动"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddPromotion}
          >
            添加活动
          </Button>
        }
        loading={loading}
      >
        <Table
          columns={promotionColumns}
          dataSource={promotions}
          rowKey="key"
          pagination={false}
        />
      </Card>

      <Modal
        title={currentPromotion ? '编辑促销活动' : '添加促销活动'}
        open={isEditingPromotion}
        onCancel={handlePromotionModalCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={
            currentPromotion
              ? {
                  ...currentPromotion,
                  dateRange: [
                    currentPromotion.startDate,
                    currentPromotion.endDate,
                  ],
                }
              : { discountRate: 1 }
          }
          onFinish={handlePromotionModalOk}
        >
          <Form.Item
            name="id"
            label="活动ID"
            rules={[{ required: true, message: '请输入活动ID!' }]}
          >
            <Input placeholder="如: spring_festival" />
          </Form.Item>

          <Form.Item
            name="title"
            label="活动名称"
            rules={[{ required: true, message: '请输入活动名称!' }]}
          >
            <Input placeholder="如: 春节特惠" />
          </Form.Item>

          <Form.Item
            name="description"
            label="活动描述"
            rules={[{ required: true, message: '请输入活动描述!' }]}
          >
            <Input placeholder="如: 年度会员8折优惠" />
          </Form.Item>

          <Form.Item
            name="discountRate"
            label="折扣率"
            rules={[{ required: true, message: '请输入折扣率!' }]}
          >
            <InputNumber
              min={0}
              max={1}
              step={0.1}
              precision={2}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="dateRange"
            label="活动时间"
            rules={[{ required: true, message: '请选择活动时间!' }]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              保存
            </Button>
            <Button onClick={handlePromotionModalCancel}>取消</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MemberPromotion; 