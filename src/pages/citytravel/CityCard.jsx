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
  Radio,
  Checkbox,
  Badge,
  Alert,
  Empty,
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
  FilePdfOutlined,
  PrinterOutlined,
  DownloadOutlined,
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
  const [printDrawerVisible, setPrintDrawerVisible] = useState(false);
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
          printPages: {
            drawingUrl: 'https://example.com/hangzhou_drawing.pdf',
            text1Url: 'https://example.com/hangzhou_text1.pdf',
            text2Url: 'https://example.com/hangzhou_text2.pdf',
          },
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
          printPages: {
            drawingUrl: 'https://example.com/london_drawing.pdf',
            text1Url: 'https://example.com/london_text1.pdf',
            text2Url: 'https://example.com/london_text2.pdf',
          },
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
      width: '120px',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{text}</div>
          <div style={{ color: '#aaa', fontSize: '12px' }}>{record.nameEn}</div>
        </div>
      ),
    },
    {
      title: '国家',
      dataIndex: 'country',
      key: 'country',
      width: '80px',
    },
    {
      title: '解锁状态',
      key: 'unlocked',
      width: '80px',
      render: (_, record) => (
        record.unlocked ? 
          <Tag color="green">已解锁</Tag> : 
          <Tag color="orange">待发布</Tag>
      ),
    },
    {
      title: '解锁日期',
      dataIndex: 'unlockDate',
      key: 'unlockDate',
      width: '110px',
      render: (text) => text ? moment(text).format('YYYY-MM-DD') : '-',
    },
    {
      title: '显示日期',
      dataIndex: 'date',
      key: 'date',
      width: '110px',
      render: (text, record) => {
        // 如果显示日期和解锁日期相同，则不显示显示日期
        if (text === record.unlockDate) {
          return <span style={{ color: '#aaa' }}>同解锁日期</span>;
        }
        return moment(text).format('YYYY-MM-DD');
      },
    },
    {
      title: '季节',
      dataIndex: 'season',
      key: 'season',
      width: '70px',
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
      title: '打印页',
      key: 'printPages',
      width: '80px',
      render: (_, record) => (
        <div style={{ textAlign: 'center' }}>
          {record.printPages ? (
            <Tag color="purple">已上传</Tag>
          ) : (
            <Tag color="default">未上传</Tag>
          )}
        </div>
      ),
    },
    {
      title: '挑战题目',
      key: 'challenges',
      width: '100px',
      render: (_, record) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Tag color="green">单选题</Tag>
          <Tag color="blue">多选题</Tag>
          <Tag color="orange">拼图</Tag>
        </div>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: '120px',
      render: (_, record) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
            icon={<PrinterOutlined />}
            onClick={() => {
              setCurrentCity(record);
              setPrintDrawerVisible(true);
            }}
          >
            打印页
          </Button>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditClick(record)}
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
        </div>
      ),
    },
  ];

  // 处理添加城市卡片
  const handleAdd = () => {
    form.resetFields();
    // 设置默认创建日期
    form.setFieldsValue({
      createDate: moment().format('YYYY-MM-DD HH:mm:ss')
    });
    setAddModalVisible(true);
    setActiveTab('1');
  };

  // 处理保存城市卡片
  const handleSave = (values) => {
    // console.log('Received values:', values);
    const { 
      name, nameEn, country, date, unlockDate, createDate,
      month, day, season, 
      coverImage, thumbnailImage, videoFile, audioFile,
      sections = [],
      singleChoiceQuestion, singleChoiceOptions, singleChoiceAnswer,
      multipleChoiceQuestion, multipleChoiceOptions, multipleChoiceAnswers,
      puzzleImage,
      drawingPage, textPage1, textPage2,
    } = values;

    // 确保选项数量正确
    const finalSingleOptions = [...singleChoiceOptions];
    while (finalSingleOptions.length < 4) finalSingleOptions.push('');
    if (finalSingleOptions.length > 4) finalSingleOptions.length = 4;

    const finalMultipleOptions = [...multipleChoiceOptions];
    while (finalMultipleOptions.length < 5) finalMultipleOptions.push('');
    if (finalMultipleOptions.length > 5) finalMultipleOptions.length = 5;

    // 如果显示日期未设置，使用解锁日期
    const displayDate = date || unlockDate;

    // 构建新的城市对象
    const newCity = {
      id: Date.now().toString(),
      name,
      nameEn,
      country,
      date: displayDate.format('YYYY-MM-DD'),
      unlockDate: unlockDate.format('YYYY-MM-DD'),
      createDate: createDate || moment().format('YYYY-MM-DD HH:mm:ss'),
      unlocked: moment().isAfter(moment(unlockDate).hour(5).minute(0).second(0)),
      month: displayDate.month() + 1,
      day: displayDate.date(), 
      season: getSeason(displayDate.month() + 1),
      coverUrl: coverImage?.[0]?.thumbUrl || 'https://example.com/default_cover.jpg',
      thumbnailUrl: thumbnailImage?.[0]?.thumbUrl || 'https://example.com/default_thumb.jpg',
      videoUrl: videoFile?.[0]?.name || '',
      audioUrl: audioFile?.[0]?.name || '',
      printPages: {
        drawingUrl: drawingPage?.[0]?.name || '',
        text1Url: textPage1?.[0]?.name || '',
        text2Url: textPage2?.[0]?.name || '',
      },
      sections: sections.map(section => ({
        title: section.title,
        content: section.content,
        imageUrl: section.image?.[0]?.thumbUrl || 'https://example.com/default_section.jpg'
      })),
      challenges: {
        singleChoice: {
          question: singleChoiceQuestion,
          options: finalSingleOptions,
          correctAnswer: singleChoiceAnswer,
        },
        multipleChoice: {
          question: multipleChoiceQuestion,
          options: finalMultipleOptions,
          correctAnswers: multipleChoiceAnswers,
        },
        puzzle: {
          imageUrl: puzzleImage?.[0]?.thumbUrl || 'https://example.com/default_puzzle.jpg',
        }
      }
    };

    setCities([...cities, newCity]);
    setAddModalVisible(false);
    message.success('城市卡片添加成功！');
  };

  // 处理编辑城市卡片
  const handleEditClick = (record) => {
    setCurrentCity(record);
    form.setFieldsValue({
      ...record,
      date: moment(record.date),
      unlockDate: record.unlockDate ? moment(record.unlockDate) : undefined,
      createDate: record.createDate || moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    setEditModalVisible(true);
  };

  // 处理编辑城市卡片
  const handleEdit = (values) => {
    const { 
      name, nameEn, country, date, unlockDate, createDate,
      month, day, season, 
      coverImage, thumbnailImage, videoFile, audioFile,
      sections = [],
      singleChoiceQuestion, singleChoiceOptions, singleChoiceAnswer,
      multipleChoiceQuestion, multipleChoiceOptions, multipleChoiceAnswers,
      puzzleImage,
      drawingPage, textPage1, textPage2,
    } = values;

    // 确保选项数量正确
    const finalSingleOptions = [...singleChoiceOptions];
    while (finalSingleOptions.length < 4) finalSingleOptions.push('');
    if (finalSingleOptions.length > 4) finalSingleOptions.length = 4;

    const finalMultipleOptions = [...multipleChoiceOptions];
    while (finalMultipleOptions.length < 5) finalMultipleOptions.push('');
    if (finalMultipleOptions.length > 5) finalMultipleOptions.length = 5;

    // 如果显示日期未设置，使用解锁日期
    const displayDate = date || unlockDate;

    // 更新城市对象
    const updatedCity = {
      ...currentCity,
      name,
      nameEn,
      country,
      date: displayDate.format('YYYY-MM-DD'),
      unlockDate: unlockDate.format('YYYY-MM-DD'),
      createDate: createDate || currentCity.createDate || moment().format('YYYY-MM-DD HH:mm:ss'),
      unlocked: moment().isAfter(moment(unlockDate).hour(5).minute(0).second(0)),
      month: displayDate.month() + 1,
      day: displayDate.date(),
      season: getSeason(displayDate.month() + 1),
      coverUrl: coverImage?.[0]?.thumbUrl || currentCity.coverUrl,
      thumbnailUrl: thumbnailImage?.[0]?.thumbUrl || currentCity.thumbnailUrl,
      videoUrl: videoFile?.[0]?.name || currentCity.videoUrl,
      audioUrl: audioFile?.[0]?.name || currentCity.audioUrl,
      printPages: {
        drawingUrl: drawingPage?.[0]?.name || (currentCity.printPages ? currentCity.printPages.drawingUrl : ''),
        text1Url: textPage1?.[0]?.name || (currentCity.printPages ? currentCity.printPages.text1Url : ''),
        text2Url: textPage2?.[0]?.name || (currentCity.printPages ? currentCity.printPages.text2Url : ''),
      },
      sections: sections.map((section, index) => ({
        title: section.title,
        content: section.content,
        imageUrl: section.image?.[0]?.thumbUrl || (currentCity.sections[index]?.imageUrl || 'https://example.com/default_section.jpg')
      })),
      challenges: {
        singleChoice: {
          question: singleChoiceQuestion,
          options: finalSingleOptions,
          correctAnswer: singleChoiceAnswer,
        },
        multipleChoice: {
          question: multipleChoiceQuestion,
          options: finalMultipleOptions,
          correctAnswers: multipleChoiceAnswers,
        },
        puzzle: {
          imageUrl: puzzleImage?.[0]?.thumbUrl || currentCity.challenges.puzzle.imageUrl,
        }
      }
    };

    setCities(cities.map(city => city.id === updatedCity.id ? updatedCity : city));
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
                name="createDate"
                label="录入日期"
              >
                <Input disabled value={moment().format('YYYY-MM-DD HH:mm:ss')} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="unlockDate"
                label="解锁日期（当天凌晨5点发布）"
                rules={[{ required: true, message: '请选择解锁日期!' }]}
              >
                <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" onChange={(date) => {
                  // 当选择解锁日期时，自动设置相同的显示日期
                  form.setFieldsValue({ date });
                }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="date"
                label="显示日期（如与解锁日期不同，才需设置）"
                tooltip="显示日期用于App页面中显示的日期，通常与解锁日期相同。特殊情况下可单独设置。"
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
            name="videoFile"
            label="视频文件"
            extra="支持mp4格式，大小不超过50MB"
          >
            <Upload
              name="videoFile"
              maxCount={1}
              beforeUpload={() => false}
            >
              <Button icon={<VideoCameraOutlined />}>上传视频</Button>
            </Upload>
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

        <TabPane tab="挑战板块" key="3">
          <Card title="单选题" style={{ marginBottom: 16 }}>
            <Form.Item
              name="singleChoiceQuestion"
              label="问题"
              rules={[{ required: true, message: '请输入问题!' }]}
            >
              <Input placeholder="例如: 这个城市最著名的景点是?" />
            </Form.Item>

            <Form.List name="singleChoiceOptions" initialValue={['', '', '', '']}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      key={field.key}
                      label={`选项${String.fromCharCode(65 + index)}`}
                      style={{ marginBottom: 8 }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          {...field}
                          noStyle
                          rules={[{ required: true, message: '请输入选项内容' }]}
                        >
                          <Input style={{ width: '100%' }} placeholder={`请输入选项${String.fromCharCode(65 + index)}内容`} />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  ))}
                </>
              )}
            </Form.List>

            <Form.Item
              name="singleChoiceAnswer"
              label="正确答案"
              rules={[{ required: true, message: '请选择正确答案!' }]}
            >
              <Radio.Group>
                {['A', 'B', 'C', 'D'].map((option, index) => (
                  <Radio key={index} value={index}>选项 {option}</Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </Card>

          <Card title="多选题" style={{ marginBottom: 16 }}>
            <Form.Item
              name="multipleChoiceQuestion"
              label="问题"
              rules={[{ required: true, message: '请输入问题!' }]}
            >
              <Input placeholder="例如: 这个城市的特产有哪些?" />
            </Form.Item>

            <Form.List name="multipleChoiceOptions" initialValue={['', '', '', '', '']}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      key={field.key}
                      label={`选项${String.fromCharCode(65 + index)}`}
                      style={{ marginBottom: 8 }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          {...field}
                          noStyle
                          rules={[{ required: true, message: '请输入选项内容' }]}
                        >
                          <Input style={{ width: '100%' }} placeholder={`请输入选项${String.fromCharCode(65 + index)}内容`} />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  ))}
                </>
              )}
            </Form.List>

            <Form.Item
              name="multipleChoiceAnswers"
              label="正确答案"
              rules={[{ required: true, message: '请选择正确答案!', type: 'array' }]}
            >
              <Checkbox.Group>
                {['A', 'B', 'C', 'D', 'E'].map((option, index) => (
                  <Checkbox key={index} value={index}>选项 {option}</Checkbox>
                ))}
              </Checkbox.Group>
            </Form.Item>
          </Card>

          <Card title="九宫格拼图">
            <Form.Item
              name="puzzleImage"
              label="拼图图片"
              rules={[{ required: true, message: '请上传拼图图片!' }]}
              extra="建议尺寸: 600×600px, 格式: jpg/png, 图片将被自动切割为九宫格"
            >
              <Upload
                name="puzzleImage"
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
          </Card>
        </TabPane>

        <TabPane tab="打印页" key="4">
          <Card title="A4打印页上传" style={{ marginBottom: 16 }}>
            <Alert 
              message="说明" 
              description="请上传一张A4绘画页和两张A4文字版，格式为PDF，文件大小不超过5MB。" 
              type="info" 
              showIcon 
              style={{ marginBottom: 16 }}
            />
            
            <Form.Item
              name="drawingPage"
              label="A4绘画页"
              rules={[{ required: true, message: '请上传A4绘画页!' }]}
              extra="建议尺寸: A4 (210×297mm), 格式: PDF"
            >
              <Upload
                name="drawingPage"
                accept=".pdf"
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>上传A4绘画页</Button>
              </Upload>
            </Form.Item>
            
            <Form.Item
              name="textPage1"
              label="A4文字版(第1页)"
              rules={[{ required: true, message: '请上传A4文字版第1页!' }]}
              extra="建议尺寸: A4 (210×297mm), 格式: PDF"
            >
              <Upload
                name="textPage1"
                accept=".pdf"
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>上传A4文字版(第1页)</Button>
              </Upload>
            </Form.Item>
            
            <Form.Item
              name="textPage2"
              label="A4文字版(第2页)"
              rules={[{ required: true, message: '请上传A4文字版第2页!' }]}
              extra="建议尺寸: A4 (210×297mm), 格式: PDF"
            >
              <Upload
                name="textPage2"
                accept=".pdf"
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>上传A4文字版(第2页)</Button>
              </Upload>
            </Form.Item>
          </Card>
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
          scroll={{ x: 780 }}
          size="middle"
          bordered
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
                <Text strong>录入日期:</Text> {currentCity.createDate || '-'}
              </Col>
              <Col span={8}>
                <Text strong>解锁日期:</Text> {moment(currentCity.unlockDate).format('YYYY-MM-DD')} (凌晨5点)
              </Col>
              {currentCity.date !== currentCity.unlockDate && (
                <Col span={8}>
                  <Text strong>显示日期:</Text> {moment(currentCity.date).format('YYYY-MM-DD')}
                </Col>
              )}
              <Col span={8}>
                <Text strong>解锁状态:</Text> {currentCity.unlocked ? 
                  <Tag color="green">已解锁</Tag> : 
                  <Tag color="red">未解锁</Tag>
                }
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
              <div style={{ marginTop: '8px' }}>
                {currentCity.challenges.singleChoice.options.map((option, index) => (
                  <div key={index} style={{ marginBottom: '8px' }}>
                    <Radio disabled>
                      {option}
                    </Radio>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card title="多选题" style={{ marginBottom: 16 }}>
              <Text strong>问题:</Text> {currentCity.challenges.multipleChoice.question}
              <br />
              <Text strong>选项:</Text>
              <div style={{ marginTop: '8px' }}>
                {currentCity.challenges.multipleChoice.options.map((option, index) => (
                  <div key={index} style={{ marginBottom: '8px' }}>
                    <Checkbox disabled>
                      {option}
                    </Checkbox>
                  </div>
                ))}
              </div>
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

      {/* 打印页抽屉 */}
      <Drawer
        title={currentCity ? `${currentCity.name} 打印页` : '打印页'}
        width={640}
        open={printDrawerVisible}
        onClose={() => setPrintDrawerVisible(false)}
        extra={
          <Space>
            <Button onClick={() => setPrintDrawerVisible(false)}>关闭</Button>
          </Space>
        }
      >
        {currentCity && (
          <>
            <Divider orientation="left">A4打印页</Divider>
            
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card title="A4绘画页" bordered={false}>
                  {currentCity.printPages?.drawingUrl ? (
                    <div style={{ textAlign: 'center' }}>
                      <FilePdfOutlined style={{ fontSize: 48, color: '#FF5722' }} />
                      <div style={{ marginTop: 16 }}>
                        <Button 
                          type="primary"
                          icon={<EyeOutlined />}
                          onClick={() => window.open(currentCity.printPages.drawingUrl)}
                        >
                          预览
                        </Button>
                        <Button 
                          style={{ marginLeft: 8 }}
                          icon={<DownloadOutlined />}
                          onClick={() => window.open(currentCity.printPages.drawingUrl)}
                        >
                          下载
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Empty description="暂无绘画页" />
                  )}
                </Card>
              </Col>
              
              <Col span={12}>
                <Card title="A4文字版(第1页)" bordered={false}>
                  {currentCity.printPages?.text1Url ? (
                    <div style={{ textAlign: 'center' }}>
                      <FilePdfOutlined style={{ fontSize: 48, color: '#2196F3' }} />
                      <div style={{ marginTop: 16 }}>
                        <Button 
                          type="primary"
                          icon={<EyeOutlined />}
                          onClick={() => window.open(currentCity.printPages.text1Url)}
                        >
                          预览
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Empty description="暂无文字版" />
                  )}
                </Card>
              </Col>
              
              <Col span={12}>
                <Card title="A4文字版(第2页)" bordered={false}>
                  {currentCity.printPages?.text2Url ? (
                    <div style={{ textAlign: 'center' }}>
                      <FilePdfOutlined style={{ fontSize: 48, color: '#2196F3' }} />
                      <div style={{ marginTop: 16 }}>
                        <Button 
                          type="primary"
                          icon={<EyeOutlined />}
                          onClick={() => window.open(currentCity.printPages.text2Url)}
                        >
                          预览
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Empty description="暂无文字版" />
                  )}
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Drawer>
    </div>
  );
};

export default CityCard; 