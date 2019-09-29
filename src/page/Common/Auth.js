import React from '@alipay/bigfish/react';
import { connect } from '@alipay/bigfish/sdk';
import BasicAuth from '@/component/Auth';

/*
  权限控制组件，可以设置页面权限，也可以设置某个组件是否展示权限

  使用方式:
  import Auth, { auth } from './AuthLayout';

  @auth({
    or: ['1'],
  })
  class Page extends React.Component {}

  也可以：
  <Auth or={or}>
    <Button>auth</Button>
  </Auth>
*/

/*
  model: modle/user.js
  模拟数据： mock/user.mock.js
*/
@connect(state => ({
  currentUser: state.user.currentUser,
}))
class Auth extends React.PureComponent {
  render() {
    const {
      currentUser: { auth },
      noAuth,
    } = this.props;
    if (!auth) {
      return null;
    }
    return <BasicAuth userAuth={auth} noAuth={noAuth} {...this.props} />;
  }
}

const auth = obj => Target => props => (
  <Auth noAuth={<p>403</p>} {...obj}>
    <Target {...props} />
  </Auth>
);

export { auth };
export default Auth;
