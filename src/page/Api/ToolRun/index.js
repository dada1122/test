import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Card, Row, Col, Tabs } from 'antd';
import { getParameter } from '@/util/utils';
import request from '@/util/request';

const FormItem = Form.Item;
const { TextArea } = Input;
const { TabPane } = Tabs;
const id = getParameter('id');

@connect(({ loading, toolRun }) => ({
  submitting: loading.effects['toolRun/submitToolExec'],
  result: toolRun.jsonResult,
}))
@Form.create()
export default class JsonForms extends PureComponent {
  state = {
    data: {},
    parameters: {},
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
          type: 'toolRun/submitToolExec',
          payload: data,
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
          <Col span={12}>
            <Card bordered={false} style={cardLayout}>
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
          </Col>
          <Col span={12}>
            <Card bordered={false} style={cardLayout}>
              <TextArea
                style={{ height: 560 }}
                value={JSON.stringify(this.props.result, null, 2)}
                readOnly="readOnly"
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
