import {
  queryApiList,
  createTestCase,
  editTestCase,
  execTestCase,
  submitRPCExec,
  submitJSONExec,
  submitTRExec,
  submitSPIExec,
  submitRPCSave,
  submitRPCEdit,
  submitJSONSave,
  submitJSONEdit,
  submitTRSave,
  submitTREdit,
  submitSPISave,
  submitSPIEdit,
  deleteApi,
  submitHSFEdit,
  submitHSFExec,
  submitHSFSave,
} from '@/service/api';

export default {
  namespace: 'api',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    result: {},
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryApiList, payload);
      yield put({
        type: 'saveList',
        payload: response,
      });
    },
    *executeRpc({ payload }, { call, put }) {
      const response = yield call(submitRPCExec, payload);
      yield put({
        type: 'saveResult',
        payload: response,
      });
    },
    *executeJson({ payload }, { call, put }) {
      const response = yield call(submitJSONExec, payload);
      yield put({
        type: 'saveResult',
        payload: response,
      });
    },
    *executeTr({ payload }, { call, put }) {
      const response = yield call(submitTRExec, payload);
      yield put({
        type: 'saveResult',
        payload: response,
      });
    },
    *executeSpi({ payload }, { call, put }) {
      const response = yield call(submitSPIExec, payload);
      yield put({
        type: 'saveResult',
        payload: response,
      });
    },
    *createRpc({ payload }, { call, put }) {
      const response = yield call(submitRPCSave, payload);
      yield put({
        type: 'saveResult',
        payload: response,
      });
    },
    *createJson({ payload }, { call, put }) {
      const response = yield call(submitJSONSave, payload);
      yield put({
        type: 'saveResult',
        payload: response,
      });
    },
    *createTr({ payload }, { call, put }) {
      const response = yield call(submitTRSave, payload);
      yield put({
        type: 'saveResult',
        payload: response,
      });
    },
    *createSpi({ payload }, { call, put }) {
      const response = yield call(submitSPISave, payload);
      yield put({
        type: 'saveResult',
        payload: response,
      });
    },
    *updateSpi({ payload }, { call, put }) {
      const response = yield call(submitSPIEdit, payload);
      yield put({
        type: 'saveResult',
        payload: response,
      });
    },
    *updateRpc({ payload }, { call, put }) {
      const response = yield call(submitRPCEdit, payload);
      yield put({
        type: 'saveResult',
        payload: response,
      });
    },
    *updateJson({ payload }, { call, put }) {
      const response = yield call(submitJSONEdit, payload);
      yield put({
        type: 'saveResult',
        payload: response,
      });
    },
    *updateTr({ payload }, { call, put }) {
      const response = yield call(submitTREdit, payload);
      yield put({
        type: 'saveResult',
        payload: response,
      });
    },
    *deleteApi({ payload }, { call, put }) {
      const response = yield call(deleteApi, payload.id);
      if (response.success === false) {
        return;
      }
      const queryResponse = yield call(queryApiList, payload.searchValues);
      yield put({
        type: 'saveList',
        payload: queryResponse,
      });
    },
    *createHSF({ payload }, { call, put }) {
      const response = yield call(submitHSFSave, payload);
      yield put({
        type: 'saveResult',
        payload: response,
      });
    },
    *updateHSF({ payload }, { call, put }) {
      const response = yield call(submitHSFEdit, payload);
      yield put({
        type: 'saveResult',
        payload: response,
      });
    },
    *executeHSF({ payload }, { call, put }) {
      const response = yield call(submitHSFExec, payload);
      yield put({
        type: 'saveResult',
        payload: response,
      });
    },
    *updateTestCase({ payload }, { call, put }) {
      const response = yield call(editTestCase, payload);
      yield put({
        type: 'saveResult',
        payload: response,
      });
    },

    *createTestCase({ payload }, { call, put }) {
      const response = yield call(createTestCase, payload);
      yield put({
        type: 'saveResult',
        payload: response,
      });
    },

    *execTestCase({ payload }, { call, put }) {
      const response = yield call(execTestCase, payload);
      yield put({
        type: 'saveResult',
        payload: response,
      });
    },
  },

  reducers: {
    saveList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveResult(state, action) {
      return {
        ...state,
        result: action.payload,
      };
    },
    initResult(state) {
      return {
        ...state,
        result: {},
      };
    },
  },
};
