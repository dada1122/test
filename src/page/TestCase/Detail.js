import React, { PureComponent } from '@alipay/bigfish/react';
import { connect } from '@alipay/bigfish/sdk';
import { Form, Card, Table, Button, Divider } from '@alipay/bigfish/antd';
import DescriptionList from './component/DescriptionList';
import PageHeaderWrapper from '@/component/PageHeaderWrapper';
import history from '@alipay/bigfish/sdk/history';
import styles from './style.less';
import Link from '@alipay/bigfish/link';

const { Description } = DescriptionList;
const FormItem = Form.Item;

const checkPointsColumns = [
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '数据库名',
    dataIndex: 'dbName',
    key: 'dbName',
  },
  {
    title: '校验语句',
    dataIndex: 'checkData',
    key: 'checkData',
  },
  {
    title: '期望值',
    dataIndex: 'expectedData',
    key: 'expectedData',
  },
];

const dynamicParamsColumns = [
  {
    title: '类型',
    dataIndex: 'paramType',
    key: 'type',
  },

  {
    title: '名称',
    dataIndex: 'paramName',
    key: 'paramName',
  },

  {
    title: '初始值',
    dataIndex: 'paramValue',
    key: 'paramValue',
  },
];

@connect(({ testCase, loading }) => ({
  testCase,
  loading: loading.effects['testCase/fetchDetail'],
}))
class Detail extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;

    dispatch({
      type: 'testCase/fetchDetail',
      payload: id,
    });
  }

  handleExecute = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'testCase/exec',
      payload: id,
      callback: res => {
        if (res) {
          history.push(`/testdetail/list/${res.model}`);
        }
      },
    });
  };

  render() {
    const {
      testCase: { data },
      loading,
    } = this.props;
    const { param, dynamicParams, checkPoints } = data;

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

    return (
      <PageHeaderWrapper title="用例详情页">
        <Card bordered={false}>
          <DescriptionList size="large" style={{ marginBottom: 32 }}>
            <Description term="用例编号">{data.id}</Description>
            <Description term="业务归属">{data.module}</Description>
            <Description term="用例名称">{data.name}</Description>
            <Description term="系统">{data.appName}</Description>
            <Description term="执行环境">{data.env}</Description>
            <Description term="类型">{data.type}</Description>
            <Description term="所属用例集">{data.testSet}</Description>
            <Description term="作者">{data.author}</Description>
          </DescriptionList>
          <Divider />
          <div className={styles.title}>入参</div>
          <p>{data.param}</p>
          <Divider />
          <div className={styles.title}>动态参数</div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={dynamicParams}
            columns={dynamicParamsColumns}
            rowKey="id"
          />

          <div className={styles.title}>结果校验</div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={checkPoints}
            columns={checkPointsColumns}
            rowKey="id"
            childrenColumnName="list"
          />
          <form>
            <FormItem {...formItemLayout}>
              <Button type="primary" htmlType="submit" onClick={() => this.handleExecute(data.id)}>
                执行
              </Button>
              <Button style={{ marginLeft: 16 }}>
                <Link to={`/offline/testcase/edit/${data.id}`}>编辑</Link>
              </Button>
            </FormItem>
          </form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Detail;
