import { message } from 'antd';
import { exec } from './service';

export default {
  namespace: 'imageDetect',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    jsonResult: {
      success: false,
      message: '',
      data: '',
    },
  },

  effects: {
    *exec({ payload, callback }, { call, put }) {
      console.log(`req-0j${JSON.stringify(payload)}`);
      const response = yield call(exec, payload);
      console.log(`res-0j${JSON.stringify(response)}`);

      if (response.success === true) {
        message.success('提交成功');
      } else {
        message.error('提交失败');
      }
      const { success, model } = response;
      if (callback && typeof callback === 'function' && success) {
        callback(model); // 返回结果
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
