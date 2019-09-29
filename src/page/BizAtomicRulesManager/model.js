import { save, edit, queryBizRuleList } from './service';


export default {
  namespace: 'bizatomicrulesmanager',

  state: {
    data: {
      list: [],
    },
    showAddRule: true
  },

  effects: {
    *queryBizRuleList({ payload }, { call, put }) {
      if(!payload) return
      const response = yield call(queryBizRuleList, payload);
      console.log('querybizrulelist response--', response)

      yield put({
        type: 'save',
        payload: {
          list: response,
        },
      });
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
