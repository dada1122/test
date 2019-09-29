import React from '@alipay/bigfish/react';
import { auth } from '../Common/Auth';

@auth({
  or: ['2'],
})
class Page extends React.Component {
  render() {
    return (
      <div>
        需要权限 2，控制路由组件的权限示例，你可以修改 mock/user.js 中的用户的 auth 信息测试。
      </div>
    );
  }
}

export default Page;
