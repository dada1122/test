import { queryRuleRecord, ruleRecordFeedBack } from './service';

const Model = {
  namespace: 'ruleRecord',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRuleRecord, payload);

      yield put({
        type: 'save',
        payload: response,
      });
    },

    *update({ payload, callback }, { call, put }) {
      console.log(payload);
      const response = yield call(ruleRecordFeedBack, payload);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });

      if (callback) callback();
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, data: action.payload };
    },
  },
};
export default Model;
