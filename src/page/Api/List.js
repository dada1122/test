import React, { Component, Fragment } from '@alipay/bigfish/react';
import Link from '@alipay/bigfish/link';
import {
  Table,
  Dropdown,
  Menu,
  Select,
  Row,
  Col,
  Card,
  Form,
  Button,
  Input,
  Divider,
} from '@alipay/bigfish/antd';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;

// 接口工具列表页面
@connect(({ api, loading }) => ({
  api,
  loading: loading.models.api,
}))
@Form.create()
class List extends Component {
  state = {
    searchValue: {},
  };

  columns = [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: '接口名称',
      dataIndex: 'name',
    },
    {
      title: '环境',
      dataIndex: 'env',
    },
    {
      title: '接口类型',
      dataIndex: 'type',
    },
    {
      title: '业务类型',
      dataIndex: 'bizType',
    },
    {
      title: '是否授权',
      dataIndex: 'auth',
    },
    {
      title: '接口ID',
      dataIndex: 'id',
    },
    {
      title: '操作',
      render: record => (
        <Fragment>
          <Link to={`/tools/${record.type.toLowerCase()}/detail/${record.id}`}>详情</Link>
          <Divider type="vertical" />
          <Button onClick={() => this.handleDeleteApi(record.id)}>删除</Button>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'api/fetchList',
    });
  }

  handleChange = pagination => {
    const { dispatch } = this.props;
    const { searchValue } = this.state;
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...searchValue,
    };
    dispatch({
      type: 'api/fetchList',
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
        type: 'api/fetchList',
        payload: values,
      });
    });
  };

  handleSearchReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({ searchValue: {} });
    dispatch({
      type: 'api/fetchList',
    });
  };

  handleAddApi = e => {
    router.push(`/tools/${e.key}/new`);
  };

  handleDeleteApi = id => {
    const { form, dispatch } = this.props;
    const value = {};
    let searchValues;
    form.validateFields((err, fieldValue) => {
      if (err) return;
      searchValues = {
        ...fieldValue,
        updateAt: fieldValue.updateAt && fieldValue.updatedAt.valueOf(),
      };
    });
    value.id = id;
    value.searchValues = searchValues;
    dispatch({
      type: 'api/deleteApi',
      payload: value,
    });
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const addApiMenu = (
      <Menu onClick={this.handleAddApi}>
        <Menu.Item key="hsf">新增HSF接口</Menu.Item>
        <Menu.Item key="json">新增JSON接口</Menu.Item>
        <Menu.Item key="rpc">新增RPC接口</Menu.Item>
        <Menu.Item key="tr">新增TR接口</Menu.Item>
        <Menu.Item key="spi">新增SPI接口</Menu.Item>
      </Menu>
    );
    return (
      <Form layout="inline" onSubmit={this.handleSearchSubmit}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={4} sm={24}>
            <FormItem label="接口类型">
              {getFieldDecorator('type', { initialValue: '%' })(
                <Select placeholder="请选择">
                  <Option value="%">所有</Option>
                  <Option value="JSON">JSON</Option>
                  <Option value="RPC">RPC</Option>
                  <Option value="TR">TR</Option>
                  <Option value="SPI">SPI</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="业务类型">
              {getFieldDecorator('bizType', { initialValue: '%' })(
                <Select placeholder="请选择">
                  <Option value="%">所有</Option>
                  <Option value="INIT">未知</Option>
                  <Option value="BOOKING">预定</Option>
                  <Option value="ITEM">自建</Option>
                  <Option value="RECRUIT">营销</Option>
                  <Option value="GROUP">拼团</Option>
                  <Option value="CRAFTSMAN">手艺人</Option>
                  <Option value="EXERCISE">健身房</Option>
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
          <Col md={6} sm={24}>
            <FormItem label="接口名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <span>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 10 }} onClick={this.handleSearchReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
        <Dropdown overlay={addApiMenu}>
          <Button icon="plus" type="primary" style={{ marginBottom: '20px' }}>
            新增接口
          </Button>
        </Dropdown>
      </Form>
    );
  }

  render() {
    const {
      api: { data },
      loading,
    } = this.props;
    return (
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <Table
            loading={loading}
            rowKey={record => record.key}
            rowId={record => record.id}
            dataSource={data.list}
            columns={this.columns}
            pagination={data.pagination}
            onChange={this.handleChange}
          />
        </div>
      </Card>
    );
  }
}

export default List;
