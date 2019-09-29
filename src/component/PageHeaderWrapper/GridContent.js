import React, { PureComponent } from '@alipay/bigfish/react';
import { connect } from '@alipay/bigfish/sdk';
import styles from './GridContent.less';

class GridContent extends PureComponent {
  render() {
    const { contentWidth, children } = this.props;
    let className = `${styles.main}`;
    if (contentWidth === 'Fixed') {
      className = `${styles.main} ${styles.wide}`;
    }
    return <div className={className}>{children}</div>;
  }
}

export default connect(({ setting }) => ({
  contentWidth: setting && setting.contentWidth,
}))(GridContent);
