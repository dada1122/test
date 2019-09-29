import React, { Component, Fragment } from '@alipay/bigfish/react';
import { Button, Table, Form, Row, Col, Card, Input } from '@alipay/bigfish/antd';
import { connect } from '@alipay/bigfish/sdk';
import GridContent from '@/component/PageHeaderWrapper/GridContent';
import styles from './style.less';

const FormItem = Form.Item;

@connect(({ bizatomicrulesmanager, loading }) =>({
  bizatomicrulesmanager,
  loading: loading.models.bizatomicrulesmanager,
}))

@Form.create()
class TableList extends Component {
  state = {
    searchValue: {},
  };

  columns = [
    {
      title: '规则ID',
      dataIndex: 'id',
    },
    {
      title: '业务规则',
      dataIndex: 'bizCode',
    },
    {
      title: '原子规则描述',
      dataIndex: 'ruleKey',
    },
    {
      title: '操作',
      render: (text, bizatomicrulesmanager) => (
          <Fragment>
            <Button onClick={() => this.handleDeleteApi(bizatomicrulesmanager.id)}>移除</Button>
          </Fragment>
      ),
    },
  ];


  handleChange = pagination => {
    const { dispatch } = this.props;
    const { searchValue } = this.state;
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...searchValue,
    };
    dispatch({
      type: 'bizatomicrulesmanager/fetch',
      payload: params,
    });
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
      type: 'api/bizatomicrulesmanager',
      payload: value,
    });
  };

  handleSearchSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields((err, fieldValue) => {
      if (err) return;
      dispatch({
        type: 'bizatomicrulesmanager/queryBizRuleList',
        payload: {
          bizcode: fieldValue.bizcode,
          currentPage: 1,
          pageSize: 2
        },
      });
    });
  };

  addBizRule = () => {

  };

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
          <Form layout="inline">
            <Row>
              <Col lg={6} md={24} sm={24}>
                <FormItem label="业务规则code">
                  {getFieldDecorator('bizcode')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col lg={6} md={24} sm={24}>
              <span>
                <Button style={{ marginLeft: 8 }} type="primary" onClick={this.handleSearchSubmit}>
                  查询
                </Button>
              </span>
                <span>
                <Button style={{ marginLeft: 8 }} type="primary" onClick={this.addBizRule}>
                  新增规则
                </Button>
              </span>
              </Col>
            </Row>
          </Form>
    );
  }

  render() {
    const {
      bizatomicrulesmanager: { data },
      loading,
      showAddRule
    } = this.props;

    console.log(data);
    console.log('showAddRule', showAddRule)

    return (
        <div>
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
          {showAddRule ?
        <div className="alert">
          <Input placeholder="请输入规则名" />
          <Button style={{ marginLeft: 8 }} type="primary" onClick={this.handleSearchSubmit}>
          新增
        </Button> </div>: null }
          </div>
    );
  }
}

export default TableList;
