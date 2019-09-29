import React from '@alipay/bigfish/react';
import { FormattedMessage } from '@alipay/bigfish/locale';
import Link from '@alipay/bigfish/link';
import { PageHeader } from 'ant-design-pro';
import { connect } from '@alipay/bigfish/sdk';
import GridContent from './GridContent';
import styles from './index.less';
import MenuContext from '@/layout/MenuContext';

const PageHeaderWrapper = ({ children, contentWidth, wrapperClassName, top, ...restProps }) => (
  <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
    {top}
    <MenuContext.Consumer>
      {value => (
        <PageHeader
          wide={contentWidth === 'Fixed'}
          home={<FormattedMessage id="menu.home" defaultMessage="Home" />}
          {...value}
          key="pageheader"
          {...restProps}
          linkElement={Link}
          itemRender={item => {
            if (item.locale) {
              return <FormattedMessage id={item.locale} defaultMessage={item.name} />;
            }
            return item.name || item.title;
          }}
        />
      )}
    </MenuContext.Consumer>
    {children ? (
      <div className={styles.content}>
        <GridContent>{children}</GridContent>
      </div>
    ) : null}
  </div>
);

export default connect(({ setting }) => ({
  contentWidth: setting && setting.contentWidth,
}))(PageHeaderWrapper);
