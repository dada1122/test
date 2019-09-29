import React, { PureComponent } from '@alipay/bigfish/react';
import { connect } from '@alipay/bigfish/sdk';
import { Form, Input, Select, Button, Card, Row, Col } from '@alipay/bigfish/antd';
import { getParameter } from '@/util/utils';
import request from '@/util/request';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@connect(({ loading, params }) => ({
  submitting: loading.effects['params/save'],
  saving: loading.effects['params/save'],
  result: params.jsonResult,
}))
@Form.create()
export default class ConfigForms extends PureComponent {
  // 载入默认值
  componentDidMount = () => {
    const id = getParameter('id');
    if (id > 0) {
      const res = request(`/dynamic_param/query/${id}`);
      res.then(response => {
        if (response.type !== undefined) {
          this.props.form.setFieldsValue({ type: response.type });
        }
        if (response.module !== undefined) {
          this.props.form.setFieldsValue({ module: response.module });
        }
        if (response.name !== undefined) {
          this.props.form.setFieldsValue({ name: response.name });
        }
        if (response.author !== undefined) {
          this.props.form.setFieldsValue({ author: response.author });
        }
        if (response.env !== undefined) {
          this.props.form.setFieldsValue({ env: response.env });
        }
        if (response.param !== undefined) {
          this.props.form.setFieldsValue({ param: response.param });
        }
      });
    }
  };

  // 格式化json请求参数
  onFormatJson = e => {
    e.preventDefault();
    if (this.props.form.getFieldValue('param') !== undefined) {
      const jsonString = this.props.form.getFieldValue('param');
      try {
        const jsonObj = JSON.parse(jsonString);
        this.props.form.setFieldsValue({ param: JSON.stringify(jsonObj, null, 4) });
      } catch (exception) {
        alert(`JSON数据格式不正确:\n${exception.message}`);
      }
    }
  };

  // 更新&保存
  handleEdit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const params = values;
      const id = getParameter('id');
      if (id > 0) {
        params.id = id;
      }
      if (!err) {
        this.props.dispatch({
          type: 'params/update',
          payload: params,
        });
      }
    });
  };

  // 调试
  handleDebug = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'params/debug',
          payload: values,
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
        sm: { span: 4 },
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
        sm: { span: 15, offset: 6 },
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
              <Form className={styles.jsonForm} onSubmit={this.handleSubmit} hideRequiredMark>
                <FormItem {...formItemLayout} label="名称">
                  {getFieldDecorator('name', {
                    rules: [
                      {
                        required: false,
                        message: '',
                      },
                    ],
                  })(<Input placeholder="保存的时候必填" />)}
                </FormItem>

                <FormItem {...formItemLayout} label="模块">
                  {getFieldDecorator('module', {
                    rules: [
                      {
                        required: false,
                        message: '',
                      },
                    ],
                  })(
                    <Select placeholder="请选择模块">
                      <Option value="%">所有</Option>
                      <Option value="GROUP">拼团</Option>
                      <Option value="PRESERVE">预定</Option>
                      <Option value="CRAFTSMAN">手艺人</Option>
                      <Option value="INDUSTRY">行业流量</Option>
                      <Option value="OTHERS">其他</Option>
                    </Select>
                  )}
                </FormItem>

                <FormItem {...formItemLayout} label="类型">
                  {getFieldDecorator('type', {
                    rules: [
                      {
                        required: false,
                        message: '',
                      },
                    ],
                  })(
                    <Select placeholder="请选择数据类型">
                      <Option value="%">所有</Option>
                      <Option value="SQL_DYNAMIC">SQL类型动态化参数</Option>
                      <Option value="API_DYNAMIC">接口类型动态化参数</Option>
                      <Option value="TESTCASE_DYNAMIC">测试用例类型动态化参数</Option>
                      <Option value="CONSTANT_DYNAMIC">常量类型动态化参数</Option>
                      <Option value="OTHERS">其他</Option>
                    </Select>
                  )}
                </FormItem>

                <FormItem {...formItemLayout} label="环境">
                  {getFieldDecorator('env', {
                    rules: [
                      {
                        required: false,
                        message: '',
                      },
                    ],
                  })(
                    <Select placeholder="请选择配置环境">
                      <Option value="DEV">开发环境</Option>
                      <Option value="TEST">测试环境</Option>
                      <Option value="PRE">预发环境</Option>
                      <Option value="PROD">线上环境</Option>
                    </Select>
                  )}
                </FormItem>

                <FormItem {...formItemLayout} label="作者">
                  {getFieldDecorator('author', {
                    rules: [
                      {
                        required: false,
                        message: '',
                      },
                    ],
                  })(<Input placeholder="保存的时候必填" />)}
                </FormItem>

                <FormItem {...formItemLayout} label="参数值">
                  {getFieldDecorator('param', {
                    rules: [
                      {
                        required: false,
                        message: '',
                      },
                    ],
                  })(
                    <TextArea
                      placeholder="请输入请求参数"
                      style={{ overflow: scroll, resize: 'none' }}
                      rows={14}
                      onBlur={this.onFormatJson}
                    />
                  )}
                </FormItem>

                <FormItem {...submitFormLayout}>
                  <Button
                    style={{ marginLeft: 60 }}
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    onClick={this.handleEdit}
                  >
                    保存
                  </Button>
                  <Button
                    style={{ marginLeft: 60 }}
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    onClick={this.handleDebug}
                  >
                    调试
                  </Button>
                </FormItem>
              </Form>
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false} style={cardLayout}>
              <TextArea
                style={{ height: 620, overflow: scroll, resize: 'none' }}
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
