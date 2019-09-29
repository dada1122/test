import React, { Component } from '@alipay/bigfish/react';
import { Button } from '@alipay/bigfish/antd';
import { connect } from '@alipay/bigfish/sdk';

import styles from './style.less';

@connect(({ testCase }) => testCase)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'testCase/fetch',
    });
  }

  render() {
    const { text } = this.props;
    return (
      <div className={styles.container}>
        <Button>{text}</Button>
      </div>
    );
  }
}

export default Page;
