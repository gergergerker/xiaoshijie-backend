/* eslint-disable */
// 文件更新触发器: 2023-05-01 12:00
import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Tabs,
  Table,
  Radio,
  Checkbox,
  Button,
  Space,
  Tag,
  Form,
  Input,
  Modal,
  Row,
  Col,
  message,
  Select,
  DatePicker
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

const TrainingQuestions = () => {
  const [activeTab, setActiveTab] = useState('single');
  const [trainingType, setTrainingType] = useState('city'); // 'city' 或 'season'
  const [questions, setQuestions] = useState({
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
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    setLoading(true);
    // 模拟加载数据
    setTimeout(() => {
      // 城市训练-单选题示例数据
      const citySingleChoiceQuestions = [
        {
          id: '1',
          text: '中国传统四大名著不包括以下哪部作品？',
          options: ['红楼梦', '西游记', '聊斋志异', '三国演义'],
          correctAnswer: 2,
          entryDate: '2023-05-01',
          publishDate: '2023-05-10',
        },
        {
          id: '2',
          text: '北京的故宫是哪个朝代建造的？',
          options: ['唐朝', '宋朝', '元朝', '明朝'],
          correctAnswer: 3,
          entryDate: '2023-05-05',
          publishDate: '2023-05-15',
        },
      ];

      // 城市训练-多选题示例数据
      const cityMultipleChoiceQuestions = [
        {
          id: '1',
          text: '以下哪些城市是中国的直辖市？',
          options: ['北京', '上海', '广州', '重庆', '天津'],
          correctAnswers: [0, 1, 3, 4],
          entryDate: '2023-05-03',
          publishDate: '2023-05-12',
        },
        {
          id: '2',
          text: '下列城市中哪些位于长江以南？',
          options: ['南京', '武汉', '长沙', '杭州', '西安'],
          correctAnswers: [0, 2, 3],
          entryDate: '2023-05-08',
          publishDate: '2023-05-18',
        },
      ];

      // 城市训练-填空题示例数据
      const cityFillQuestions = [
        {
          id: '1',
          text: '中国有____个省级行政区。',
          correctAnswer: '34',
          alternativeAnswers: ['三十四'],
          entryDate: '2023-05-02',
          publishDate: '2023-05-11',
        },
        {
          id: '2',
          text: '北京又称____，上海又称____。',
          correctAnswer: '京华 魔都',
          alternativeAnswers: ['京华，魔都'],
          entryDate: '2023-05-07',
          publishDate: '2023-05-17',
        },
      ];

      // 时节训练-单选题示例数据
      const seasonSingleChoiceQuestions = [
        {
          id: '1',
          text: '下列哪个节气是夏季的第一个节气？',
          options: ['立夏', '小满', '芒种', '夏至'],
          correctAnswer: 0,
          entryDate: '2023-06-01',
          publishDate: '2023-06-10',
        },
        {
          id: '2',
          text: '二十四节气中，哪个节气与"春分"相对？',
          options: ['冬至', '夏至', '秋分', '立冬'],
          correctAnswer: 1,
          entryDate: '2023-06-05',
          publishDate: '2023-06-15',
        },
      ];

      // 时节训练-多选题示例数据
      const seasonMultipleChoiceQuestions = [
        {
          id: '1',
          text: '以下哪些节气属于春季？',
          options: ['立春', '雨水', '清明', '立夏', '小满'],
          correctAnswers: [0, 1, 2],
          entryDate: '2023-06-03',
          publishDate: '2023-06-12',
        },
        {
          id: '2',
          text: '以下哪些传统节日在夏季？',
          options: ['端午节', '七夕', '中元节', '春节', '清明节'],
          correctAnswers: [0, 1, 2],
          entryDate: '2023-06-08',
          publishDate: '2023-06-18',
        },
      ];

      // 时节训练-填空题示例数据
      const seasonFillQuestions = [
        {
          id: '1',
          text: '一年中的第一个节气是____。',
          correctAnswer: '立春',
          alternativeAnswers: [],
          entryDate: '2023-06-02',
          publishDate: '2023-06-11',
        },
        {
          id: '2',
          text: '"____，春色满园关不住，____。"',
          correctAnswer: '春江水暖鸭先知 一枝红杏出墙来',
          alternativeAnswers: ['春江水暖鸭先知，一枝红杏出墙来'],
          entryDate: '2023-06-07',
          publishDate: '2023-06-17',
        },
      ];

      setQuestions({
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
      setLoading(false);
    }, 500);
  };

  // 单选题表格列
  const singleColumns = [
    {
      title: '题目',
      dataIndex: 'text',
      key: 'text',
      ellipsis: true,
      width: '32%',
    },
    {
      title: '选项',
      key: 'options',
      width: '32%',
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
      title: '录入日期',
      dataIndex: 'entryDate',
      key: 'entryDate',
      width: '14%',
    },
    {
      title: '发布日期',
      dataIndex: 'publishDate',
      key: 'publishDate',
      width: '14%',
    },
    {
      title: '操作',
      key: 'action',
      width: '8%',
      render: (_, record) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit('single', record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete('single', record.id)}
          />
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
      width: '32%',
    },
    {
      title: '选项',
      key: 'options',
      width: '32%',
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
      title: '录入日期',
      dataIndex: 'entryDate',
      key: 'entryDate',
      width: '14%',
    },
    {
      title: '发布日期',
      dataIndex: 'publishDate',
      key: 'publishDate',
      width: '14%',
    },
    {
      title: '操作',
      key: 'action',
      width: '8%',
      render: (_, record) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit('multiple', record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete('multiple', record.id)}
          />
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
      width: '32%',
    },
    {
      title: '答案',
      dataIndex: 'correctAnswer',
      key: 'correctAnswer',
      width: '32%',
    },
    {
      title: '录入日期',
      dataIndex: 'entryDate',
      key: 'entryDate',
      width: '14%',
    },
    {
      title: '发布日期',
      dataIndex: 'publishDate',
      key: 'publishDate',
      width: '14%',
    },
    {
      title: '操作',
      key: 'action',
      width: '8%',
      render: (_, record) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit('fill', record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete('fill', record.id)}
          />
        </div>
      ),
    },
  ];

  const handleAdd = (type) => {
    setModalType('add');
    setActiveTab(type);
    form.resetFields();
    
    // Initialize with empty options or fields
    if (type === 'single') {
      form.setFieldsValue({
        options: ['', '', '', ''],
        entryDate: moment(),
        publishDate: moment().add(7, 'days')
      });
    } else if (type === 'multiple') {
      form.setFieldsValue({
        options: ['', '', '', '', ''],
        entryDate: moment(),
        publishDate: moment().add(7, 'days')
      });
    } else if (type === 'fill') {
      form.setFieldsValue({
        alternativeAnswers: [''],
        entryDate: moment(),
        publishDate: moment().add(7, 'days')
      });
    }
    
    setModalVisible(true);
  };

  const handleEdit = (type, question) => {
    setModalType('edit');
    setActiveTab(type);
    setCurrentQuestion(question);
    
    if (type === 'single' || type === 'multiple') {
      // Ensure all options are loaded correctly
      const options = [...question.options];
      if (type === 'single' && options.length !== 4) {
        while (options.length < 4) options.push('');
        if (options.length > 4) options.length = 4;
      } else if (type === 'multiple' && options.length !== 5) {
        while (options.length < 5) options.push('');
        if (options.length > 5) options.length = 5;
      }
      
      form.setFieldsValue({
        text: question.text,
        options: options,
        entryDate: question.entryDate ? moment(question.entryDate) : moment(),
        publishDate: question.publishDate ? moment(question.publishDate) : moment().add(7, 'days'),
        ...(type === 'single' 
          ? { correctAnswer: question.correctAnswer } 
          : { correctAnswers: question.correctAnswers })
      });
    } else if (type === 'fill') {
      form.setFieldsValue({
        text: question.text,
        correctAnswer: question.correctAnswer,
        alternativeAnswers: question.alternativeAnswers || [''],
        entryDate: question.entryDate ? moment(question.entryDate) : moment(),
        publishDate: question.publishDate ? moment(question.publishDate) : moment().add(7, 'days')
      });
    }
    
    setModalVisible(true);
  };

  const handleDelete = (type, id) => {
    const newQuestions = {
      ...questions,
      [trainingType]: {
        ...questions[trainingType],
        [type]: questions[trainingType][type].filter(item => item.id !== id)
      }
    };
    setQuestions(newQuestions);
    message.success('删除成功');
  };

  const handleSubmit = (values) => {
    // 格式化日期字段
    const formattedValues = {
      ...values,
      entryDate: values.entryDate ? values.entryDate.format('YYYY-MM-DD') : null,
      publishDate: values.publishDate ? values.publishDate.format('YYYY-MM-DD') : null
    };
    
    if (modalType === 'add') {
      // Create new question
      const newQuestion = {
        id: Date.now().toString(),
        ...formattedValues
      };
      
      const newQuestions = {
        ...questions,
        [trainingType]: {
          ...questions[trainingType],
          [activeTab]: [...questions[trainingType][activeTab], newQuestion]
        }
      };
      
      setQuestions(newQuestions);
      message.success('添加成功');
    } else {
      // Update existing question
      const newQuestions = {
        ...questions,
        [trainingType]: {
          ...questions[trainingType],
          [activeTab]: questions[trainingType][activeTab].map(q => 
            q.id === currentQuestion.id ? { ...q, ...formattedValues } : q
          )
        }
      };
      
      setQuestions(newQuestions);
      message.success('更新成功');
    }
    
    setModalVisible(false);
  };

  const renderForm = () => {
    return (
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="trainingType"
          label="训练类型"
          initialValue={trainingType}
          hidden={true}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="text"
          label="题目内容"
          rules={[{ required: true, message: '请输入题目内容!' }]}
        >
          <TextArea rows={3} placeholder="请输入题目内容" />
        </Form.Item>

        {activeTab === 'single' && (
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

        {activeTab === 'multiple' && (
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

        {activeTab === 'fill' && (
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

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="entryDate"
              label="录入日期"
              rules={[{ required: true, message: '请选择录入日期!' }]}
            >
              <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="publishDate"
              label="发布日期"
              rules={[{ required: true, message: '请选择发布日期!' }]}
            >
              <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: 20 }}>
        <QuestionCircleOutlined /> 训练题目管理
      </Title>
      
      <Card>
        <div style={{ marginBottom: 20 }}>
          <Radio.Group 
            value={trainingType} 
            onChange={(e) => setTrainingType(e.target.value)}
            optionType="button" 
            buttonStyle="solid"
            size="large"
          >
            <Radio.Button value="city">城市训练</Radio.Button>
            <Radio.Button value="season">时节训练</Radio.Button>
          </Radio.Group>
        </div>

        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="单选题" key="single">
            <div style={{ marginBottom: 16, textAlign: 'right' }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => handleAdd('single')}
              >
                添加单选题
              </Button>
            </div>
            <Table
              columns={singleColumns}
              dataSource={questions[trainingType].single}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 800 }}
              size="middle"
            />
          </TabPane>
          <TabPane tab="多选题" key="multiple">
            <div style={{ marginBottom: 16, textAlign: 'right' }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => handleAdd('multiple')}
              >
                添加多选题
              </Button>
            </div>
            <Table
              columns={multipleColumns}
              dataSource={questions[trainingType].multiple}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 800 }}
              size="middle"
            />
          </TabPane>
          <TabPane tab="填空题" key="fill">
            <div style={{ marginBottom: 16, textAlign: 'right' }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => handleAdd('fill')}
              >
                添加填空题
              </Button>
            </div>
            <Table
              columns={fillColumns}
              dataSource={questions[trainingType].fill}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 800 }}
              size="middle"
            />
          </TabPane>
        </Tabs>
      </Card>

      <Modal
        title={`${modalType === 'add' ? '添加' : '编辑'}${trainingType === 'city' ? '城市' : '时节'}${activeTab === 'single' ? '单选题' : activeTab === 'multiple' ? '多选题' : '填空题'}`}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            保存
          </Button>,
        ]}
        width={700}
      >
        {renderForm()}
      </Modal>
    </div>
  );
};

export default TrainingQuestions; 