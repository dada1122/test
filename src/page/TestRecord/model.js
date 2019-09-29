import { queryRule, removeRule, addRule, updateRule } from './service';

export default {
  namespace: 'testrecord',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
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
        data: action.payload.model,
        detail: action.payload.detail,
      };
    },
  },
};
