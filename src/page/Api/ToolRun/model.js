import { message } from 'antd';
import { submitToolExec } from './service';

export default {
  namespace: 'toolRun',

  state: {
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
    jsonResult: {
      success: false,
      message: '',
      data: '',
    },
  },

  effects: {
    *submitToolExec({ payload }, { call, put }) {
      const response = yield call(submitToolExec, payload);
      yield put({
        type: 'submitJsonResult',
        payload: response,
      });

      if (response.success === true) {
        message.success('提交成功');
      } else {
        message.error('提交失败');
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
