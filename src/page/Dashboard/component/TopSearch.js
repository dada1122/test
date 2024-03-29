import React, { memo } from '@alipay/bigfish/react';
import { Row, Col, Table, Tooltip, Card, Icon } from '@alipay/bigfish/antd';
import { FormattedMessage } from '@alipay/bigfish/locale';
import { Trend, NumberInfo, Charts } from 'ant-design-pro';
import numeral from 'numeral';
import styles from '../style.less';

const { MiniArea } = Charts;

const columns = [
  {
    title: <FormattedMessage id="dashboard.table.rank" defaultMessage="Rank" />,
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: <FormattedMessage id="dashboard.table.search-keyword" defaultMessage="Search keyword" />,
    dataIndex: 'keyword',
    key: 'keyword',
    render: text => <a href="/">{text}</a>,
  },
  {
    title: <FormattedMessage id="dashboard.table.users" defaultMessage="Users" />,
    dataIndex: 'count',
    key: 'count',
    sorter: (a, b) => a.count - b.count,
    className: styles.alignRight,
  },
  {
    title: <FormattedMessage id="dashboard.table.weekly-range" defaultMessage="Weekly Range" />,
    dataIndex: 'range',
    key: 'range',
    sorter: (a, b) => a.range - b.range,
    render: (text, record) => (
      <Trend flag={record.status === 1 ? 'down' : 'up'}>
        <span style={{ marginRight: 4 }}>{text}%</span>
      </Trend>
    ),
    align: 'right',
  },
];

const TopSearch = memo(({ loading, visitData2, searchData, dropdownGroup }) => (
  <Card
    loading={loading}
    bordered={false}
    title={
      <FormattedMessage
        id="dashboard.analysis.online-top-search"
        defaultMessage="Online Top Search"
      />
    }
    extra={dropdownGroup}
    style={{ marginTop: 24 }}
  >
    <Row gutter={68}>
      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          subTitle={
            <span>
              <FormattedMessage
                id="dashboard.analysis.search-users"
                defaultMessage="search users"
              />
              <Tooltip
                title={
                  <FormattedMessage id="dashboard.analysis.introduce" defaultMessage="introduce" />
                }
              >
                <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
              </Tooltip>
            </span>
          }
          gap={8}
          total={numeral(12321).format('0,0')}
          status="up"
          subTotal={17.1}
        />
        <MiniArea line height={45} data={visitData2} />
      </Col>
      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          subTitle={
            <span>
              <FormattedMessage
                id="dashboard.analysis.per-capita-search"
                defaultMessage="Per Capita Search"
              />
              <Tooltip
                title={
                  <FormattedMessage id="dashboard.analysis.introduce" defaultMessage="introduce" />
                }
              >
                <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
              </Tooltip>
            </span>
          }
          total={2.7}
          status="down"
          subTotal={26.2}
          gap={8}
        />
        <MiniArea line height={45} data={visitData2} />
      </Col>
    </Row>
    <Table
      rowKey={record => record.index}
      size="small"
      columns={columns}
      dataSource={searchData}
      pagination={{
        style: { marginBottom: 0 },
        pageSize: 5,
      }}
    />
  </Card>
));

export default TopSearch;
