import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  Table,
  Button,
  Space,
  Tag,
  Form,
  Input,
  Upload,
  Select,
  DatePicker,
  Modal,
  Tabs,
  message,
  Drawer,
  Divider,
  Row,
  Col,
  Image,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
  FileImageOutlined,
  VideoCameraOutlined,
  SoundOutlined,
  QuestionOutlined,
} from '@ant-design/icons';
import moment from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

// 季节定义
const seasons = [
  { value: 'spring', label: '春季', color: '#E8F5E9' },
  { value: 'summer', label: '夏季', color: '#E3F2FD' },
  { value: 'autumn', label: '秋季', color: '#FFF3E0' },
  { value: 'winter', label: '冬季', color: '#F3E5F5' },
];

const CityCard = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailDrawerVisible, setDetailDrawerVisible] = useState(false);
  const [challengeDrawerVisible, setChallengeDrawerVisible] = useState(false);
  const [currentCity, setCurrentCity] = useState(null);
  const [activeTab, setActiveTab] = useState('1');

  // 加载城市数据
  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = () => {
    setLoading(true);
    // 模拟加载数据
    setTimeout(() => {
      const demoCities = [
        {
          id: '1',
          name: '杭州',
          nameEn: 'Hangzhou',
          country: '中国',
          date: '2023-06-01',
          unlocked: true,
          month: 6,
          day: 1,
          season: 'summer',
          coverUrl: 'https://example.com/hangzhou.jpg',
          thumbnailUrl: 'https://example.com/hangzhou_thumb.jpg',
          videoUrl: 'https://example.com/hangzhou_video.mp4',
          audioUrl: 'https://example.com/hangzhou_audio.mp3',
          sections: [
            { title: '自然地理', content: '杭州位于中国东南部...', imageUrl: 'https://example.com/section1.jpg' },
            { title: '气候时节', content: '杭州属亚热带季风气候...', imageUrl: 'https://example.com/section2.jpg' },
            { title: '人文气息', content: '杭州历史悠久...', imageUrl: 'https://example.com/section3.jpg' },
            { title: '城市脉络', content: '杭州城市发展...', imageUrl: 'https://example.com/section4.jpg' },
            { title: '街巷宝库', content: '杭州名胜古迹众多...', imageUrl: 'https://example.com/section5.jpg' },
          ],
          challenges: {
            singleChoice: {
              question: '杭州最著名的景点是?',
              options: ['西湖', '西塘', '乌镇', '千岛湖'],
              correctAnswer: 0,
            },
            multipleChoice: {
              question: '下列哪些是杭州的特产?',
              options: ['龙井茶', '西湖醋鱼', '东坡肉', '小笼包'],
              correctAnswers: [0, 1, 2],
            },
            puzzle: {
              imageUrl: 'https://example.com/hangzhou_puzzle.jpg',
            },
          },
        },
        {
          id: '2',
          name: '伦敦',
          nameEn: 'London',
          country: '英国',
          date: '2023-06-02',
          unlocked: true,
          month: 6,
          day: 2,
          season: 'summer',
          coverUrl: 'https://example.com/london.jpg',
          thumbnailUrl: 'https://example.com/london_thumb.jpg',
          videoUrl: 'https://example.com/london_video.mp4',
          audioUrl: 'https://example.com/london_audio.mp3',
          sections: [
            { title: '自然地理', content: '伦敦位于英国东南部...', imageUrl: 'https://example.com/london_section1.jpg' },
            { title: '气候时节', content: '伦敦属温带海洋性气候...', imageUrl: 'https://example.com/london_section2.jpg' },
            { title: '人文气息', content: '伦敦是英国的政治、经济、文化中心...', imageUrl: 'https://example.com/london_section3.jpg' },
            { title: '城市脉络', content: '伦敦城市格局...', imageUrl: 'https://example.com/london_section4.jpg' },
            { title: '街巷宝库', content: '伦敦的历史建筑和博物馆...', imageUrl: 'https://example.com/london_section5.jpg' },
          ],
          challenges: {
            singleChoice: {
              question: '伦敦最著名的钟楼是?',
              options: ['大本钟', '埃菲尔铁塔', '自由女神像', '比萨斜塔'],
              correctAnswer: 0,
            },
            multipleChoice: {
              question: '下列哪些是伦敦的著名景点?',
              options: ['大英博物馆', '白金汉宫', '埃菲尔铁塔', '伦敦眼'],
              correctAnswers: [0, 1, 3],
            },
            puzzle: {
              imageUrl: 'https://example.com/london_puzzle.jpg',
            },
          },
        },
      ];
      setCities(demoCities);
      setLoading(false);
    }, 1000);
  };

  // 表格列定义
  const columns = [
    {
      title: '城市',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          {text}
          <span style={{ color: '#aaa' }}>{record.nameEn}</span>
        </Space>
      ),
    },
    {
      title: '国家',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: '解锁日期',
      dataIndex: 'date',
      key: 'date',
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: '季节',
      dataIndex: 'season',
      key: 'season',
      render: (season) => {
        const seasonObj = seasons.find(s => s.value === season);
        return (
          <Tag color={seasonObj?.color} style={{ color: '#333' }}>
            {seasonObj?.label}
          </Tag>
        );
      },
    },
    {
      title: '缩略图',
      dataIndex: 'thumbnailUrl',
      key: 'thumbnailUrl',
      render: (url) => (
        <Image
          src={url}
          width={60}
          height={60}
          style={{ objectFit: 'cover', borderRadius: '4px' }}
          alt="城市缩略图"
          preview={false}
        />
      ),
    },
    {
      title: '内容版块',
      key: 'sections',
      render: (_, record) => `${record.sections?.length || 0}个版块`,
    },
    {
      title: '挑战题目',
      key: 'challenges',
      render: (_, record) => (
        <Space>
          <Tag color="green">单选</Tag>
          <Tag color="blue">多选</Tag>
          <Tag color="orange">拼图</Tag>
        </Space>
      ),
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
              setCurrentCity(record);
              setDetailDrawerVisible(true);
            }}
          >
            详情
          </Button>
          <Button
            type="text"
            icon={<QuestionOutlined />}
            onClick={() => {
              setCurrentCity(record);
              setChallengeDrawerVisible(true);
            }}
          >
            挑战题
          </Button>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentCity(record);
              form.setFieldsValue({
                ...record,
                date: moment(record.date),
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
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 处理添加城市卡片
  const handleAdd = () => {
    form.resetFields();
    setAddModalVisible(true);
    setActiveTab('1');
  };

  // 处理保存城市卡片
  const handleSave = (values) => {
    console.log('保存城市卡片', values);
    
    // 模拟保存逻辑
    const newCity = {
      id: Date.now().toString(),
      name: values.name,
      nameEn: values.nameEn,
      country: values.country,
      date: values.date.format('YYYY-MM-DD'),
      unlocked: true,
      month: values.date.month() + 1,
      day: values.date.date(),
      season: getSeason(values.date.month() + 1),
      coverUrl: 'https://example.com/new_city.jpg',
      thumbnailUrl: 'https://example.com/new_city_thumb.jpg',
      videoUrl: values.videoUrl,
      audioUrl: 'https://example.com/new_audio.mp3',
      sections: [
        { title: '自然地理', content: values.section1, imageUrl: 'https://example.com/section1.jpg' },
        { title: '气候时节', content: values.section2, imageUrl: 'https://example.com/section2.jpg' },
        { title: '人文气息', content: values.section3, imageUrl: 'https://example.com/section3.jpg' },
        { title: '城市脉络', content: values.section4, imageUrl: 'https://example.com/section4.jpg' },
        { title: '街巷宝库', content: values.section5, imageUrl: 'https://example.com/section5.jpg' },
      ],
      challenges: {
        singleChoice: {
          question: '这是一个单选题',
          options: ['选项1', '选项2', '选项3', '选项4'],
          correctAnswer: 0,
        },
        multipleChoice: {
          question: '这是一个多选题',
          options: ['选项1', '选项2', '选项3', '选项4'],
          correctAnswers: [0, 1],
        },
        puzzle: {
          imageUrl: 'https://example.com/puzzle.jpg',
        },
      },
    };
    
    setCities([...cities, newCity]);
    message.success('城市卡片添加成功！');
    setAddModalVisible(false);
  };

  // 处理编辑城市卡片
  const handleEdit = (values) => {
    if (!currentCity) return;
    
    // 模拟更新逻辑
    const updatedCities = cities.map(city => {
      if (city.id === currentCity.id) {
        return {
          ...city,
          name: values.name,
          nameEn: values.nameEn,
          country: values.country,
          date: values.date.format('YYYY-MM-DD'),
          month: values.date.month() + 1,
          day: values.date.date(),
          season: getSeason(values.date.month() + 1),
          videoUrl: values.videoUrl,
          sections: [
            { ...city.sections[0], content: values.section1 },
            { ...city.sections[1], content: values.section2 },
            { ...city.sections[2], content: values.section3 },
            { ...city.sections[3], content: values.section4 },
            { ...city.sections[4], content: values.section5 },
          ],
        };
      }
      return city;
    });
    
    setCities(updatedCities);
    message.success('城市卡片更新成功！');
    setEditModalVisible(false);
  };

  // 处理删除城市卡片
  const handleDelete = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个城市卡片吗？',
      onOk: () => {
        setCities(cities.filter(city => city.id !== id));
        message.success('城市卡片已删除');
      },
    });
  };

  // 根据月份判断季节
  const getSeason = (month) => {
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
  };

  // 城市卡片表单渲染
  const renderCityForm = () => (
    <Form
      form={form}
      layout="vertical"
      onFinish={addModalVisible ? handleSave : handleEdit}
    >
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="基本信息" key="1">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="城市名称"
                rules={[{ required: true, message: '请输入城市名称!' }]}
              >
                <Input placeholder="例如: 杭州" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nameEn"
                label="英文名称"
                rules={[{ required: true, message: '请输入英文名称!' }]}
              >
                <Input placeholder="例如: Hangzhou" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="country"
                label="国家"
                rules={[{ required: true, message: '请输入国家!' }]}
              >
                <Input placeholder="例如: 中国" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="date"
                label="解锁日期"
                rules={[{ required: true, message: '请选择解锁日期!' }]}
              >
                <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="coverImage"
            label="封面图片"
            extra="建议尺寸: 750×422px, 格式: jpg/png"
          >
            <Upload
              name="coverImage"
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传封面</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            name="videoUrl"
            label="视频URL"
          >
            <Input placeholder="例如: https://example.com/video.mp4" />
          </Form.Item>

          <Form.Item
            name="audioFile"
            label="音频文件"
            extra="支持mp3格式，大小不超过10MB"
          >
            <Upload
              name="audioFile"
              maxCount={1}
              beforeUpload={() => false}
            >
              <Button icon={<SoundOutlined />}>选择音频文件</Button>
            </Upload>
          </Form.Item>
        </TabPane>

        <TabPane tab="内容板块" key="2">
          <Form.Item
            name="section1"
            label="自然地理"
            rules={[{ required: true, message: '请输入自然地理内容!' }]}
          >
            <TextArea rows={4} placeholder="请输入自然地理内容" />
          </Form.Item>

          <Form.Item
            name="section1Image"
            label="自然地理配图"
          >
            <Upload
              name="section1Image"
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传图片</div>
              </div>
            </Upload>
          </Form.Item>

          <Divider />

          <Form.Item
            name="section2"
            label="气候时节"
            rules={[{ required: true, message: '请输入气候时节内容!' }]}
          >
            <TextArea rows={4} placeholder="请输入气候时节内容" />
          </Form.Item>

          <Form.Item
            name="section2Image"
            label="气候时节配图"
          >
            <Upload
              name="section2Image"
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传图片</div>
              </div>
            </Upload>
          </Form.Item>

          <Divider />

          <Form.Item
            name="section3"
            label="人文气息"
            rules={[{ required: true, message: '请输入人文气息内容!' }]}
          >
            <TextArea rows={4} placeholder="请输入人文气息内容" />
          </Form.Item>

          <Form.Item
            name="section3Image"
            label="人文气息配图"
          >
            <Upload
              name="section3Image"
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传图片</div>
              </div>
            </Upload>
          </Form.Item>

          <Divider />

          <Form.Item
            name="section4"
            label="城市脉络"
            rules={[{ required: true, message: '请输入城市脉络内容!' }]}
          >
            <TextArea rows={4} placeholder="请输入城市脉络内容" />
          </Form.Item>

          <Form.Item
            name="section4Image"
            label="城市脉络配图"
          >
            <Upload
              name="section4Image"
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传图片</div>
              </div>
            </Upload>
          </Form.Item>

          <Divider />

          <Form.Item
            name="section5"
            label="街巷宝库"
            rules={[{ required: true, message: '请输入街巷宝库内容!' }]}
          >
            <TextArea rows={4} placeholder="请输入街巷宝库内容" />
          </Form.Item>

          <Form.Item
            name="section5Image"
            label="街巷宝库配图"
          >
            <Upload
              name="section5Image"
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传图片</div>
              </div>
            </Upload>
          </Form.Item>
        </TabPane>
      </Tabs>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
        <Button 
          style={{ marginLeft: 8 }} 
          onClick={() => {
            addModalVisible ? setAddModalVisible(false) : setEditModalVisible(false);
          }}
        >
          取消
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        <FileImageOutlined /> 城市卡片管理
      </Title>

      <Card style={{ marginBottom: 24 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          添加城市卡片
        </Button>

        <Table
          columns={columns}
          dataSource={cities}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* 添加城市卡片模态框 */}
      <Modal
        title="添加城市卡片"
        open={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
        {renderCityForm()}
      </Modal>

      {/* 编辑城市卡片模态框 */}
      <Modal
        title="编辑城市卡片"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
        {renderCityForm()}
      </Modal>

      {/* 城市详情抽屉 */}
      <Drawer
        title={currentCity ? `${currentCity.name} 详情` : '城市详情'}
        width={640}
        open={detailDrawerVisible}
        onClose={() => setDetailDrawerVisible(false)}
        extra={
          <Space>
            <Button onClick={() => setDetailDrawerVisible(false)}>关闭</Button>
          </Space>
        }
      >
        {currentCity && (
          <>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Image
                  src={currentCity.coverUrl}
                  alt={currentCity.name}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </Col>
            </Row>
            
            <Divider orientation="left">基本信息</Divider>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Text strong>城市名称:</Text> {currentCity.name}
              </Col>
              <Col span={8}>
                <Text strong>英文名:</Text> {currentCity.nameEn}
              </Col>
              <Col span={8}>
                <Text strong>国家:</Text> {currentCity.country}
              </Col>
              <Col span={8}>
                <Text strong>解锁日期:</Text> {moment(currentCity.date).format('YYYY-MM-DD')}
              </Col>
              <Col span={8}>
                <Text strong>季节:</Text> {
                  seasons.find(s => s.value === currentCity.season)?.label
                }
              </Col>
            </Row>
            
            <Divider orientation="left">多媒体</Divider>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Button 
                  icon={<VideoCameraOutlined />} 
                  onClick={() => window.open(currentCity.videoUrl, '_blank')}
                >
                  查看视频
                </Button>
              </Col>
              <Col span={12}>
                <Button 
                  icon={<SoundOutlined />} 
                  onClick={() => window.open(currentCity.audioUrl, '_blank')}
                >
                  播放音频
                </Button>
              </Col>
            </Row>
            
            <Divider orientation="left">城市版块</Divider>
            {currentCity.sections.map((section, index) => (
              <Card key={index} style={{ marginBottom: 16 }} title={section.title}>
                <Row gutter={[16, 16]}>
                  <Col span={16}>
                    <Text>{section.content}</Text>
                  </Col>
                  <Col span={8}>
                    <Image
                      src={section.imageUrl}
                      alt={section.title}
                      width={120}
                      height={80}
                      style={{ objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </Col>
                </Row>
              </Card>
            ))}
          </>
        )}
      </Drawer>

      {/* 挑战题抽屉 */}
      <Drawer
        title={currentCity ? `${currentCity.name} 挑战题` : '挑战题'}
        width={640}
        open={challengeDrawerVisible}
        onClose={() => setChallengeDrawerVisible(false)}
        extra={
          <Space>
            <Button onClick={() => setChallengeDrawerVisible(false)}>关闭</Button>
          </Space>
        }
      >
        {currentCity && currentCity.challenges && (
          <>
            <Card title="单选题" style={{ marginBottom: 16 }}>
              <Text strong>问题:</Text> {currentCity.challenges.singleChoice.question}
              <br />
              <Text strong>选项:</Text>
              <ul>
                {currentCity.challenges.singleChoice.options.map((option, index) => (
                  <li key={index}>
                    {option} {index === currentCity.challenges.singleChoice.correctAnswer && (
                      <Tag color="green">正确答案</Tag>
                    )}
                  </li>
                ))}
              </ul>
            </Card>
            
            <Card title="多选题" style={{ marginBottom: 16 }}>
              <Text strong>问题:</Text> {currentCity.challenges.multipleChoice.question}
              <br />
              <Text strong>选项:</Text>
              <ul>
                {currentCity.challenges.multipleChoice.options.map((option, index) => (
                  <li key={index}>
                    {option} {currentCity.challenges.multipleChoice.correctAnswers.includes(index) && (
                      <Tag color="green">正确答案</Tag>
                    )}
                  </li>
                ))}
              </ul>
            </Card>
            
            <Card title="拼图挑战">
              <Text strong>拼图图片:</Text>
              <br />
              <Image
                src={currentCity.challenges.puzzle.imageUrl}
                alt="拼图"
                style={{ width: '100%', marginTop: 16, borderRadius: '8px' }}
              />
            </Card>
          </>
        )}
      </Drawer>
    </div>
  );
};

export default CityCard; 