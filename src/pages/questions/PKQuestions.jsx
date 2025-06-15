/* eslint-disable */
// 文件更新触发器: 2023-05-01 12:00
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  Tabs,
  Button,
  Table,
  Space,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Tag,
  Modal,
  message,
  Divider,
  Radio,
  Checkbox,
  Row,
  Col,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import PermissionCheck from '../../components/common/PermissionCheck';

const { Title } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

const PKQuestions = () => {
  const [questions, setQuestions] = useState({
    single: [],
    multiple: [],
    fill: [],
  });
  const [loading, setLoading] = useState(false);
  const [publishDate, setPublishDate] = useState(moment());
  const [trainingQuestions, setTrainingQuestions] = useState({
    city: {
      single: [],
      multiple: [],
      fill: []
    },
    season: {
      single: [],
      multiple: [],
      fill: []
    }
  });
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionType, setQuestionType] = useState('single');
  const [form] = Form.useForm();

  useEffect(() => {
    loadQuestions();
    loadTrainingQuestions();
  }, [publishDate]);

  // 加载训练题目数据
  const loadTrainingQuestions = () => {
    // 这里应该是通过API获取训练题目数据
    // 现在模拟一些训练题目数据
    setTimeout(() => {
      // 城市训练-单选题
      const citySingleChoiceQuestions = [
        {
          id: 'cs1',
          text: '中国传统四大名著不包括以下哪部作品？',
          options: ['红楼梦', '西游记', '聊斋志异', '三国演义'],
          correctAnswer: 2,
          entryDate: '2023-05-01',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'city'
        },
        {
          id: 'cs2',
          text: '北京的故宫是哪个朝代建造的？',
          options: ['唐朝', '宋朝', '元朝', '明朝'],
          correctAnswer: 3,
          entryDate: '2023-05-05',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'city'
        },
        {
          id: 'cs3',
          text: '杭州西湖的传说与哪个民间故事有关？',
          options: ['白蛇传', '梁山伯与祝英台', '牛郎织女', '孟姜女'],
          correctAnswer: 0,
          entryDate: '2023-05-06',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'city'
        },
        {
          id: 'cs4',
          text: '中国四大古都不包括以下哪个城市？',
          options: ['北京', '西安', '南京', '广州'],
          correctAnswer: 3,
          entryDate: '2023-05-07',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'city'
        },
        {
          id: 'cs5',
          text: '苏州园林被誉为什么？',
          options: ['人间天堂', '园林之母', '东方明珠', '世外桃源'],
          correctAnswer: 1,
          entryDate: '2023-05-08',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'city'
        },
        {
          id: 'cs6',
          text: '下列哪个城市不是长江沿岸城市？',
          options: ['武汉', '重庆', '南京', '郑州'],
          correctAnswer: 3,
          entryDate: '2023-05-10',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'city'
        },
      ];

      // 城市训练-多选题
      const cityMultipleChoiceQuestions = [
        {
          id: 'cm1',
          text: '以下哪些城市是中国的直辖市？',
          options: ['北京', '上海', '广州', '重庆', '天津'],
          correctAnswers: [0, 1, 3, 4],
          entryDate: '2023-05-03',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'city'
        },
        {
          id: 'cm2',
          text: '下列城市中哪些位于长江以南？',
          options: ['南京', '武汉', '长沙', '杭州', '西安'],
          correctAnswers: [0, 2, 3],
          entryDate: '2023-05-08',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'city'
        },
        {
          id: 'cm3',
          text: '以下哪些城市是省会城市？',
          options: ['苏州', '成都', '深圳', '长沙', '合肥'],
          correctAnswers: [1, 3, 4],
          entryDate: '2023-05-11',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'city'
        },
        {
          id: 'cm4',
          text: '下列哪些城市曾经是中国的古都？',
          options: ['洛阳', '开封', '杭州', '广州', '南京'],
          correctAnswers: [0, 1, 2, 4],
          entryDate: '2023-05-12',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'city'
        },
        {
          id: 'cm5',
          text: '以下哪些城市是国际大都市？',
          options: ['北京', '上海', '广州', '深圳', '香港'],
          correctAnswers: [0, 1, 4],
          entryDate: '2023-05-13',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'city'
        },
        {
          id: 'cm6',
          text: '以下哪些城市位于沿海地区？',
          options: ['青岛', '厦门', '大连', '宁波', '西安'],
          correctAnswers: [0, 1, 2, 3],
          entryDate: '2023-05-15',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'city'
        },
      ];

      // 城市训练-填空题
      const cityFillQuestions = [
        {
          id: 'cf1',
          text: '中国有____个省级行政区。',
          correctAnswer: '34',
          alternativeAnswers: ['三十四'],
          entryDate: '2023-05-02',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'city'
        },
        {
          id: 'cf2',
          text: '北京又称____，上海又称____。',
          correctAnswer: '京华 魔都',
          alternativeAnswers: ['京华，魔都'],
          entryDate: '2023-05-07',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'city'
        },
        {
          id: 'cf3',
          text: '中国最大的城市是____，面积最小的省级行政区是____。',
          correctAnswer: '重庆 澳门',
          alternativeAnswers: ['重庆，澳门'],
          entryDate: '2023-05-14',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'city'
        },
        {
          id: 'cf4',
          text: '中国最北的省份是____，最南的省份是____。',
          correctAnswer: '黑龙江 海南',
          alternativeAnswers: ['黑龙江，海南'],
          entryDate: '2023-05-16',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'city'
        },
        {
          id: 'cf5',
          text: '中国人口最多的城市是____。',
          correctAnswer: '上海',
          alternativeAnswers: [],
          entryDate: '2023-05-17',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'city'
        },
        {
          id: 'cf6',
          text: '中国大陆海岸线总长约____公里。',
          correctAnswer: '18000',
          alternativeAnswers: ['一万八千', '18,000'],
          entryDate: '2023-05-18',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'city'
        },
      ];

      // 时节训练-单选题
      const seasonSingleChoiceQuestions = [
        {
          id: 'ss1',
          text: '下列哪个节气是夏季的第一个节气？',
          options: ['立夏', '小满', '芒种', '夏至'],
          correctAnswer: 0,
          entryDate: '2023-06-01',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'season'
        },
        {
          id: 'ss2',
          text: '二十四节气中，哪个节气与"春分"相对？',
          options: ['冬至', '夏至', '秋分', '立冬'],
          correctAnswer: 1,
          entryDate: '2023-06-05',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'season'
        },
        {
          id: 'ss3',
          text: '小雪节气一般在哪个月份？',
          options: ['10月', '11月', '12月', '1月'],
          correctAnswer: 1,
          entryDate: '2023-06-09',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'season'
        },
        {
          id: 'ss4',
          text: '清明节气是农历几月？',
          options: ['二月', '三月', '四月', '五月'],
          correctAnswer: 1,
          entryDate: '2023-06-10',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'season'
        },
        {
          id: 'ss5',
          text: '以下哪个传统节日不是在农历正月？',
          options: ['春节', '元宵节', '龙抬头', '清明节'],
          correctAnswer: 3,
          entryDate: '2023-06-11',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'season'
        },
        {
          id: 'ss6',
          text: '二十四节气中哪个不属于春季节气？',
          options: ['立春', '雨水', '谷雨', '立夏'],
          correctAnswer: 3,
          entryDate: '2023-06-15',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'season'
        },
      ];

      // 时节训练-多选题
      const seasonMultipleChoiceQuestions = [
        {
          id: 'sm1',
          text: '以下哪些节气属于春季？',
          options: ['立春', '雨水', '清明', '立夏', '小满'],
          correctAnswers: [0, 1, 2],
          entryDate: '2023-06-03',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'season'
        },
        {
          id: 'sm2',
          text: '以下哪些传统节日在夏季？',
          options: ['端午节', '七夕', '中元节', '春节', '清明节'],
          correctAnswers: [0, 1, 2],
          entryDate: '2023-06-08',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'season'
        },
        {
          id: 'sm3',
          text: '下列哪些是二十四节气中的秋季节气？',
          options: ['立秋', '处暑', '寒露', '霜降', '立冬'],
          correctAnswers: [0, 1, 2, 3],
          entryDate: '2023-06-12',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'season'
        },
        {
          id: 'sm4',
          text: '下列哪些节日与月亮有关？',
          options: ['元宵节', '中秋节', '重阳节', '七夕', '端午节'],
          correctAnswers: [0, 1, 3],
          entryDate: '2023-06-14',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'season'
        },
        {
          id: 'sm5',
          text: '以下哪些节日有祭祀祖先的习俗？',
          options: ['清明节', '中元节', '春节', '重阳节', '端午节'],
          correctAnswers: [0, 1, 2],
          entryDate: '2023-06-16',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'season'
        },
        {
          id: 'sm6',
          text: '以下哪些是传统的饮食节日？',
          options: ['元宵节', '端午节', '中秋节', '清明节', '重阳节'],
          correctAnswers: [0, 1, 2, 4],
          entryDate: '2023-06-18',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'season'
        },
      ];

      // 时节训练-填空题
      const seasonFillQuestions = [
        {
          id: 'sf1',
          text: '一年中的第一个节气是____。',
          correctAnswer: '立春',
          alternativeAnswers: [],
          entryDate: '2023-06-02',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'season'
        },
        {
          id: 'sf2',
          text: '"____，春色满园关不住，____。"',
          correctAnswer: '春江水暖鸭先知 一枝红杏出墙来',
          alternativeAnswers: ['春江水暖鸭先知，一枝红杏出墙来'],
          entryDate: '2023-06-07',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'season'
        },
        {
          id: 'sf3',
          text: '一年中最后一个节气是____。',
          correctAnswer: '大寒',
          alternativeAnswers: [],
          entryDate: '2023-06-13',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'season'
        },
        {
          id: 'sf4',
          text: '二十四节气按季节划分，每个季节有____个节气。',
          correctAnswer: '6',
          alternativeAnswers: ['六'],
          entryDate: '2023-06-17',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'season'
        },
        {
          id: 'sf5',
          text: '中国传统农历新年又称____。',
          correctAnswer: '春节',
          alternativeAnswers: [],
          entryDate: '2023-06-19',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'season'
        },
        {
          id: 'sf6',
          text: '夏至这天，北半球白昼时间____，南半球白昼时间____。',
          correctAnswer: '最长 最短',
          alternativeAnswers: ['最长，最短'],
          entryDate: '2023-06-20',
          publishDate: publishDate.format('YYYY-MM-DD'),
          type: 'season'
        },
      ];

      setTrainingQuestions({
        city: {
          single: citySingleChoiceQuestions,
          multiple: cityMultipleChoiceQuestions,
          fill: cityFillQuestions
        },
        season: {
          single: seasonSingleChoiceQuestions,
          multiple: seasonMultipleChoiceQuestions,
          fill: seasonFillQuestions
        }
      });
    }, 1000);
  };

  // 加载题目数据
  const loadQuestions = () => {
    setLoading(true);
    // 模拟加载数据
    setTimeout(() => {
      // 单选题示例数据
      const singleChoiceQuestions = [
        {
          id: '1',
          text: '下列哪个城市是中国的首都？',
          options: ['北京', '上海', '广州', '深圳'],
          correctAnswer: 0,
          difficulty: 1,
          date: publishDate.format('YYYY-MM-DD'),
          unlocked: moment().isAfter(moment(publishDate).hour(5).minute(0).second(0)),
        },
        {
          id: '2',
          text: '"月落乌啼霜满天，江枫渔火对愁眠"出自哪位诗人的作品？',
          options: ['李白', '杜甫', '张继', '王维'],
          correctAnswer: 2,
          difficulty: 2,
          date: publishDate.format('YYYY-MM-DD'),
          unlocked: moment().isAfter(moment(publishDate).hour(5).minute(0).second(0)),
        },
      ];

      // 多选题示例数据
      const multipleChoiceQuestions = [
        {
          id: '1',
          text: '下列哪些节气属于春季？',
          options: ['立春', '小暑', '清明', '白露', '谷雨'],
          correctAnswers: [0, 2, 4],
          difficulty: 2,
          date: publishDate.format('YYYY-MM-DD'),
          unlocked: moment().isAfter(moment(publishDate).hour(5).minute(0).second(0)),
        },
        {
          id: '2',
          text: '下列哪些城市位于长江以南？',
          options: ['杭州', '南京', '武汉', '成都', '广州'],
          correctAnswers: [0, 1, 4],
          difficulty: 2,
          date: publishDate.format('YYYY-MM-DD'),
          unlocked: moment().isAfter(moment(publishDate).hour(5).minute(0).second(0)),
        },
      ];

      // 填空题示例数据
      const fillQuestions = [
        {
          id: '1',
          text: '中国有____个省级行政区。',
          correctAnswer: '34',
          alternativeAnswers: ['三十四'],
          difficulty: 1,
          date: publishDate.format('YYYY-MM-DD'),
          unlocked: moment().isAfter(moment(publishDate).hour(5).minute(0).second(0)),
        },
        {
          id: '2',
          text: '"____，春色满园关不住，____。"',
          correctAnswer: '春江水暖鸭先知 一枝红杏出墙来',
          alternativeAnswers: ['春江水暖鸭先知，一枝红杏出墙来'],
          difficulty: 3,
          date: publishDate.format('YYYY-MM-DD'),
          unlocked: moment().isAfter(moment(publishDate).hour(5).minute(0).second(0)),
        },
      ];

      setQuestions({
        single: singleChoiceQuestions,
        multiple: multipleChoiceQuestions,
        fill: fillQuestions,
      });
      setLoading(false);
    }, 1000);
  };

  // 随机生成题目
  const handleGenerateQuestions = () => {
    if (!trainingQuestions.city.single.length && !trainingQuestions.season.single.length) {
      message.error('没有找到训练题目，请确认所选发布日期是否有训练题目');
      return;
    }

    // 混合城市和时节的题目
    const allSingleQuestions = [
      ...trainingQuestions.city.single,
      ...trainingQuestions.season.single
    ];
    const allMultipleQuestions = [
      ...trainingQuestions.city.multiple,
      ...trainingQuestions.season.multiple
    ];
    const allFillQuestions = [
      ...trainingQuestions.city.fill,
      ...trainingQuestions.season.fill
    ];

    // 随机挑选题目
    const randomSingleQuestions = getRandomQuestions(allSingleQuestions, 5);
    const randomMultipleQuestions = getRandomQuestions(allMultipleQuestions, 5);
    const randomFillQuestions = getRandomQuestions(allFillQuestions, 5);

    // 格式化为PK赛题目
    const formattedSingle = randomSingleQuestions.map((q, index) => ({
      id: `pk-single-${index + 1}`,
      text: q.text,
      options: q.options,
      correctAnswer: q.correctAnswer,
      date: publishDate.format('YYYY-MM-DD'),
      unlocked: moment().isAfter(moment(publishDate).hour(5).minute(0).second(0)),
      sourceType: q.type // 保存来源类型
    }));

    const formattedMultiple = randomMultipleQuestions.map((q, index) => ({
      id: `pk-multiple-${index + 1}`,
      text: q.text,
      options: q.options,
      correctAnswers: q.correctAnswers,
      date: publishDate.format('YYYY-MM-DD'),
      unlocked: moment().isAfter(moment(publishDate).hour(5).minute(0).second(0)),
      sourceType: q.type // 保存来源类型
    }));

    const formattedFill = randomFillQuestions.map((q, index) => ({
      id: `pk-fill-${index + 1}`,
      text: q.text,
      correctAnswer: q.correctAnswer,
      alternativeAnswers: q.alternativeAnswers || [],
      date: publishDate.format('YYYY-MM-DD'),
      unlocked: moment().isAfter(moment(publishDate).hour(5).minute(0).second(0)),
      sourceType: q.type // 保存来源类型
    }));

    // 更新题目数据
    setQuestions({
      single: formattedSingle,
      multiple: formattedMultiple,
      fill: formattedFill,
    });

    message.success('已随机生成PK赛题目');
  };

  // 从数组中随机获取n个元素
  const getRandomQuestions = (arr, n) => {
    if (arr.length <= n) return arr;
    const result = [];
    const used = new Set();
    
    // 确保城市和时节题目各占约50%
    const halfN = Math.ceil(n / 2);
    
    // 分别获取城市和时节题目
    const cityQuestions = arr.filter(q => q.type === 'city');
    const seasonQuestions = arr.filter(q => q.type === 'season');
    
    // 随机选择城市题目
    for (let i = 0; i < Math.min(halfN, cityQuestions.length); i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * cityQuestions.length);
      } while (used.has(`city-${randomIndex}`));
      
      used.add(`city-${randomIndex}`);
      result.push(cityQuestions[randomIndex]);
    }
    
    // 随机选择时节题目
    for (let i = 0; i < Math.min(n - result.length, seasonQuestions.length); i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * seasonQuestions.length);
      } while (used.has(`season-${randomIndex}`));
      
      used.add(`season-${randomIndex}`);
      result.push(seasonQuestions[randomIndex]);
    }
    
    // 如果一种类型的题目不足，用另一种补齐
    if (result.length < n) {
      const remainingQuestions = arr.filter(q => 
        !result.some(r => r.id === q.id)
      );
      
      while (result.length < n && remainingQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
        result.push(remainingQuestions[randomIndex]);
        remainingQuestions.splice(randomIndex, 1);
      }
    }
    
    // 随机排序
    return result.sort(() => Math.random() - 0.5);
  };

  // 单选题表格列
  const singleColumns = [
    {
      title: '题目',
      dataIndex: 'text',
      key: 'text',
      ellipsis: true,
      width: '35%',
    },
    {
      title: '选项',
      key: 'options',
      width: '30%',
      render: (_, record) => (
        <div className="question-options">
          {record.options.map((option, index) => (
            <Radio key={index} disabled style={{ display: 'block', marginBottom: '8px' }}>
              {option}
            </Radio>
          ))}
        </div>
      ),
    },
    {
      title: '来源',
      dataIndex: 'sourceType',
      key: 'sourceType',
      width: '10%',
      render: (sourceType) => (
        <Tag color={sourceType === 'city' ? 'blue' : 'green'}>
          {sourceType === 'city' ? '城市训练' : '时节训练'}
        </Tag>
      ),
    },
    {
      title: '发布状态',
      key: 'unlocked',
      width: '10%',
      render: (_, record) => (
        record.unlocked ? 
          <Tag color="green">已发布</Tag> : 
          <Tag color="orange">待发布</Tag>
      ),
    },
    {
      title: '发布日期',
      dataIndex: 'date',
      key: 'date',
      width: '15%',
      render: (date) => `${date} (凌晨5点)`,
    },
    {
      title: '操作',
      key: 'action',
      width: '10%',
      render: (_, record) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit('single', record)}
          />
          <PermissionCheck action="delete">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete('single', record.id)}
            />
          </PermissionCheck>
        </div>
      ),
    },
  ];

  // 多选题表格列
  const multipleColumns = [
    {
      title: '题目',
      dataIndex: 'text',
      key: 'text',
      ellipsis: true,
      width: '35%',
    },
    {
      title: '选项',
      key: 'options',
      width: '30%',
      render: (_, record) => (
        <div className="question-options">
          {record.options.map((option, index) => (
            <Checkbox key={index} disabled style={{ display: 'block', marginBottom: '8px' }}>
              {option}
            </Checkbox>
          ))}
        </div>
      ),
    },
    {
      title: '来源',
      dataIndex: 'sourceType',
      key: 'sourceType',
      width: '10%',
      render: (sourceType) => (
        <Tag color={sourceType === 'city' ? 'blue' : 'green'}>
          {sourceType === 'city' ? '城市训练' : '时节训练'}
        </Tag>
      ),
    },
    {
      title: '发布状态',
      key: 'unlocked',
      width: '10%',
      render: (_, record) => (
        record.unlocked ? 
          <Tag color="green">已发布</Tag> : 
          <Tag color="orange">待发布</Tag>
      ),
    },
    {
      title: '发布日期',
      dataIndex: 'date',
      key: 'date',
      width: '15%',
      render: (date) => `${date} (凌晨5点)`,
    },
    {
      title: '操作',
      key: 'action',
      width: '10%',
      render: (_, record) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit('multiple', record)}
          />
          <PermissionCheck action="delete">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete('multiple', record.id)}
            />
          </PermissionCheck>
        </div>
      ),
    },
  ];

  // 填空题表格列
  const fillColumns = [
    {
      title: '题目',
      dataIndex: 'text',
      key: 'text',
      ellipsis: true,
      width: '40%',
    },
    {
      title: '标准答案',
      dataIndex: 'correctAnswer',
      key: 'correctAnswer',
      width: '25%',
    },
    {
      title: '来源',
      dataIndex: 'sourceType',
      key: 'sourceType',
      width: '10%',
      render: (sourceType) => (
        <Tag color={sourceType === 'city' ? 'blue' : 'green'}>
          {sourceType === 'city' ? '城市训练' : '时节训练'}
        </Tag>
      ),
    },
    {
      title: '发布状态',
      key: 'unlocked',
      width: '10%',
      render: (_, record) => (
        record.unlocked ? 
          <Tag color="green">已发布</Tag> : 
          <Tag color="orange">待发布</Tag>
      ),
    },
    {
      title: '发布日期',
      dataIndex: 'date',
      key: 'date',
      width: '15%',
      render: (date) => `${date} (凌晨5点)`,
    },
    {
      title: '操作',
      key: 'action',
      width: '10%',
      render: (_, record) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit('fill', record)}
          />
          <PermissionCheck action="delete">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete('fill', record.id)}
            />
          </PermissionCheck>
        </div>
      ),
    },
  ];

  // 处理添加题目
  const handleAdd = (type) => {
    setAddModalVisible(true);
    setQuestionType(type);
    form.resetFields();
    
    if (type === 'single') {
      form.setFieldsValue({
        options: ['', '', '', ''],
        difficulty: 1,
      });
    } else if (type === 'multiple') {
      form.setFieldsValue({
        options: ['', '', '', '', ''],
        difficulty: 2,
      });
    } else if (type === 'fill') {
      form.setFieldsValue({
        alternativeAnswers: [''],
        difficulty: 2,
      });
    }
  };

  // 处理编辑题目
  const handleEdit = (type, question) => {
    setEditModalVisible(true);
    setQuestionType(type);
    setCurrentQuestion(question);
    
    if (type === 'single') {
      form.setFieldsValue({
        text: question.text,
        options: question.options,
        correctAnswer: question.correctAnswer,
        date: question.date ? moment(question.date) : publishDate,
      });
    } else if (type === 'multiple') {
      form.setFieldsValue({
        text: question.text,
        options: question.options,
        correctAnswers: question.correctAnswers,
        date: question.date ? moment(question.date) : publishDate,
      });
    } else if (type === 'fill') {
      form.setFieldsValue({
        text: question.text,
        correctAnswer: question.correctAnswer,
        alternativeAnswers: question.alternativeAnswers,
        date: question.date ? moment(question.date) : publishDate,
      });
    }
  };

  // 处理删除题目
  const handleDelete = (type, id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个题目吗？',
      onOk: () => {
        const newQuestions = { ...questions };
        newQuestions[type] = questions[type].filter(q => q.id !== id);
        setQuestions(newQuestions);
        message.success('题目已删除');
      },
    });
  };

  // 处理添加题目提交
  const handleAddSubmit = (values) => {
    const newQuestion = {
      id: Date.now().toString(),
      ...values,
      date: values.date ? values.date.format('YYYY-MM-DD') : publishDate.format('YYYY-MM-DD'),
      unlocked: moment().isAfter(moment(values.date || publishDate).hour(5).minute(0).second(0)),
    };
    
    const newQuestions = { ...questions };
    newQuestions[questionType] = [...questions[questionType], newQuestion];
    setQuestions(newQuestions);
    
    message.success('题目添加成功');
    setAddModalVisible(false);
  };

  // 处理编辑题目提交
  const handleEditSubmit = (values) => {
    const updatedValues = {
      ...values,
      date: values.date ? values.date.format('YYYY-MM-DD') : publishDate.format('YYYY-MM-DD'),
      unlocked: moment().isAfter(moment(values.date || publishDate).hour(5).minute(0).second(0)),
    };
    
    const newQuestions = { ...questions };
    newQuestions[questionType] = questions[questionType].map(q => 
      q.id === currentQuestion.id ? { ...q, ...updatedValues } : q
    );
    setQuestions(newQuestions);
    
    message.success('题目更新成功');
    setEditModalVisible(false);
  };

  // 渲染添加/编辑表单
  const renderQuestionForm = () => {
    return (
      <Form
        form={form}
        layout="vertical"
        onFinish={addModalVisible ? handleAddSubmit : handleEditSubmit}
      >
        <Form.Item
          name="text"
          label="题目内容"
          rules={[{ required: true, message: '请输入题目内容!' }]}
        >
          <TextArea rows={3} placeholder="请输入题目内容" />
        </Form.Item>

        {questionType === 'single' && (
          <>
            <Form.List name="options">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item 
                      key={field.key} 
                      label={index === 0 ? '选项' : ''}
                      required={true}
                    >
                      <Row gutter={8}>
                        <Col span={20}>
                          <Form.Item
                            {...field}
                            noStyle
                            rules={[{ required: true, message: '请输入选项内容' }]}
                          >
                            <Input placeholder={`选项 ${String.fromCharCode(65 + index)}`} />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          {fields.length > 4 ? (
                            <Button 
                              type="text" 
                              danger
                              onClick={() => remove(field.name)}
                              icon={<DeleteOutlined />}
                            />
                          ) : null}
                        </Col>
                      </Row>
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button 
                      type="dashed" 
                      onClick={() => add()} 
                      block 
                      icon={<PlusOutlined />}
                      disabled={fields.length >= 4}
                    >
                      添加选项
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            
            <Form.Item
              name="correctAnswer"
              label="正确答案"
              rules={[{ required: true, message: '请选择正确答案!' }]}
            >
              <Radio.Group>
                {form.getFieldValue('options')?.map((_, index) => (
                  <Radio key={index} value={index}>
                    选项 {String.fromCharCode(65 + index)}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </>
        )}

        {questionType === 'multiple' && (
          <>
            <Form.List name="options">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item 
                      key={field.key} 
                      label={index === 0 ? '选项' : ''}
                      required={true}
                    >
                      <Row gutter={8}>
                        <Col span={20}>
                          <Form.Item
                            {...field}
                            noStyle
                            rules={[{ required: true, message: '请输入选项内容' }]}
                          >
                            <Input placeholder={`选项 ${String.fromCharCode(65 + index)}`} />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          {fields.length > 5 ? (
                            <Button 
                              type="text" 
                              danger
                              onClick={() => remove(field.name)}
                              icon={<DeleteOutlined />}
                            />
                          ) : null}
                        </Col>
                      </Row>
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button 
                      type="dashed" 
                      onClick={() => add()} 
                      block 
                      icon={<PlusOutlined />}
                      disabled={fields.length >= 5}
                    >
                      添加选项
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item
              name="correctAnswers"
              label="正确答案"
              rules={[{ required: true, message: '请选择正确答案!', type: 'array' }]}
            >
              <Checkbox.Group>
                {form.getFieldValue('options')?.map((_, index) => (
                  <Checkbox key={index} value={index}>
                    选项 {String.fromCharCode(65 + index)}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Form.Item>
          </>
        )}

        {questionType === 'fill' && (
          <>
            <Form.Item
              name="correctAnswer"
              label="标准答案"
              rules={[{ required: true, message: '请输入标准答案!' }]}
            >
              <Input placeholder="请输入标准答案" />
            </Form.Item>

            <Form.List name="alternativeAnswers">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item 
                      key={field.key} 
                      label={index === 0 ? '备选答案' : ''}
                    >
                      <Row gutter={8}>
                        <Col span={20}>
                          <Form.Item
                            {...field}
                            noStyle
                          >
                            <Input placeholder={`备选答案 ${index + 1}`} />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Button 
                            type="text" 
                            danger
                            onClick={() => remove(field.name)}
                            icon={<DeleteOutlined />}
                          />
                        </Col>
                      </Row>
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button 
                      type="dashed" 
                      onClick={() => add()} 
                      block 
                      icon={<PlusOutlined />}
                    >
                      添加备选答案
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </>
        )}

        <Form.Item
          name="date"
          label="发布日期（当天凌晨5点发布）"
          rules={[{ required: true, message: '请选择发布日期!' }]}
        >
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
        </Form.Item>

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
  };

  return (
    <div>
      <Title level={2}>
        <QuestionCircleOutlined /> PK赛题目管理
      </Title>

      <Card style={{ marginBottom: 16 }}>
        <Row gutter={16} align="middle">
          <Col span={5}>
            <DatePicker
              value={publishDate}
              onChange={setPublishDate}
              style={{ width: '100%' }}
              placeholder="选择发布日期"
              format="YYYY-MM-DD"
            />
          </Col>
          <Col span={5}>
            <Button 
              type="primary" 
              onClick={handleGenerateQuestions}
              icon={<CopyOutlined />}
              style={{ marginRight: 8 }}
            >
              随机生成题目
            </Button>
          </Col>
          <Col span={5}>
            <Button 
              type="primary" 
              onClick={() => {
                // 更新所有题目的发布日期
                const newQuestions = {
                  single: questions.single.map(q => ({
                    ...q,
                    date: publishDate.format('YYYY-MM-DD'),
                    unlocked: moment().isAfter(moment(publishDate).hour(5).minute(0).second(0))
                  })),
                  multiple: questions.multiple.map(q => ({
                    ...q,
                    date: publishDate.format('YYYY-MM-DD'),
                    unlocked: moment().isAfter(moment(publishDate).hour(5).minute(0).second(0))
                  })),
                  fill: questions.fill.map(q => ({
                    ...q,
                    date: publishDate.format('YYYY-MM-DD'),
                    unlocked: moment().isAfter(moment(publishDate).hour(5).minute(0).second(0))
                  }))
                };
                setQuestions(newQuestions);
                message.success(`已将所有题目的发布日期设置为 ${publishDate.format('YYYY-MM-DD')} (凌晨5点)`);
              }}
            >
              设置发布日期
            </Button>
          </Col>
          <Col span={9}>
            <div style={{ color: '#888' }}>
              提示: 首先选择发布日期，然后点击"随机生成题目"按钮。题目将在发布日期的东八区凌晨5点自动发布。
            </div>
          </Col>
        </Row>
      </Card>

      <Tabs defaultActiveKey="single">
        <TabPane tab={`单选题 (${questions.single.length}/5题)`} key="single">
          <div style={{ marginBottom: 16, textAlign: 'right' }}>
            <PermissionCheck action="add">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => handleAdd('single')}
              >
                添加单选题
              </Button>
            </PermissionCheck>
          </div>
          <Table
            columns={singleColumns}
            dataSource={questions.single}
            rowKey="id"
            loading={loading}
          />
        </TabPane>
        <TabPane tab={`多选题 (${questions.multiple.length}/5题)`} key="multiple">
          <div style={{ marginBottom: 16, textAlign: 'right' }}>
            <PermissionCheck action="add">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => handleAdd('multiple')}
              >
                添加多选题
              </Button>
            </PermissionCheck>
          </div>
          <Table
            columns={multipleColumns}
            dataSource={questions.multiple}
            rowKey="id"
            loading={loading}
          />
        </TabPane>
        <TabPane tab={`填空题 (${questions.fill.length}/5题)`} key="fill">
          <div style={{ marginBottom: 16, textAlign: 'right' }}>
            <PermissionCheck action="add">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => handleAdd('fill')}
              >
                添加填空题
              </Button>
            </PermissionCheck>
          </div>
          <Table
            columns={fillColumns}
            dataSource={questions.fill}
            rowKey="id"
            loading={loading}
          />
        </TabPane>
      </Tabs>

      {/* 添加题目模态框 */}
      <Modal
        title={`添加${questionType === 'single' ? '单选题' : questionType === 'multiple' ? '多选题' : '填空题'}`}
        open={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        footer={null}
        width={700}
        destroyOnClose
      >
        {renderQuestionForm()}
      </Modal>

      {/* 编辑题目模态框 */}
      <Modal
        title={`编辑${questionType === 'single' ? '单选题' : questionType === 'multiple' ? '多选题' : '填空题'}`}
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        width={700}
        destroyOnClose
      >
        {renderQuestionForm()}
      </Modal>
    </div>
  );
};

export default PKQuestions; 