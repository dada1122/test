import React, { PureComponent } from '@alipay/bigfish/react';
import { Row, Col, Card, List, Form } from '@alipay/bigfish/antd';
import { connect } from 'dva';
import GridContent from '@/component/PageHeaderWrapper/GridContent';

@connect(({ testlog, loading }) => ({
  testlog,
  loading: loading.models.rule,
}))
@Form.create()
class Page extends PureComponent {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { id: logId } = match.params;
    dispatch({
      type: 'testlog/fetch',
      payload: { logId },
    });
  }

  render() {
    const {
      testlog: { testlog },
    } = this.props;
    return (
      <GridContent>
        <Row>
          <Col lg={20} offset={2}>
            <Card title="执行日志">
              <List
                dataSource={testlog}
                renderItem={item => (
                  <List.Item
                    style={{
                      maxWidth: '100%',
                      wordWrap: 'break-word',
                      wordBreak: 'break-all',
                    }}
                  >
                    {item}
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}
export default Page;
