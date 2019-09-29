import { queryApiList } from './service';

export default {
  namespace: 'configNew',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchList({ payload }, { call, put }){
      const response = yield call(queryApiList, payload);
      yield put({
        type: 'saveList',
        payload: response,
      });
    },

    // *update({ payload }, { call, put }) {
    //   const response = yield call(configEdit, payload);

    //   yield put({
    //     type: 'submitJsonResult',
    //     payload: response,
    //   });
    // },
  },

  reducers: {
    submitJsonResult(state, { payload }) {
      return {
        ...state,
        jsonResult: {
          ...state.jsonResult,
          ...payload,
        },
      };
    },

    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
