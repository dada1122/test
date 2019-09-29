import React, { PureComponent, Fragment } from '@alipay/bigfish/react';
import { Table, Divider } from '@alipay/bigfish/antd';
import { Link } from '@alipay/bigfish/sdk/router';
import styles from '../../style.less';

class StandardTable extends PureComponent {
  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    onChange(pagination, filters, sorter);
  }

  handleTableDelete = (id) => {
    const { onDelete } = this.props;
    onDelete(id);
  }

  render() {
    const { 
      data: { list, pagination }, 
      loading,
    } = this.props;
    const columns = [
      {
        title: '序号',
        dataIndex: 'key',
      },
      {
        title: '接口名称',
        dataIndex: 'name',
      },
      {
        title: '环境',
        dataIndex: 'env',
      },
      {
        title: '接口类型',
        dataIndex: 'type',
      },
      {
        title: '业务类型',
        dataIndex: 'bizType',
      },
      {
        title: '是否授权',
        dataIndex: 'auth',
      },
      {
        title: '接口ID',
        dataIndex: 'id',
      },
      {
        title: '操作',
        render: record => (
          <Fragment>
            <Link to={`/editors?id=${record.id}`} target="_blank">编辑</Link>
            <Divider type="vertical" />
            <Link to={`/config/edit?id=${record.id}`} target="_blank">执行</Link>
            <Divider type="vertical" />
            <Link to="" onClick={() => this.handleTableDelete(record.id)}>删除</Link>
          </Fragment>
        ),
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: false,
      ...pagination,
    };

    return (
      <div className={styles.standardTable}>
        <Table
          loading={loading}
          rowKey={record => record.key}
          rowId={record => record.id}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          onDelete={this.handleTableDelete}
        />
      </div>
    );
  }
}

export default StandardTable;
