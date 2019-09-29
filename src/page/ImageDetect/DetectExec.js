import { Form, Input, Select, Button } from '@alipay/bigfish/antd';
import React, { PureComponent } from '@alipay/bigfish/react';
import { connect } from '@alipay/bigfish/sdk';
import { CreateProjectLayout } from '@alipay/tech-ui';
import styles from './style.less';
import UploadImage from './UploadImage';

const { Option } = Select;
const { TextArea } = Input;

@connect(({ loading, params }) => ({
  submitting: loading.effects['imageDetect/exec'],
  saving: loading.effects['imageDetect/exec'],
  result: params.jsonResult,
}))
@Form.create()
class DetectExec extends PureComponent {
  state = {
    checkResult: {},
  };

  componentDidMount = () => {};

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const params = values;
      if (!err) {
        this.props.dispatch({
          type: 'imageDetect/exec',
          payload: params,
          callback: response => {
            console.log(response);
            this.state.checkResult = response;
            this.forceUpdate();
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

    return (
      <div className={styles.box}>
        <CreateProjectLayout
          title="图片检测"
          onOk={this.handleSubmit}
          okText="提交"
          confirmLoading={submitting}
        >
          <CreateProjectLayout.Content>
            <Form layout="vertical">
              <Form.Item label="待测图片">
                {getFieldDecorator('image', {
                  rules: [
                    {
                      required: true,
                      message: '请上传图片',
                    },
                  ],
                })(<UploadImage />)}
              </Form.Item>
              <Form.Item label="选择检测项">
                {getFieldDecorator('checkOption', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(
                  <Select placeholder="">
                    <Option value="white">白屏检测</Option>
                    <Option value="black">黑屏检测</Option>
                    <Option value="text">字符串检测</Option>
                  </Select>,
                )}
              </Form.Item>
            </Form>
          </CreateProjectLayout.Content>
          <CreateProjectLayout.Sider>
            <TextArea
              style={{ height: 560 }}
              value={JSON.stringify(this.state.checkResult, null, 2)}
              readOnly="readOnly"
            />
          </CreateProjectLayout.Sider>
        </CreateProjectLayout>
      </div>
    );
  }
}

export default DetectExec;
