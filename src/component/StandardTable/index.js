import React, { PureComponent } from '@alipay/bigfish/react';
import { Alert, Table } from '@alipay/bigfish/antd';
import styles from './index.less';

class StandardTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    isShowSelected: !!this.props.selectedRows,
  };

  componentWillReceiveProps(nextProps) {
    // clean state
    if (!nextProps.selectedRows || nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
      });
    }
    // show selected checkbox
    if (!nextProps.selectedRows) {
      this.setState({
        isShowSelected: false,
      });
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys });
  };

  handleTableChange = (pagination, filters, sorter) => {
    if (this.props.onChange) {
      this.props.onChange(pagination, filters, sorter);
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { selectedRowKeys, isShowSelected } = this.state;
    const {
      data: { list, pagination },
      loading,
      columns,
      rowKey,
      scroll,
      size,
      getCheckboxProps,
      ...otherProps
    } = this.props;
    const paginationProps = pagination
      ? {
          showSizeChanger: true,
          showQuickJumper: true,
          ...pagination,
        }
      : false;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps:
        getCheckboxProps ||
        (record => ({
          disabled: record.disabled,
        })),
    };

    return (
      <div className={styles.standardTable}>
        {isShowSelected ? (
          <div className={styles.tableAlert}>
            <Alert
              message={
                <div>
                  已选择
                  <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项
                  {selectedRowKeys.length > 0 && (
                    <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                      清空
                    </a>
                  )}
                </div>
              }
              type="info"
              showIcon
            />
          </div>
        ) : null}
        <Table
          {...otherProps}
          loading={loading}
          rowKey={record => record[rowKey]}
          rowSelection={isShowSelected ? rowSelection : null}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          scroll={scroll}
          size={size || 'default'}
        />
      </div>
    );
  }
}

export default StandardTable;
