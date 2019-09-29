import { message } from 'antd';
import { submitToolExec } from './service';

export default {
  namespace: 'dbQuery',

  state: {
    jsonResult: {
      success: false,
      message: '',
      data: '',
    },
  },

  effects: {
    *submitToolExec({ payload, callback }, { call, put }) {
      const response = yield call(submitToolExec, payload);
      console.log(payload);
      yield put({
        type: 'submitJsonResult',
        payload: response,
      });

      if (response.success === true) {
        message.success('提交成功');
      } else {
        message.error('提交失败');
      }
      const { success, data } = response;
      console.log(response);
      console.log(data);

      const { result } = JSON.parse(data);

      if (callback && typeof callback === 'function' && success) {
        callback(result); // 返回结果
      }
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
    submitJsonResult(state, { payload }) {
      return {
        ...state,
        jsonResult: {
          ...state.jsonResult,
          ...payload,
        },
      };
    },
  },
};
