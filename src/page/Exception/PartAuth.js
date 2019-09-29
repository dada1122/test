import React from '@alipay/bigfish/react';
import Auth from '../Common/Auth';

export default () => (
  <div>
    控制部分内容的权限示例，你可以修改 mock/user.js 中的用户的 auth 信息测试。
    <br />
    <Auth or={['1', '2']}>用户有 “权限1” 或 “权限2” 则可以展示</Auth>
    <Auth and={['1', '2']}>用户有 “权限1” 和 “权限2” 则可以展示</Auth>
  </div>
);
