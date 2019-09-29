import React, { Component } from '@alipay/bigfish/react';
import { connect } from '@alipay/bigfish/sdk';
import { Form, Input, Select, Button, Card, Row, Col, Tabs } from '@alipay/bigfish/antd';
import { stringify } from 'querystring';
import { queryApiDetail } from '../../service/api';
import request from '@/util/request';

const { TabPane } = Tabs;
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const { Password } = Input;

const envList = ['DEV', 'TEST', 'PRE', 'PROD'];
const gatewayData = {
  DEV: [
    'mobilegw.stable.alipay.net',
    'mobilegw.aaa.alipay.net',
    'mobilegw.dev01.alipay.net',
    'mobilegw.dev02.alipay.net',
    'mobilegw.dev03.alipay.net',
    'mobilegw.dev04.alipay.net',
  ],
  TEST: ['mobilegw.test.alipay.net'],
  PRE: ['mobilegwpre.alipay.com'],
  PROD: ['mobilegw.alipay.com'],
};

// 接口详情页
@connect(({ api, loading }) => ({
  api,
  loading,
}))
@Form.create()
class Detail extends Component {
  formItemLayout = {
    labelCol: {
      lg: { span: 4 },
      md: { span: 6 },
      sm: { span: 24 },
      xs: { span: 24 },
    },
    wrapperCol: {
      lg: { span: 20 },
      md: { span: 18 },
      sm: { span: 24 },
      xs: { span: 24 },
    },
  };

  state = {
    gatewayValues: [],
  };

  componentDidMount() {
    const {
      form: { setFieldsValue },
    } = this.props;
    const { id, type } = this.props.match.params;

    if (id) {
      queryApiDetail(id).then(response => {
        try {
          const jsonO = JSON.parse(response.requestParams);
          setFieldsValue({ requestParams: JSON.stringify(jsonO, null, 4) });
        } catch (exception) {
          setFieldsValue({ requestParams: response.requestParams });
          alert(`JSON数据格式不正确:\n${exception.message}`);
        }
        if (type === 'rpc') {
          setFieldsValue({
            apiName: response.apiName,
            clientType: response.clientType,
            env: response.env,
            gateway: response.gateway ? response.gateway : gatewayData[response.env][0],
            httpType: response.httpType,
            bizType: response.bizType,
            password: response.password,
            productVers: response.productVers,
            name: response.name,
            username: response.username,
          });
        } else if (type === 'json') {
          setFieldsValue({
            accountType: response.accountType,
            env: response.env,
            httpType: response.httpType,
            bizType: response.bizType,
            name: response.name,
            password: response.password,
            url: response.url,
            username: response.username,
          });
        } else if (type === 'tr') {
          setFieldsValue({
            name: response.name,
            env: response.env,
            url: response.url,
            bizType: response.bizType,
            application: response.application,
            appVersion: response.appVersion,
            facadeName: response.facadeName,
            methodName: response.methodName,
            requestName: response.requestName,
          });
        } else if (type === 'spi') {
          setFieldsValue({
            accountType: response.accountType,
            bizType: response.bizType,
            name: response.name,
            password: response.password,
            server: response.server,
            gateway: response.gateway,
            requestClass: response.requestClass,
            username: response.username,
          });
        } else if (type === 'hsf') {
          setFieldsValue({
            name: response.name,
            env: response.env,
            appName: response.appName,
            bizType: response.bizType,
            dataId: response.dataId,
            method: response.method,
            ip: response.ip,
          });
        }
      });
    }
  }

  formatJson = () => {
    const {
      form: { getFieldValue, setFieldsValue },
    } = this.props;
    try {
      const jsonO = JSON.parse(getFieldValue('requestParams'));
      setFieldsValue({ requestParams: JSON.stringify(jsonO, null, 4) });
    } catch (e) {
      alert(`JSON数据格式不正确:\n${e.message}`);
    }
  };

  formatResult = obj => {
    try {
      return JSON.stringify(obj, null, 4);
    } catch (e) {
      return stringify(obj);
    }
  };

  handleSave = () => {
    const { form, dispatch } = this.props;
    const { type, id } = this.props.match.params;
    form.validateFieldsAndScroll((err, values) => {
      const params = values;
      params.id = id;
      if (!err) {
        if (type === 'rpc') {
          dispatch({
            type: 'api/updateRpc',
            payload: params,
          });
        } else if (type === 'json') {
          dispatch({
            type: 'api/updateJson',
            payload: params,
          });
        } else if (type === 'tr') {
          dispatch({
            type: 'api/updateTr',
            payload: params,
          });
        } else if (type === 'spi') {
          dispatch({
            type: 'api/updateSpi',
            payload: params,
          });
        } else if (type === 'hsf') {
          dispatch({
            type: 'api/updateHSF',
            payload: params,
          });
        }
      }
    });
  };

