import React, { Component, Fragment } from '@alipay/bigfish/react';
import Link from '@alipay/bigfish/link';
import {
  Table,
  Row,
  Col,
  Card,
  Form,
} from '@alipay/bigfish/antd';
import { connect } from 'dva';
import GridContent from '@/component/PageHeaderWrapper/GridContent';



// 接口工具列表页面
@connect(({ testrecord, loading }) => ({
  testrecord,
  loading: loading.models.rule,
}))
@Form.create()
class TableList extends Component {


  columns = [
    {
      title: '记录编号',
      dataIndex: 'id',
    },
    {
      title: '创建时间',
      dataIndex: 'gmtCreate',
    },
    {
      title: '用例名称',
      dataIndex: 'caseName',
    },
    {
      title: '用例模块',
      dataIndex: 'module',
    },
    {
      title: '执行者',
      dataIndex: 'operator',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: (text, record) => (
          <Fragment>
            <Link to={`testlog/${record.logId}`}>查看日志</Link>
          </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    const { id:detailId } = this.props.match.params;
    dispatch({
      type: 'testrecord/fetch',
      payload: { detailId },
    });
  }



  render() {
    const {
      testrecord: { data },
    } = this.props;

    console.log(data);
    return (
        <GridContent>
          <Row>
            <Col lg={50}>
              <Card>
                <div>
                  <Table
                      dataSource={data.list}
                      columns={this.columns}
                      rowKey='id'
                      expandedRowRender={record => <div style={{ maxWidth: '100%', wordWrap: 'break-word', wordBreak: 'break-all' }}>{record.result}</div>}

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
