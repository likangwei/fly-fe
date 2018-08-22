import * as decisionService from '../services/decision';

export default {
  namespace: 'decisions',
  state: {
    list: [],
    m: {},
    total: null,
    page: 1,
    alert: {msg: "hello~ i'm alert!", open: false},
    relas: [],
  },
  reducers: {
    save(state, { payload: { data: list, total, relas, page = 1 } }) {
      return { ...state, list, total, page, relas: relas||[]};
    },
    saveAlert(state, {payload: {msg, open=true}}){
      return {...state, alert: {msg, open: open}}
    },
    saveOne(state, {payload: {id: id, record: record}}){
      let cp = {...state}
      cp.m[record.Id] = record
      return cp
    }
  },
  effects: {
    *fetch({}, { call, put }) {
      console.log("fetch....")
      let { data } = yield call(decisionService.fetch);
      yield put({
        type: 'save',
        payload: {
          data,
          total: 10,
          page: 1,
        },
      });

    },
    *remove({ payload: id }, { call, put, select}) {
      yield call(decisionService.remove, id);
      yield put({ type: 'reload' });
    },
    *fetchOne({ payload: id }, { call, put, select}) {
      let {data} = yield call(decisionService.getOne, id);
      yield put({type: 'saveOne', payload: {id: id, record: data}})
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(decisionService.patch, id, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(decisionService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      yield put({ type: 'fetch'});
    },
    *openAlert({payload: {msg}}, {put}){
      yield put({type: 'saveAlert', payload:{msg: msg, open: true}});
    },
    *closeAlert( action, { call, put }){
      yield put({type: 'saveAlert', payload:{ open: false}})
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        console.log(pathname, query)
        if (pathname === '/decision/') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },
};