  handleCreate = () => {
    const { form, dispatch } = this.props;
    const { type } = this.props.match.params;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (type === 'rpc') {
          dispatch({
            type: 'api/createRpc',
            payload: values,
          });
        } else if (type === 'json') {
          dispatch({
            type: 'api/createJson',
            payload: values,
          });
        } else if (type === 'tr') {
          dispatch({
            type: 'api/createTr',
            payload: values,
          });
        } else if (type === 'spi') {
          dispatch({
            type: 'api/createSpi',
            payload: values,
          });
        } else if (type === 'hsf') {
          dispatch({
            type: 'api/createHSF',
            payload: values,
          });
        }
      }
    });
  };

  handleExecute = () => {
    const { form, dispatch } = this.props;
    const { type } = this.props.match.params;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (type === 'rpc') {
          dispatch({
            type: 'api/executeRpc',
            payload: values,
          });
        } else if (type === 'json') {
          dispatch({
            type: 'api/executeJson',
            payload: values,
          });
        } else if (type === 'tr') {
          dispatch({
            type: 'api/executeTr',
            payload: values,
          });
        } else if (type === 'spi') {
          dispatch({
            type: 'api/executeSpi',
            payload: values,
          });
        } else if (type === 'hsf') {
          dispatch({
            type: 'api/executeHSF',
            payload: values,
          });
        }
      }
    });
  };

  clearHSFDataIds = () => {
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue({
      dataId: null,
      method: null,
      requestParams: null,
    });
  };

  clearHSFMethods = () => {
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue({
      method: null,
      requestParams: null,
    });
  };

  getHSFMethods = () => {
    const env = this.props.form.getFieldValue('env');
    const dataId = this.props.form.getFieldValue('dataId');
    if (env && dataId) {
      request(`/api/hsf/methods?env=${env}&dataId=${dataId}`).then(response => {
        console.log(response);
        this.setState({
          methodOptions: response.map(item => (
            <Option value={item} key={item}>
              {item}
            </Option>
          )),
        });
      });
    }
  };

  getHSFDataIds = () => {
    const env = this.props.form.getFieldValue('env');
    const appName = this.props.form.getFieldValue('appName');

    if (env && appName) {
      request(`/api/hsf/services?env=${env}&appName=${appName}`).then(response => {
        console.log(response);
        this.setState({
          dataIdOptions: response.map(item => (
            <Option value={item} key={item}>
              {item}
            </Option>
          )),
        });
      });
    }
  };

  renderRpcRequest() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { action } = this.props.match.params;
    return (
      <Form>
        <Tabs defaultActiveKey="1">
          <TabPane tab="请求" key="1">
            <FormItem {...this.formItemLayout} label="接口名称">
              {getFieldDecorator('apiName', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="请输入接口名称" />)}
            </FormItem>
            <FormItem {...this.formItemLayout} label="请求类型">
              {getFieldDecorator('httpType', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(
                <Select placeholder="请选择请求类型">
                  <Option value="get">get</Option>
                  <Option value="post">post</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...this.formItemLayout} label="业务类型">
              {getFieldDecorator('bizType', {
                rules: [
                  {
                    required: true,
                    message: '请输入业务类型',
                  },
                ],
              })(
                <Select placeholder="请选择业务类型">
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
            <FormItem {...this.formItemLayout} label="客户端类型">
              {getFieldDecorator('clientType', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(
                <Select placeholder="请选择客户端类型">
                  <Option value="koubei">口碑</Option>
                  <Option value="alipay">支付宝</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...this.formItemLayout} label="客户端版本">
              {getFieldDecorator('productVers', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="请输入客户端版本" />)}
            </FormItem>
            <FormItem {...this.formItemLayout} label="请求参数">
              {getFieldDecorator('requestParams', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<TextArea placeholder="请输入请求参数" rows={14} />)}
            </FormItem>
            <FormItem {...this.formItemLayout} label="保存名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="保存接口必填" />)}
            </FormItem>
          </TabPane>
          <TabPane tab="账号" key="2">
            <Form.Item {...this.formItemLayout} label="网关环境">
              {getFieldDecorator('env', {
                rules: [
                  {
                    required: true,
                    message: '',
                  },
                ],
              })(
                <Select
                  placeholder="请选择环境"
                  onChange={value => {
                    this.setState({ gatewayValues: gatewayData[value] });
                  }}
                >
                  {envList.map(env => (
                    <Option key={env}>{env}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item {...this.formItemLayout} label="网关地址">
              {getFieldDecorator('gateway', {
                rules: [
                  {
                    required: true,
                    message: '',
                  },
                ],
              })(
                <Select placeholder="请选择网关服务器">
                  {this.state.gatewayValues.map(gateway => (
                    <Option key={gateway}>{gateway}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <FormItem {...this.formItemLayout} label="用户名">
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem {...this.formItemLayout} label="密码">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Password placeholder="请输入密码" />)}
            </FormItem>
          </TabPane>
        </Tabs>
        <FormItem>
          <Button
            style={{ marginLeft: 110 }}
            type="primary"
            onClick={this.handleExecute}
            loading={this.props.loading.effects['api/executeRpc']}
          >
            执行
          </Button>
          {action === 'exc' ? null : (
            <Button
              style={{ marginLeft: 50 }}
              onClick={action === 'new' ? this.handleCreate : this.handleSave}
              loading={
                action === 'new'
                  ? this.props.loading.effects['api/createRpc']
                  : this.props.loading.effects['api/updateRpc']
              }
            >
              保存
            </Button>
          )}
          <Button style={{ marginLeft: 50 }} onClick={this.formatJson}>
            格式化
          </Button>
        </FormItem>
      </Form>
    );
  }

  renderJsonRequest() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { action } = this.props.match.params;
    return (
      <Form>
        <Tabs defaultActiveKey="1">
          <TabPane tab="请求" key="1">
            <FormItem {...this.formItemLayout} label="请求类型">
              {getFieldDecorator('httpType', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(
                <Select placeholder="请选择请求类型">
                  <Option value="get">get</Option>
                  <Option value="post">post</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...this.formItemLayout} label="业务类型">
              {getFieldDecorator('bizType', {
                rules: [
                  {
                    required: true,
                    message: '请输入业务类型',
                  },
                ],
              })(
                <Select placeholder="请选择业务类型">
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
            <Form.Item {...this.formItemLayout} label="环境">
              {getFieldDecorator('env', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(
                <Select placeholder="请选择环境">
                  <Option value="DEV">DEV</Option>
                  <Option value="TEST">TEST</Option>
                  <Option value="PRE">PRE</Option>
                  <Option value="PROD">PROD</Option>
                </Select>
              )}
            </Form.Item>
            <FormItem {...this.formItemLayout} label="请求地址">
              {getFieldDecorator('url', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="请输入请求地址" />)}
            </FormItem>
            <FormItem {...this.formItemLayout} label="请求参数">
              {getFieldDecorator('requestParams', {
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
                />
              )}
            </FormItem>
            <FormItem {...this.formItemLayout} label="接口名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="保存的时候必填" />)}
            </FormItem>
          </TabPane>
          <TabPane tab="账号" key="2">
            <Form.Item {...this.formItemLayout} label="账号类型">
              {getFieldDecorator('accountType', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(
                <Select placeholder="请选择登录账户类型">
                  <Option value="crmhome">crmhome</Option>
                  <Option value="kbservcenter">kbservcenter</Option>
                </Select>
              )}
            </Form.Item>
            <FormItem {...this.formItemLayout} label="用户名">
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem {...this.formItemLayout} label="密码">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Password placeholder="请输入密码" />)}
            </FormItem>
          </TabPane>
        </Tabs>
        <FormItem>
          <Button
            style={{ marginLeft: 110 }}
            type="primary"
            onClick={this.handleExecute}
            loading={this.props.loading.effects['api/executeJson']}
          >
            执行
          </Button>
          {action === 'exc' ? null : (
            <Button
              style={{ marginLeft: 50 }}
              onClick={action === 'new' ? this.handleCreate : this.handleSave}
              loading={
                action === 'new'
                  ? this.props.loading.effects['api/createJson']
                  : this.props.loading.effects['api/updateJson']
              }
            >
              保存
            </Button>
          )}
          <Button style={{ marginLeft: 50 }} onClick={this.formatJson}>
            格式化
          </Button>
        </FormItem>
      </Form>
    );
  }

  renderTrRequest() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { action } = this.props.match.params;
    return (
      <Form>
        <Tabs defaultActiveKey="1">
          <TabPane tab="请求" key="1">
            <FormItem {...this.formItemLayout} label="接口名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="保存的时候必填" />)}
            </FormItem>
            <FormItem {...this.formItemLayout} label="业务类型">
              {getFieldDecorator('bizType', {
                rules: [
                  {
                    required: true,
                    message: '请输入业务类型',
                  },
                ],
              })(
                <Select placeholder="请选择业务类型">
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
            <FormItem {...this.formItemLayout} label="环境">
              {getFieldDecorator('env', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(
                <Select placeholder="环境">
                  <Option value="DEV">DEV</Option>
                  <Option value="TEST">TEST</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...this.formItemLayout} label="*VIPURL">
              {getFieldDecorator('url', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="请输入机器域名" />)}
            </FormItem>
            <FormItem {...this.formItemLayout} label="*系统">
              {getFieldDecorator('application', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="请输入应用系统名" />)}
            </FormItem>
            <FormItem {...this.formItemLayout} label="*系统版本">
              {getFieldDecorator('appVersion', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="请输入应用系统版本如 1.0.0.20180628" />)}
            </FormItem>
            <FormItem {...this.formItemLayout} label="*接口类">
              {getFieldDecorator('facadeName', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="请输入接口类全路径" />)}
            </FormItem>
            <FormItem {...this.formItemLayout} label="*接口方法">
              {getFieldDecorator('methodName', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="请输入接口方法名" />)}
            </FormItem>
            <FormItem {...this.formItemLayout} label="*请求类">
              {getFieldDecorator('requestName', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="请输入请求类全路径" />)}
            </FormItem>
            <FormItem {...this.formItemLayout} label="*请求参数">
              {getFieldDecorator('requestParams', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<TextArea placeholder="请输入请求参数(JSON格式)" rows={14} />)}
            </FormItem>
          </TabPane>
        </Tabs>
        <FormItem>
          <Button
            style={{ marginLeft: 110 }}
            type="primary"
            onClick={this.handleExecute}
            loading={this.props.loading.effects['api/executeTr']}
          >
            执行
          </Button>
          {action === 'exc' ? null : (
            <Button
              style={{ marginLeft: 50 }}
              onClick={action === 'new' ? this.handleCreate : this.handleSave}
              loading={
                action === 'new'
                  ? this.props.loading.effects['api/createTr']
                  : this.props.loading.effects['api/updateTr']
              }
            >
              保存
            </Button>
          )}
          <Button style={{ marginLeft: 50 }} onClick={this.formatJson}>
            格式化
          </Button>
        </FormItem>
      </Form>
    );
  }

  renderSpiRequest() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { action } = this.props.match.params;
    return (
      <Form>
        <Tabs defaultActiveKey="1">
          <TabPane tab="请求" key="1">
            <FormItem {...this.formItemLayout} label="接口名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="保存的时候必填" />)}
            </FormItem>
            <FormItem {...this.formItemLayout} label="业务类型">
              {getFieldDecorator('bizType', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(
                <Select placeholder="请选择业务类型">
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
            <FormItem {...this.formItemLayout} label="请求网关">
              {getFieldDecorator('gateway', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="请输入请求网关" />)}
            </FormItem>
            <FormItem {...this.formItemLayout} label="请求服务器">
              {getFieldDecorator('server', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="请输入请求服务器" />)}
            </FormItem>
            <FormItem {...this.formItemLayout} label="请求类">
              {getFieldDecorator('requestClass', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="请输入请求类" />)}
            </FormItem>
            <FormItem {...this.formItemLayout} label="请求参数">
              {getFieldDecorator('requestParams', {
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
                />
              )}
            </FormItem>
          </TabPane>
          <TabPane tab="账号" key="2">
            <Form.Item {...this.formItemLayout} label="账号类型">
              {getFieldDecorator('accountType', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(
                <Select placeholder="请选择登录账户类型">
                  <Option value="crmhome">crmhome</Option>
                  <Option value="kbservcenter">kbservcenter</Option>
                </Select>
              )}
            </Form.Item>
            <FormItem {...this.formItemLayout} label="用户名">
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem {...this.formItemLayout} label="密码">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Password placeholder="请输入密码" />)}
            </FormItem>
          </TabPane>
        </Tabs>
        <FormItem>
          <Button
            style={{ marginLeft: 110 }}
            type="primary"
            onClick={this.handleExecute}
            loading={this.props.loading.effects['api/executeSpi']}
          >
            执行
          </Button>
          {action === 'exc' ? null : (
            <Button
              style={{ marginLeft: 50 }}
              onClick={action === 'new' ? this.handleCreate : this.handleSave}
              loading={
                action === 'new'
                  ? this.props.loading.effects['api/createSpi']
                  : this.props.loading.effects['api/updateSpi']
              }
            >
              保存
            </Button>
          )}
          <Button style={{ marginLeft: 50 }} onClick={this.formatJson}>
            格式化
          </Button>
        </FormItem>
      </Form>
    );
  }

  renderHSFRequest() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { action } = this.props.match.params;
    const { methodOptions, dataIdOptions } = this.state;
    return (
      <Form>
        <Tabs defaultActiveKey="1">
          <TabPane tab="请求" key="1">
            <FormItem {...this.formItemLayout} label="name">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '',
                  },
                ],
              })(<Input placeholder="请输入接口名称" />)}
            </FormItem>
            <FormItem {...this.formItemLayout} label="bizType">
              {getFieldDecorator('bizType', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(
                <Select placeholder="请选择业务类型">
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
            <FormItem {...this.formItemLayout} label="env">
              {getFieldDecorator('env', {
                rules: [
                  {
                    required: true,
                    message: '',
                  },
                ],
              })(
                <Select placeholder="请选择环境类型">
                  <Option value="DAILY">DAILY</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...this.formItemLayout} label="appName">
              {getFieldDecorator('appName', {
                rules: [
                  {
                    required: true,
                    message: '',
                  },
                ],
              })(
                <Select placeholder="请选择应用名称" onChange={this.clearHSFDataIds}>
                  <Option value="kbtservindustry">kbtservindustry</Option>
                  <Option value="kbtgroupplatform">kbtgroupplatform</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...this.formItemLayout} label="dataId">
              {getFieldDecorator('dataId', {
                rules: [
                  {
                    required: true,
                    message: '',
                  },
                ],
              })(
                <Select
                  placeholder="请选择服务ID"
                  onDropdownVisibleChange={this.getHSFDataIds}
                  onChange={this.clearHSFMethods}
                >
                  {dataIdOptions}
                </Select>
              )}
            </FormItem>
            <FormItem {...this.formItemLayout} label="method">
              {getFieldDecorator('method', {
                rules: [
                  {
                    required: true,
                    message: '',
                  },
                ],
              })(
                <Select placeholder="请选择方法名" onDropdownVisibleChange={this.getHSFMethods}>
                  {methodOptions}
                </Select>
              )}
            </FormItem>
            <FormItem {...this.formItemLayout} label="ip">
              {getFieldDecorator('ip', {
                rules: [
                  {
                    required: false,
                    message: '',
                  },
                ],
              })(<Input placeholder="如果指定机器，请输入IP地址" />)}
            </FormItem>
            <FormItem {...this.formItemLayout} label="params">
              {getFieldDecorator('requestParams', {
                rules: [
                  {
                    required: true,
                    message: '',
                  },
                ],
              })(<TextArea placeholder="请输入请求参数(JSON格式)" rows={14} />)}
            </FormItem>
          </TabPane>
        </Tabs>
        <FormItem>
          <Button
            style={{ marginLeft: 110 }}
            type="primary"
            onClick={this.handleExecute}
            loading={this.props.loading.effects['api/executeHSF']}
          >
            执行
          </Button>
          {action === 'exc' ? null : (
            <Button
              style={{ marginLeft: 50 }}
              onClick={action === 'new' ? this.handleCreate : this.handleSave}
              loading={
                action === 'new'
                  ? this.props.loading.effects['api/createHSF']
                  : this.props.loading.effects['api/updateHSF']
              }
            >
              保存
            </Button>
          )}
          <Button style={{ marginLeft: 50 }} onClick={this.formatJson}>
            格式化
          </Button>
        </FormItem>
      </Form>
    );
  }

  renderRequest(type) {
    if (type === 'rpc') {
      return this.renderRpcRequest();
    }
    if (type === 'json') {
      return this.renderJsonRequest();
    }
    if (type === 'tr') {
      return this.renderTrRequest();
    }
    if (type === 'spi') {
      return this.renderSpiRequest();
    }
    if (type === 'hsf') {
      return this.renderHSFRequest();
    }

    return <p>暂无数据</p>;
  }

  render() {
    const { type } = this.props.match.params;

    return (
      <div style={{ background: '#ECECEC', padding: '5px' }}>
        <Row gutter={16}>
          <Col lg={12} md={12} sm={24}>
            <Card bordered={false}>{this.renderRequest(type)}</Card>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Card bordered={false} title="执行结果" style={{ height: '800px' }}>
              <TextArea
                value={this.formatResult(this.props.api.result)}
                readOnly="readOnly"
                style={{ height: '600px' }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Detail;
