import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Card, Row, Tabs, Table } from 'antd';
import { getParameter } from '@/util/utils';
import request from '@/util/request';

const FormItem = Form.Item;
const { TabPane } = Tabs;
const id = getParameter('id');

@connect(({ loading, dbQuery }) => ({
  submitting: loading.effects['dbQuery/submitToolExec'],
  result: dbQuery.jsonResult,
}))
@Form.create()
export default class DBQuery extends PureComponent {
  state = {
    data: {},
    parameters: {},
    tableCol: [],
    tableData: [],
    tableName: [],
  };

  componentDidMount = () => {
    request(`/api/tool/list/${id}`).then(response => {
      this.setState({ data: response, parameters: JSON.parse(response.parameters) });
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { data } = this.state;
        data.parameters = JSON.stringify(values);
        this.props.dispatch({
          type: 'dbQuery/submitToolExec',
          payload: data,
          callback: response => {
            this.state.tableCol = [];
            this.state.tableName = [];
            this.state.tableData = [];
            response.map((element, index) => {
              const col = [];
              element.headers.map((head, index) => {
                col.push({
                  title: head,
                  dataIndex: head,
                  textWrap: 'word-break',
                });
              });
              this.state.tableCol.push(col);
              this.state.tableName.push(element.table);
              this.state.tableData.push(element.data);
            });
          },
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 10 },
        md: { span: 18 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 10 },
      },
    };

    const cardLayout = {
      height: 800,
    };

    return (
      <div style={{ background: '#ECECEC', padding: '5px' }}>
        <Row gutter={16}>
          <Card bordered={false}>
            <Form onSubmit={this.handleSubmit} hideRequiredMark>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Request" key="1">
                  {Object.keys(this.state.parameters).map(attr => (
                    <FormItem {...formItemLayout} label={attr}>
                      {getFieldDecorator(attr, {
                        rules: [
                          {
                            required: false,
                            message: '',
                          },
                        ],
                      })(<Input placeholder="请输入" />)}
                    </FormItem>
                  ))}
                </TabPane>
              </Tabs>
              <FormItem {...submitFormLayout}>
                <Button type="primary" htmlType="submit" loading={submitting}>
                  提交
                </Button>
              </FormItem>
            </Form>
          </Card>
        </Row>
        <Row gutter={16}>
          <Card bordered={false}>
            {this.state.tableName.length > 0 &&
              this.state.tableName.map((element, index) => (
                <Table
                  columns={this.state.tableCol[index]}
                  dataSource={this.state.tableData[index]}
                  bordered
                  title={() => element}
                  size="middle"
                  scroll={{ x: 1300 }}
                />
              ))}
          </Card>
        </Row>
      </div>
    );
  }
}
