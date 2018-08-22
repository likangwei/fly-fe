import * as optionService from '../services/option';

export default {
  namespace: 'options',
  state: {
    list: [],
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
    }
  },
  effects: {
    *fetch({}, { call, put }) {
      console.log("fetch....")
      let { data } = yield call(optionService.fetch);
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
      yield call(optionService.remove, id);
      yield put({ type: 'reload' });
    },
    
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(optionService.patch, id, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(optionService.create, values);
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
        if (pathname === '/option/') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },
};
