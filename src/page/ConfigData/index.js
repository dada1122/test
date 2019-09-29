import React, { PureComponent } from '@alipay/bigfish/react';
import { connect } from '@alipay/bigfish/sdk';
import { Row, Col, Card, Form, Input, Select, Button, message } from '@alipay/bigfish/antd';
import router from 'umi/router';
import ConfigTable from './component/ConfigTable';
import request from '@/util/request';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ params, loading }) => ({
  params,
  loading: loading.models.params,
}))
@Form.create()
export default class ConfigList extends PureComponent {
  state = {
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'params/list',
    });
  }

  handleConfigChange = (pagination, filtersArg, sorter) => {
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
      type: 'params/save',
      payload: params,
    });
  };

  handleConfigDelete = id => {
    const res = request(`/dynamic_param/delete?id=${id}`);
    res.then(response => {
      if (response.success) {
        message.success(response.errorMsg);
        this.handleFormReset();
      } else {
        message.error(response.errorMsg);
      }
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'params/list',
      payload: {},
    });
  };

  handleAddParam = () => {
    router.push('/offline/param_edit');
  };

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
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
        type: 'params/list',
        payload: values,
      });
    });
  };

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 4, lg: 10, xl: 24 }}>
          <Col md={4} sm={24}>
            <FormItem label="模块">
              {getFieldDecorator('module', { initialValue: '%' })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="%">所有</Option>
                  <Option value="GROUP">拼团</Option>
                  <Option value="PRESERVE">预定</Option>
                  <Option value="CRAFTSMAN">手艺人</Option>
                  <Option value="INDUSTRY">行业流量</Option>
                  <Option value="OTHERS">其他</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="环境">
              {getFieldDecorator('env', { initialValue: '%' })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="%">所有</Option>
                  <Option value="dev">dev</Option>
                  <Option value="test">test</Option>
                  <Option value="prod">prod</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="类型">
              {getFieldDecorator('type', { initialValue: '%' })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="%">所有</Option>
                  <Option value="SQL_DYNAMIC">SQL类型动态化参数</Option>
                  <Option value="API_DYNAMIC">接口类型动态化参数</Option>
                  <Option value="TESTCASE_DYNAMIC">测试用例类型动态化参数</Option>
                  <Option value="CONSTANT_DYNAMIC">常量类型动态化参数</Option>
                  <Option value="OTHERS">其他</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <span className={styles.submitButtons}>
              <Button htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <Button style={{ marginLeft: 8 }} type="primary" onClick={this.handleAddParam}>
                新增参数
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      params: { data },
      loading,
    } = this.props;
    return (
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <ConfigTable
            loading={loading}
            data={data}
            onChange={this.handleConfigChange}
            onDelete={this.handleConfigDelete}
          />
        </div>
      </Card>
    );
  }
}
