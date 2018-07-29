import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Graph from './routes/Graph'
import G6graph from './routes/G6'
import RealReason from './components/point/RealReason'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/g" exact component={Graph} />
        <Route path="/g6" exact component={G6graph} />
        <Route path="/gmt" exact component={G6graph} />
        <Route path="/gojs" exact component={RealReason} />

        <Route path="/*" exact component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
