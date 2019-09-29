import React, { PureComponent, Fragment } from '@alipay/bigfish/react';
import { Modal, Row, Col, Card, Form, Divider, Button, Input, Select } from '@alipay/bigfish/antd';
import history from '@alipay/bigfish/sdk/history';
import StandardTable from '@/component/StandardTable';
import GridContent from '@/component/PageHeaderWrapper/GridContent';
import { connect } from '@alipay/bigfish/sdk';
import styles from './style.less';
import Link from '@alipay/bigfish/link';

const FormItem = Form.Item;
const { Option } = Select;

//测试用例列表页面
@connect(({ testCase, loading }) => ({
  testCase,
  loading: loading.models.testCase,
}))
@Form.create()
class List extends PureComponent {
  state = {
    selectedRows: [],
    expandForm: false,
    searchValue: {},
    visible: false,
    loading: false,
  };

  columns = [
    {
      title: '用例编号',
      dataIndex: 'id',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '用例名称',
      dataIndex: 'name',
    },
    {
      title: '业务模块',
      dataIndex: 'module',
    },
    {
      title: '所属系统',
      dataIndex: 'appName',
    },
    {
      title: '调用方法',
      dataIndex: 'method',
    },
    {
      title: '执行环境',
      dataIndex: 'env',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.executeTestCase(record.name, record.env, record.id)}>执行</a>
          <Divider type="vertical" />
          <Link to={`/testcase/edit/${record.id}`}>编辑</Link>
          <Divider type="vertical" />
          <Link to={`/testrecord/list?caseId=${record.id}`}>执行记录</Link>
          <Divider type="vertical" />
          <Link to={`/testcase/edit/${record.id}?duplicate=true`}>复制</Link>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { form, dispatch } = this.props;
    dispatch({
      type: 'testCase/fetchList',
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  batchExecuteTestCase = e => {
    const {
      testCase: { data },
      form,
      dispatch,
    } = this.props;
    console.log(data);
    const { selectedRows } = this.state;
    let params = {};
    if (selectedRows.length === 0) return;
    let idList = [];

    selectedRows.map(function(row) {
      idList.push(row.id);
    });

    form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      params.detailName = values.detailName;
      params.env = values.env;

      params.executeCases = [];
      data.list.map(function(testcase) {
        console.log(idList.indexOf(testcase.id));
        console.log(JSON.stringify(idList));
        if (idList.indexOf(testcase.id) > 0 && testcase.env === values.env) {
          params.executeCases.push({ caseId: testcase.id, caseName: testcase.name });
        }
      });
      dispatch({
        type: 'testCase/exec',
        payload: params,
        callback: res => {
          if (res) {
            // router.push(`/testdetail/list/${res.model}`);
          }
        },
      });
    });
  };

  executeTestCase = (name, env, id) => {
    const { dispatch } = this.props;
    let params = {};
    params.detailName = name + new Date().getTime();
    params.env = env;
    params.executeCases = [{ caseId: id, caseName: name }];
    dispatch({
      type: 'testCase/exec',
      payload: params,
      callback: res => {
        if (res) {
          history.push('/testdetail/list/${res.model}');
          // router.push(`/testdetail/list/${res.model}`);
        }
      },
    });
  };

  previewItem = id => {
    history.push(`/offline/testcase/detail/${id}`);
  };

  handleChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;
    const { searchValue } = this.state;
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...searchValue,
    };
    dispatch({
      type: 'testCase/fetchList',
      payload: params,
    });
  };

  handleSearchSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields((err, fieldValue) => {
      if (err) return;
      const values = {
        ...fieldValue,
        updateAt: fieldValue.updateAt && fieldValue.updatedAt.valueOf(),
      };
      this.setState({ searchValue: values });
      dispatch({
        type: 'testCase/fetchList',
        payload: values,
      });
    });
  };

  handleSearchReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({ searchValue: {} });
    dispatch({
      type: 'testCase/fetchList',
    });
  };

  handleSelect = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  renderExecutionForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form layout="inline" onSubmit={this.batchExecuteTestCase}>
        <Row gutter={16}>
          <Col lg={6} md={6} sm={24}>
            <FormItem label="参数名称">
              {getFieldDecorator('detailName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={6} md={6} sm={24}>
            <FormItem label="业务归属">
              {getFieldDecorator('env')(<Input placeholder="" />)}
            </FormItem>
          </Col>
          <Col lg={6} md={6} sm={24}>
            <span>
              <Button type="primary" htmlType="submit">
                开始执行
              </Button>
              <Button onClick={this.handleSearchReset}>重置</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form layout="inline" onSubmit={this.handleSearchSubmit}>
        <Row gutter={16}>
          <Col lg={6} md={6} sm={24}>
            <FormItem label="用例名称">
              {getFieldDecorator('name', { initialValue: '' })(
                <Input placeholder="请输入" allowClear={true} />
              )}
            </FormItem>
          </Col>
          <Col lg={6} md={6} sm={24}>
            <FormItem label="用例集合">
              {getFieldDecorator('testSet', { initialValue: '' })(
                <Select placeholder="请选择" allowClear={true}>
                  <Option value="0">日常回归</Option>
                  <Option value="1">核心用例</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col lg={6} md={6} sm={24}>
            <FormItem label="所属系统">
              {getFieldDecorator('appName', { initialValue: '' })(
                <Select placeholder="请选择" allowClear={true}>
                  <Option value="kbgrouppurchaseprod">kbgrouppurchaseprod</Option>
                  <Option value="kbreservation">kbreservation</Option>
                  <Option value="kbservindustryprod">kbservindustryprod</Option>
                  <Option value="kbcraftsman">kbcraftsman</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={6} md={6} sm={24}>
            <FormItem label="业务模块">
              {getFieldDecorator('module', { initialValue: '', rules: [{ required: false }] })(
                <Select placeholder="请选择" allowClear={true}>
                  <Option value="grouppurchase">拼团</Option>
                  <Option value="booking">预定</Option>
                  <Option value="commercial">商业化</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col lg={6} md={6} sm={24}>
            <FormItem label="执行环境">
              {getFieldDecorator('env', { initialValue: '', rules: [{ required: false }] })(
                <Select placeholder="请选择执行环境" allowClear={true}>
                  <Option value="dev">开发环境</Option>
                  <Option value="test">测试环境</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col lg={6} md={6} sm={24}>
            <FormItem label="调用方法">
              {getFieldDecorator('method', { initialValue: '' })(
                <Select placeholder="请选择调用方法" allowClear={true}>
                  <Option value="rpc">RPC</Option>
                  <Option value="tr">TR</Option>
                  <Option value="http">HTTP</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col lg={6} md={6} sm={24}>
            <span>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button onClick={this.handleSearchReset}>重置</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      testCase: { data },
      loading: loading,
    } = this.props;

    const { selectedRows, visible } = this.state;
    return (
      <GridContent>
        <Row>
          <Col lg={20} offset={2}>
            <Card>
              <div>
                <div className={styles.tableListForm}>{this.renderForm()}</div>
                <div style={{ marginBottom: '24px', display: 'flex' }}>
                  <Button icon="plus" type="primary">
                    新建
                  </Button>
                  {selectedRows.length > 0 && <Button onClick={this.showModal}>批量执行</Button>}
                </div>
                <Modal
                  visible={visible}
                  title="新增动态参数"
                  onOk={this.batchExecuteTestCase}
                  onCancel={this.handleCancel}
                  footer={[
                    <Button key="back" onClick={this.handleCancel}>
                      返回
                    </Button>,
                    <Button
                      key="submit"
                      type="primary"
                      loading={loading}
                      onClick={this.batchExecuteTestCase}
                    >
                      确认
                    </Button>,
                  ]}
                >
                  <div>{this.renderExecutionForm()}</div>
                </Modal>
                <StandardTable
                  loading={loading}
                  selectedRows={selectedRows}
                  data={data}
                  columns={this.columns}
                  onSelectRow={this.handleSelect}
                  onChange={this.handleChange}
                  rowkey="id"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default List;
