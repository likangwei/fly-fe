import * as pointService from '../services/point';

export default {
  namespace: 'points',
  state: {
    list: [],
    total: null,
    page: 1,
  },
  reducers: {
    save(state, { payload: { data: list, total, page = 1 } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch({}, { call, put }) {
      console.log("fetch....")
      const { data, headers } = yield call(pointService.fetch);
      yield put({
        type: 'save',
        payload: {
          data,
          total: 10,
          page: 1,
        },
      });
    },
    *remove({ payload: id }, { call, put }) {
      yield call(pointService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(pointService.patch, id, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(pointService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      yield put({ type: 'fetch'});
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        console.log(pathname, query)
        if (pathname === '/collect_points/points') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },
};
