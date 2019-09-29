import { queryTestLog } from './service';

export default {
  namespace: 'testlog',
  state: {
    testlog: '',
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTestLog, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        testlog: action.payload,
        detail: action.payload.detail,
      };
    },
  },
};
