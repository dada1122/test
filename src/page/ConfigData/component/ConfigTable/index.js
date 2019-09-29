import React, { PureComponent, Fragment } from '@alipay/bigfish/react';
import { Table, Divider, Button } from '@alipay/bigfish/antd';
import router from 'umi/router';
import styles from './index.less';

class ConfigTable extends PureComponent {
  handleConfigChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    onChange(pagination, filters, sorter);
  };

  handleConfigDelete = id => {
    const { onDelete } = this.props;
    onDelete(id);
  };

  handleConfigEdit = id => {
    router.push(`/offline/param_edit?id=${id}`);
  };

  render() {
    const {
      data: { list, pagination },
      loading,
    } = this.props;
    const columns = [
      {
        title: '模块',
        dataIndex: 'module',
      },
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '环境',
        dataIndex: 'env',
      },
      {
        title: '类型',
        dataIndex: 'type',
      },
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '作者',
        dataIndex: 'author',
      },
      {
        title: '操作',
        render: record => (
          <Fragment>
            <Button type="primary" onClick={() => this.handleConfigEdit(record.id)}>
              编辑
            </Button>
            <Divider type="vertical" />
            <Button type="danger" onClick={() => this.handleConfigDelete(record.id)}>
              删除
            </Button>
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
      <div className={styles.ConfigTable}>
        <Table
          loading={loading}
          rowKey={record => record.key}
          rowId={record => record.id}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleConfigChange}
          onDelete={this.handleConfigDelete}
        />
      </div>
    );
  }
}

export default ConfigTable;
