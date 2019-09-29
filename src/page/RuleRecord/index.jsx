import { Button, Card, Col, Form, Row, Select, Radio } from '@alipay/bigfish/antd';
import React, { Component, Fragment } from '@alipay/bigfish/react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from '@alipay/bigfish/sdk';
import StandardTable from './component/StandardTable';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ ruleRecord, loading }) => ({
  ruleRecord,
  loading: loading.models.ruleRecord,
}))
class TableList extends Component {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    markResult: [],
  };

  columns = [
    {
      title: '图片',
      dataIndex: 'url',
      render: (text, record) => {
        return <img style={{ width: '20%', height: '20%' }} src={record.url} alt={record.url} />;
      },
    },
    {
      title: '检测记录',
      dataIndex: 'recordNo',
    },
    {
      title: '校验规则',
      dataIndex: 'ruleKey',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Radio.Group onChange={e => this.handleMark(record, e)}>
          <Radio value={true}>正确</Radio>
          <Radio value={false}>错误</Radio>
        </Radio.Group>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'ruleRecord/fetch',
    });
  }

  handleMark = (record, e) => {
    e.preventDefault();
    let x = this.state.markResult;
    x.push({ recordNo: record.recordNo, mark: e.target.value });
    this.setState({ markResult: x });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'ruleRecord/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'ruleRecord/fetch',
      payload: {},
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (!selectedRows) return;

    var param = this.state.markResult;

    dispatch({
      type: 'ruleRecord/update',
      payload: {
        param,
      },
      callback: () => {
        this.setState({
          selectedRows: [],
        });
        this.handleFormReset();
      },
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'ruleRecord/fetch',
        payload: values,
      });
    });
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="规则名称">
              {getFieldDecorator('ruleKey')(
                <Select
                  placeholder="请选择"
                  style={{
                    width: '100%',
                  }}
                >
                  <Option value="WHITE_SCREEN_DETECTION">白屏检测</Option>
                  <Option value="ERROR_PAGE_DETECTION">错误页面检测</Option>
                  <Option value="TEXT_ANOMALY_DETECTION">异常文本检测</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="是否已标注">
              {getFieldDecorator('isFeedback')(
                <Select
                  placeholder="请选择"
                  style={{
                    width: '100%',
                  }}
                >
                  <Option value="true">已标注</Option>
                  <Option value="false">未标注</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
                onClick={this.handleFormReset}
              >
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      ruleRecord: { data },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              {selectedRows.length > 0 && (
                <span>
                  <Button onClick={this.handleMenuClick}>批量提交</Button>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              rowKey="recordNo"
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(TableList);
