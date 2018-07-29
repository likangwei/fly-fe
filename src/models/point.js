import * as pointService from '../services/point';
import * as pointRelationService from '../services/pointRelation';

export default {
  namespace: 'points',
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
      let { data } = yield call(pointService.fetch);
      let relas = yield call(pointRelationService.fetch);
      yield put({
        type: 'save',
        payload: {
          data,
          total: 10,
          page: 1,
          relas: relas.data || [],
        },
      });

    },
    *remove({ payload: id }, { call, put, select}) {
      const state = yield select(state => state);
      console.log(state)
      let relas = state.points.relas || []
      console.log(relas)
      for(let i=0; i<relas.length; i++){
        let r = relas[i]
        if(r.why == id || r.so == id){
          yield call(pointRelationService.remove, r.id);
        }
      }
      yield call(pointService.remove, id);
      yield put({ type: 'reload' });
    },
    *removeRelation({ payload: id }, { call, put }) {

      yield call(pointRelationService.remove, id);
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
    *openAlert({payload: {msg}}, {put}){
      yield put({type: 'saveAlert', payload:{msg: msg, open: true}});
    },
    *closeAlert( action, { call, put }){
      yield put({type: 'saveAlert', payload:{ open: false}})
    },
    *addRelation({payload: rela}, { call, put, select }) {
      let resp = yield call(pointService.createRelation, rela)
      if(resp.status != 201){
        yield put(
          {
            type: "openAlert", 
            payload: {msg: resp.data}
          }
        )
      }
      yield put({ type: 'reload' });
    },
    *addNewRelation({payload: {whyData, so}}, {call, put, select}){
      let newPoint = yield call(pointService.create, whyData)
      console.log(newPoint)
      let {data: {id, content, ct}} = newPoint
      yield put({type: "addRelation", payload:{why: id, so: so}})
      yield put({ type: 'reload' });

    }
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
