import React, { Component } from '@alipay/bigfish/react';
import { Row, Col, Form, Button, DatePicker, Input } from '@alipay/bigfish/antd';
import { connect } from 'dva';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, Guide } from 'bizcharts';
import DataSet from '@antv/data-set';
import styles from './style.less';

const FormItem = Form.Item;

@connect(({ reportform, loading }) => ({
  reportform,
  loading: loading.models.rule,
}))
@Form.create()
class ReportForm extends Component {
  state = {
    searchValue: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    // const {testdetailId} = this.props.match.params;
    dispatch({
      type: 'reportform/fetch',
      // payload: {detailId: testdetailId},
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
      type: 'reportform/fetch',
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
        type: 'reportform/fetch',
        payload: values,
      });
    });
  };

  handleSearchReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({ searchValue: {} });
    dispatch({
      type: 'reportform/fetch',
      payload: {},
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
            <FormItem label="集合名称">
              {getFieldDecorator('testSet')(<Input placeholder="请输入" />)}
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
    const { DataView } = DataSet;
    const { Html } = Guide;
    const {
      reportform: {
        data: { list },
      },
    } = this.props;

    const formatter = val => `${(val * 100).toFixed(2)}%`;

    const charts = list.map(value => {
      const { successNum, failNum, module } = value;
      const dv = new DataView();
      dv.source([
        {
          item: '成功',
          value: successNum,
        },
        {
          item: '失败',
          value: failNum,
        },
      ]).transform({
        type: 'percent',
        field: 'value',
        dimension: 'item',
        as: 'percent',
      });
      const cols = { percent: { formatter } };
      return (
        <Col span={7} key={module}>
          <Chart height={window.innerHeight} data={dv} scale={cols} forceFit>
            <Coord type="theta" radius={0.55} innerRadius={0.7} />
            <Axis name="percent" />
            <Tooltip showTitle={false} />
            <Guide>
              <Html
                position={['50%', '50%']}
                html={`<h3>${module}</h3>`}
                alignX="middle"
                alignY="middle"
              />
            </Guide>
            <Geom
              type="intervalStack"
              color="item"
              position="percent"
              tooltip={[
                'item*percent',
                (item, percent) => ({ name: item, value: formatter(percent) }),
              ]}
            >
              <Label content="percent" formatter={(val, item) => `${item.point.item}: ${val}`} />
            </Geom>
          </Chart>
        </Col>
      );
    });

    return (
      <div>
        <div className={styles.tableListForm}>{this.renderForm()}</div>
        <Row span={15}>{charts}</Row>
      </div>
    );
  }
}

export default ReportForm;
