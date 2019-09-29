import React, { Component, Fragment } from '@alipay/bigfish/react';
import Link from '@alipay/bigfish/link';
import { Table, Row, Col, Card, Form, Button, DatePicker, Input } from '@alipay/bigfish/antd';
import { connect } from 'dva';
import styles from './style.less';
import GridContent from '@/component/PageHeaderWrapper/GridContent';

const FormItem = Form.Item;

// 接口工具列表页面
@connect(({ testdetail, loading }) => ({
  testdetail,
  loading: loading.models.rule,
}))
@Form.create()
class TableList extends Component {
  state = {
    searchValue: {},
  };

  columns = [
    {
      title: '详情编号',
      dataIndex: 'id',
    },
    {
      title: '详情名称',
      dataIndex: 'name',
    },
    {
      title: '用例集合',
      dataIndex: 'testSet',
    },
    {
      title: '执行环境',
      dataIndex: 'env',
    },
    {
      title: '执行者',
      dataIndex: 'operator',
    },
    {
      title: '创建时间',
      dataIndex: 'gmtCreate',
    },
    {
      title: '进度(成功/失败/总数)',
      dataIndex: 'process',
      align: 'center',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <Link to={`testrecord/${record.id}`}>查看详情</Link>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    const { testdetailId } = this.props.match.params;
    dispatch({
      type: 'testdetail/fetch',
      payload: { detailId: testdetailId },
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
      type: 'testdetail/fetch',
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
        type: 'testdetail/fetch',
        payload: values,
      });
    });
  };

  handleSearchReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({ searchValue: {} });
    dispatch({
      type: 'testdetail/fetch',
    });
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form layout="inline" onSubmit={this.handleSearchSubmit}>
        <Row>
          <Col lg={6} md={24} sm={24}>
            <FormItem label="详情名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col lg={6} md={24} sm={24}>
            <FormItem label="开始时间">
              {getFieldDecorator('startDate')(
                <DatePicker
                  showTime
                  format="YYYY-MM-DD hh:mm:ss"
                  placeholder="请选择"
                  style={{ width: 200 }}
                />
              )}
            </FormItem>
          </Col>
          <Col lg={6} md={24} sm={24}>
            <FormItem label="结束时间">
              {getFieldDecorator('endDate')(
                <DatePicker
                  showTime
                  format="YYYY-MM-DD hh:mm:ss"
                  placeholder="请选择"
                  style={{ width: 200 }}
                />
              )}
            </FormItem>
          </Col>
          <Col lg={6} md={24} sm={24}>
            <span>
              <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleSearchReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      testdetail: { data },
      loading,
    } = this.props;

    console.log(data);
    return (
      <GridContent>
        <Row>
          <Col lg={20} offset={2}>
            <Card>
              <div>
                <div className={styles.tableListForm}>{this.renderForm()}</div>
                <Table
                  dataSource={data.list}
                  columns={this.columns}
                  loading={loading}
                  onChange={this.handleChange}
                  pagination={data.pagination}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default TableList;
