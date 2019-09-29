import React, { PureComponent } from '@alipay/bigfish/react';
import {
  Form,
  Row,
  Col,
  Card,
  Input,
  Select,
  Button,
  Checkbox,
  Radio,
  Tooltip,
} from '@alipay/bigfish/antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import GridContent from '@/component/PageHeaderWrapper/GridContent';
import { connect } from '@alipay/bigfish/sdk';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

@connect(({ testCase, loading }) => ({
  testCase,
  loading: loading.effects['testCase/fetchDetail'],
}))
//测试用例编辑页面
@Form.create()
class Edit extends PureComponent {
  state = {
    checkPoint: { CONSTANT: [], SQL: [], JSON: [] },
    param: [],
    dynamicParam: [],
  };

  handleSubmit = e => {
    const {
      testCase: { data },
      form,
      dispatch,
    } = this.props;
    let { duplicate } = this.props.location.query;

    e.preventDefault();

    form.validateFieldsAndScroll((err, values) => {
      if (duplicate === 'true') {
        delete values.id;
      }
      if (!err) {
        dispatch({
          type: 'testCase/update',
          payload: values,
        });
      }
    });
  };

  componentDidMount() {
    const {
      form: { setFieldsValue },
      dispatch,
    } = this.props;
    const { id } = this.props.match.params;

    dispatch({
      type: 'testCase/fetchDetail',
      payload: id,

      callback: response => {
        console.log('hhhhh');
        console.log(response);
        if (id) {
          const detail = response;
          //detail.dynamicParams = JSON.parse(detail.dynamicParams);
          //detail.checkPoints = JSON.parse(detail.checkPoints);
          const jsonCheckPoint = [];
          const sqlCheckPoint = [];
          const checkpoint = [];
          let jsonNotNull = false;
          let sqlNotNull = false;
          let x = this.state.checkPoint;
          detail.checkPoints.map(function(checkpoint) {
            if (checkpoint.type === 'CONSTANT') {
            }
            if (checkpoint.type === 'SQL') {
              jsonCheckPoint.push(checkpoint);
              x.SQL.push(checkpoint);
              jsonNotNull = true;
            }

            if (checkpoint.type === 'JSON') {
              sqlCheckPoint.push(checkpoint);
              x.JSON.push(checkpoint);
              sqlNotNull = true;
            }
          });
          if (jsonNotNull) {
            checkpoint.push('JSON');
          }
          if (sqlNotNull) {
            checkpoint.push('SQL');
          }

          setFieldsValue({
            id: detail.id,
            name: detail.name,
            module: detail.module,
            appName: detail.appName,
            author: detail.author,
            env: detail.env,
            method: detail.method,
            testSet: detail.testSet,
            type: detail.type,
            param: detail.param,
            checkpoint: checkpoint,
          });

          let y = this.state.dynamicParam;
          detail.dynamicParams.map(function(dynamicParam) {
            y.push(dynamicParam);
          });
          this.setState({ checkPoint: x, dynamicParam: y });
          this.forceUpdate();
        }
      },
    });
  }

  handleAddCheckSql = e => {
    e.preventDefault();
    let x = this.state.checkPoint;
    x.SQL.push({ '': '' });
    this.setState({ checkPoint: x });
    this.forceUpdate();
  };

  handleAddCheckJson = e => {
    e.preventDefault();
    let x = this.state.checkPoint;
    x.JSON.push({ '': '' });
    this.setState({ checkPoint: x });
    this.forceUpdate();
  };

  handleAddParams = e => {
    e.preventDefault();
    let x = this.state.param;
    x.push({ '': '' });
    this.setState({ param: x });
    this.forceUpdate();
  };

  handleAddDynamicParams = e => {
    e.preventDefault();
    let x = this.state.dynamicParam;
    x.push({ '': '' });
    this.setState({ dynamicParam: x });
    this.forceUpdate();
  };

  handleDeleteCheckSql(index) {
    let x = this.state.checkPoint;
    x.SQL.splice(index, 1);
    this.setState({ checkPoint: x });
    this.forceUpdate();
  }

  handleDeleteCheckJson(index) {
    console.log('index:' + index);
    let x = this.state.checkPoint;
    x.JSON.splice(index, 1);
    this.setState({ checkPoint: x });
    this.forceUpdate();
  }

