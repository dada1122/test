// https://bigfish.alipay.com/doc/app-config
import defaultSettings from '../src/defaultSettings';

export default {
  // 应用类型
  appType: 'site',
  // 错误收集，统计和分析
  clue: { pid: '5c9b1b48f606cf9c8633dfab' },
  // 部署模式
  deployMode: 'assets',
  history: 'hash',
  proxy: {
    '/api': { target: 'http://industrytest.alipay.net:8080' },
    '/dynamic_param': { target: 'http://industrytest.alipay.net:8080' },
    '/testcase': { target: 'http://industrytest.alipay.net:8080' },
    '/test_record/': {
      target: 'http://industrytest.alipay.net:8080',
      changeOrigin: true,
    },
    '/test_detail/': { target: 'http://industrytest.alipay.net:8080' },
    '/api/bizRuleList': { target: 'http://localhost:7001' },
  },
  // 按照你的项目参考下面链接添加配置
  // https://bigfish.alipay.com/doc/wuiaag#%E5%89%8D%E5%90%8E%E7%AB%AF%E8%81%94%E8%B0%83
  theme: { 'primary-color': defaultSettings.primaryColor },
  locale: {
    enable: true,
    // default false
    default: 'zh-CN',
    // default zh-CN
    baseNavigator: true,
  },
  // default true, when it is true, will use `navigator.language` overwrite default
  favicon: 'https://os.alipayobjects.com/rmsportal/TVyBuyOGQklXVoh.png',
  ctoken: true,
  targets: { ie: 11 },
  // 关于 treeShaking: https://bigfish.alipay.com/doc/gagklc#e3211d43
  treeShaking: true,
  // 路由配置
  routes: [
    {
      path: '/',
      component: '../layout/BasicLayout',
      routes: [
        {
          path: '/imagedetect',
          component: './ImageDetect',
        },
        {
          path: 'imagedetect',
          name: '图像检测',
          icon: 'picture',
          routes: [
            {
              path: '/imagedetect/detectexec',
              name: '算法测试',
              component: './ImageDetect/DetectExec',
            },
            {
              path: '/imagedetect/atomicrulesmanager',
              name: '原子规则管理',
              component: './AtomicRulesManager',
            },
            {
              path: '/imagedetect/bizatomicrulesmanager',
              name: '业务规则管理',
              component: './BizAtomicRulesManager',
            },
          ],
        },
        {
          path: '/',
          component: './Api/List',
        },
        {
          path: 'tools',
          name: '接口工具',
          icon: 'api',
          routes: [
            {
              path: '/tools/:type/:action/:id?',
              name: '接口详情',
              component: './Api/Detail',
              hideInMenu: true,
            },
            {
              path: '/tools/list',
              name: '接口列表',
              component: './Api/List',
            },
            {
              path: '/tools/quick',
              name: '快捷工具',
              component: './Api/QuickTools',
            },
            {
              path: '/tools/run',
              component: './Api/ToolRun',
            },
          ],
        },
        {
          name: '线下回归',
          path: '/offline',
          icon: 'smile',
          routes: [
            {
              name: '测试用例',
              path: 'testcase/list',
              component: './TestCase/List',
            },
            {
              name: '新增用例',
              path: 'testcase/edit',
              hideInMenu: true,
              component: './TestCase/Edit',
            },
            {
              name: '编辑用例',
              path: 'testcase/edit/:id',
              hideInMenu: true,
              component: './TestCase/Edit',
            },
            {
              name: '用例详情',
              path: 'testcase/detail/:id',
              hideInMenu: true,
              component: './TestCase/Detail',
            },
            {
              name: '动态参数',
              path: 'params',
              component: './ConfigData',
            },
            {
              name: '更新参数',
              path: 'param_edit',
              hideInMenu: true,
              component: './ConfigData/ConfigEdit',
            },
            {
              name: '执行详情',
              path: 'TestDetail',
              component: './TestDetail',
            },
            {
              name: '执行记录',
              path: 'TestRecord/:id',
              component: './TestRecord',
              hideInMenu: true,
            },
            {
              name: '执行日志',
              path: 'TestRecord/TestLog/:id',
              component: './TestLog',
              hideInMenu: true,
            },
            {
              name: '执行报表',
              path: 'ReportForm',
              component: './ReportForm',
            },
          ],
        },
        {
          path: 'https://bigfish.alipay.com/blocks',
          name: '更多页面',
          icon: 'block',
        },
      ],
    },
  ],
};
