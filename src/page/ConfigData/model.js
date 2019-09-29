import { paramsList, paramsSave, paramsDebug, paramsDelete } from './service';

export default {
  namespace: 'params',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(paramsList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *update({ payload }, { call, put }) {
      const response = yield call(paramsSave, payload);
      yield put({
        type: 'submitJsonResult',
        payload: response,
      });
    },

    *debug({ payload }, { call, put }) {
      const response = yield call(paramsDebug, payload);
      yield put({
        type: 'submitJsonResult',
        payload: response,
      });
    },

    *delete({ payload }, { call, put }) {
      const response = yield call(paramsDelete, payload);
      yield put({
        type: 'submitJsonResult',
        payload: response,
      });
    },
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