  handleDeleteDynamicParams(index) {
    let x = this.state.dynamicParam;
    x.splice(index, 1);
    this.setState({ dynamicParam: x });
    this.forceUpdate();
  }

  handleDeleteParams(index) {
    let x = this.state.param;
    x.splice(index, 1);
    this.setState({ param: x });
    this.forceUpdate();
  }

  handleChangeCheckSql(index, type, e) {
    let x = this.state.checkPoint;
    let y = x.SQL[index];
    var element = e.target.value;
    console.log(element);
    y[type] = element;
    this.setState({ checkPoint: x });
    this.forceUpdate();
  }

  handleChangeCheckJson(index, type, e) {
    let x = this.state.checkPoint;
    let y = x.JSON[index];
    var element = e.target.value;
    console.log(element);
    y[type] = element;
    this.setState({ checkPoint: x });
    this.forceUpdate();
  }

  handleChangeDynamicParams(index, type, e) {
    let x = this.state.dynamicParam;
    let y = x[index];
    var element = e.target.value;
    y[type] = element;
    this.setState({ dynamicParam: x });
    this.forceUpdate();
  }

  render() {
    const {
      testCase: { detail },
    } = this.props;
    const checkSql = this.state.checkPoint.SQL;
    const checkJson = this.state.checkPoint.JSON;
    const paramArray = this.state.param;
    const dynamicParamArray = this.state.dynamicParam;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 28 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 28 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 28, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const checkpointlist = [
      { label: '常量校验', value: 'CONSTANT' },
      { label: 'JSON校验', value: 'JSON' },
      {
        label: 'SQL校验',
        value: 'SQL',
      },
    ];
    return (
      <GridContent>
        <Row gutter={28}>
          <Col lg={24} offset={2} md={24}>
            <Card>
              <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="id" style={{ display: 'none' }}>
                  {getFieldDecorator('id', { rules: [{ required: false }] })(
                    <Input placeholder="请输入用例名称" />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="业务模块">
                  {getFieldDecorator('module', { rules: [{ required: true }] })(
                    <Select placeholder="请选择业务模块">
                      <Option value="grouppurchase">拼团</Option>
                      <Option value="booking">预定</Option>
                      <Option value="commercial">商业化</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="用例名称">
                  {getFieldDecorator('name', { rules: [{ required: true }] })(
                    <Input placeholder="请输入用例名称" />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="所属系统">
                  {getFieldDecorator('appName', { rules: [{ required: true }] })(
                    <Select placeholder="请选择所属系统">
                      <Option value="kbgrouppurchaseprod">kbgrouppurchaseprod</Option>
                      <Option value="kbreservationprod">kbreservationprod</Option>
                      <Option value="kbservindustryprod">kbservindustryprod</Option>
                      <Option value="kbcraftsman">kbcraftsman</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="负责人">
                  {getFieldDecorator('author', { rules: [{ required: true }] })(
                    <Input placeholder="请输入负责人" />
                  )}
                </FormItem>

                <FormItem {...formItemLayout} label="测试环境">
                  {getFieldDecorator('env', { rules: [{ required: true }] })(
                    <Select placeholder="请选择执行环境">
                      <Option value="dev">开发环境</Option>
                      <Option value="test">测试环境</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="接口类型">
                  {getFieldDecorator('type', { rules: [{ required: true }] })(
                    <Select placeholder="请选择接口类型">
                      <Option value="http">HTTP</Option>
                      <Option value="rpc">RPC</Option>
                      <Option value="tr">TR</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="接口名"
                  style={{ display: getFieldValue('type') === 'tr' ? 'block' : 'none' }}
                >
                  {getFieldDecorator('service', {
                    rules: [{ required: getFieldValue('type') === 'tr' }],
                  })(<Input placeholder="请输入服务类名称" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="方法名称">
                  {getFieldDecorator('method', {
                    rules: [{ required: getFieldValue('type') === 'tr' }],
                  })(<Input placeholder="请输入服务接口名称" />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="请求参数列表"
                  style={{ display: getFieldValue('type') === 'tr' ? 'block' : 'none' }}
                >
                  <div>
                    <Button icon="plus" type="primary" onClick={this.handleAddParams} />
                    {paramArray.length > 0 &&
                      paramArray.map((element, index) => (
                        <Row gutter={20} key={index}>
                          <Col lg={8} md={16} sm={24}>
                            {getFieldDecorator(`param[${index}].type`)(
                              <Input placeholder="请输入参数名称" />
                            )}
                          </Col>
                          <Col lg={12} md={16} sm={24}>
                            {getFieldDecorator(`param[${index}].value`)(
                              <TextArea
                                style={{ minHeight: 32 }}
                                placeholder="请输入请求参数，支持动态化参数，格式${variable}"
                                rows={4}
                              />
                            )}
                          </Col>
                          <Col lg={3} md={16} sm={24}>
                            <Button
                              icon="minus"
                              type="primary"
                              onClick={() => this.handleDeleteParams({ index })}
                            />
                          </Col>
                        </Row>
                      ))}
                  </div>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="请求参数"
                  style={{ display: getFieldValue('type') === 'tr' ? 'none' : 'block' }}
                >
                  {getFieldDecorator('param', { rules: [{ required: true }] })(
                    <TextArea
                      style={{ minHeight: 32 }}
                      placeholder="请输入请求参数，支持动态化参数，格式${variable}"
                      rows={4}
                    />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="动态参数">
                  <Button icon="plus" type="primary" onClick={this.handleAddDynamicParams} />
                  <div>
                    {dynamicParamArray.length > 0 &&
                      dynamicParamArray.map((element, index) => (
                        <Row gutter={20} key={index}>
                          <Col lg={6} md={16} sm={24}>
                            {getFieldDecorator(`dynamicParams[${index}].paramName`, {
                              initialValue: element.paramName,
                              required: true,
                            })(
                              <Input
                                onBlur={e => this.handleChangeDynamicParams(index, 'paramName', e)}
                                placeholder="请输入动态参数名称"
                              />
                            )}
                          </Col>
                          <Col lg={14} md={16} sm={24}>
                            <div>
                              {getFieldDecorator(`dynamicParams[${index}].paramType`, {
                                initialValue: element.paramType,
                                required: true,
                              })(
                                <Radio.Group
                                  value={element.paramType}
                                  onChange={e =>
                                    this.handleChangeDynamicParams(index, 'paramType', e)
                                  }
                                >
                                  <Radio value="CONSTANT">常量</Radio>
                                  <Radio value="DYNAMIC">动态生成</Radio>
                                  <Radio value="DATASET">数据集</Radio>
                                </Radio.Group>
                              )}
                              <div
                                style={{
                                  marginBottom: 0,
                                  display:
                                    getFieldValue(`dynamicParams[${index}].paramType`) != 'CONSTANT'
                                      ? 'block'
                                      : 'none',
                                }}
                              >
                                {getFieldDecorator(`dynamicParams[${index}].paramValue`, {
                                  initialValue: element.paramValue,
                                  required: true,
                                })(
                                  <TextArea
                                    onBlur={e =>
                                      this.handleChangeDynamicParams(index, 'paramValue', e)
                                    }
                                    placeholder="请输入生成规则"
                                  />
                                )}
                              </div>
                              <Col lg={3} md={16} sm={24}>
                                <Button
                                  icon="minus"
                                  type="primary"
                                  onClick={() => this.handleDeleteDynamicParams({ index })}
                                />
                              </Col>
                            </div>
                          </Col>
                        </Row>
                      ))}
                  </div>
                </FormItem>

                <FormItem {...formItemLayout} label="结果校验">
                  {getFieldDecorator('checkpoint', { rules: [{ required: true }] })(
                    <CheckboxGroup options={checkpointlist} />
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="校验JSON"
                  style={{
                    display:
                      getFieldValue('checkpoint') &&
                      getFieldValue('checkpoint').indexOf('JSON') !== -1
                        ? 'block'
                        : 'none',
                  }}
                >
                  <Button icon="plus" type="primary" onClick={this.handleAddCheckJson} />

                  {checkJson.length > 0 &&
                    checkJson.map((element, index) => (
                      <Row gutter={20} key={index}>
                        <Col lg={8} md={16} sm={24}>
                          {getFieldDecorator(`checkPoints[JSON][[${index}].type`, {
                            initialValue: 'JSON',
                            required: true,
                          })(<Input placeholder="请输入校验变量" disabled={true} />)}
                        </Col>
                        <Col lg={8} md={16} sm={24}>
                          <Tooltip
                            trigger={['focus']}
                            title={'请输入校验值'}
                            placement="topLeft"
                            arrowPointAtCenter
                          >
                            {getFieldDecorator(`checkPoints[JSON][${index}].checkData`, {
                              initialValue: element.checkData,
                              required: true,
                            })(
                              <Input
                                onBlur={e => this.handleChangeCheckJson(index, 'checkData', e)}
                                placeholder="请输入校验值"
                              />
                            )}
                          </Tooltip>
                        </Col>
                        <Col lg={8} md={16} sm={24}>
                          <Tooltip trigger={['focus']} title={'请输入期望结果'} placement="topLeft">
                            {getFieldDecorator(`checkPoints[JSON][${index}].expectedData`, {
                              initialValue: element.expectedData,
                              required: true,
                            })(
                              <Input
                                onBlur={e => this.handleChangeCheckJson(index, 'expectedData', e)}
                                placeholder=""
                              />
                            )}
                          </Tooltip>
                        </Col>
                        <Col lg={3} md={16} sm={24}>
                          <Button
                            icon="minus"
                            type="primary"
                            onClick={() => this.handleDeleteCheckJson({ index })}
                          />
                        </Col>
                      </Row>
                    ))}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="校验SQL"
                  style={{
                    display:
                      getFieldValue('checkpoint') &&
                      getFieldValue('checkpoint').indexOf('SQL') !== -1
                        ? 'block'
                        : 'none',
                  }}
                >
                  <Button icon="plus" type="primary" onClick={this.handleAddCheckSql} />

                  {checkSql.length > 0 &&
                    checkSql.map((element, index) => (
                      <Row gutter={20} key={index}>
                        <Col lg={8} md={16} sm={24}>
                          {getFieldDecorator(`checkPoints[SQL][${index}].type`, {
                            initialValue: 'SQL',
                            required: true,
                          })(<Input disabled={true} />)}
                        </Col>
                        <Col lg={8} md={16} sm={24}>
                          <Tooltip trigger={['focus']} title={'请输入数据库名'} placement="topLeft">
                            {getFieldDecorator(`checkPoints[SQL][${index}].dbName`, {
                              initialValue: element.dbName,
                              required: true,
                            })(
                              <Input
                                onBlur={e => this.handleChangeCheckSql(index, 'dbName', e)}
                                placeholder=""
                              />
                            )}
                          </Tooltip>
                        </Col>
                        <Col lg={8} md={16} sm={24}>
                          <Tooltip trigger={['focus']} title={'请输入校验值'} placement="topLeft">
                            {getFieldDecorator(`checkPoints[SQL][${index}].checkData`, {
                              initialValue: element.checkData,
                              required: true,
                            })(
                              <Input
                                onBlur={e => this.handleChangeCheckSql(index, 'checkData', e)}
                                placeholder=""
                              />
                            )}
                          </Tooltip>
                        </Col>
                        <Col lg={8} md={16} sm={24}>
                          <Tooltip trigger={['focus']} title={'请输入期望结果'} placement="topLeft">
                            {getFieldDecorator(`checkPoints[SQL][${index}].expectedData`, {
                              initialValue: element.expectedData,
                              required: true,
                            })(
                              <Input
                                onBlur={e => this.handleChangeCheckSql(index, 'expectedData', e)}
                              />
                            )}
                          </Tooltip>
                        </Col>
                        <Col lg={3} md={16} sm={24}>
                          <Button
                            icon="minus"
                            type="primary"
                            onClick={() => this.handleDeleteCheckSql({ index })}
                          />
                        </Col>
                      </Row>
                    ))}
                </FormItem>

                <FormItem {...formItemLayout} label="用例集合">
                  {getFieldDecorator('testSet')(
                    <Select
                      mode="multiple"
                      placeholder="选填多选"
                      style={{
                        margin: '8px 0',
                      }}
                    >
                      <Option value="0">日常回归</Option>
                      <Option value="1">核心用例</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem {...submitFormLayout}>
                  <Button type="primary" htmlType="submit" onClick={() => this.handleSubmit}>
                    提交
                  </Button>
                  <Button style={{ marginLeft: 16 }}>执行</Button>
                  <Button type="danger" style={{ marginLeft: 16 }}>
                    删除
                  </Button>
                </FormItem>
              </Form>
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Edit;
