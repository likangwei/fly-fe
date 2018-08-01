import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva();


// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/problem').default);
app.model(require('./models/reason').default);
app.model(require('./models/point').default);
app.model(require('./models/decision').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
