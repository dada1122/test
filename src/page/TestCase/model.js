import { list, get, exec, save } from './service';

export default {
  namespace: 'testCase',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    result: {},
    detail: {},
    parameters: {},
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(list, payload);
      const { success, model } = response;

      yield put({
        type: 'saveList',
        payload: success ? model : { list: [], pagination: {} },
      });
    },

    *fetchDetail({ payload, callback }, { call, put }) {
      const response = yield call(get, payload);
      const { success, model } = response;
      model.dynamicParams = JSON.parse(model.dynamicParams);
      model.checkPoints = JSON.parse(model.checkPoints);
      if (callback && typeof callback === 'function' && success) {
        callback(model); // 返回结果
      }

      yield put({
        type: 'saveDetail',
        payload: model,
      });
    },

    *update({ payload, callback }, { call }) {
      const response = yield call(save, payload);
      const { success, model } = response;
      if (success) {
        callback(model);
      }
    },

    *exec({ payload, callback }, { call }) {
      const response = yield call(exec, payload);
      console.log('res-0j' + JSON.stringify(response));
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },
  },

  reducers: {
    saveList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },

    saveDetail(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
