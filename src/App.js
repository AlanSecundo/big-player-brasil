import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LoginPage from './Pages/LoginPage';
import SubscriptionPage from './Pages/SubscriptionPage';
import SubscriptionListPage from './Pages/SubscriptionListPage';
import 'antd/dist/antd.css';
import { LOGIN_ROUTE, SUBSCRIPTION_ROUTE, LIST_SUBSCRIPTIONS_ROUTE } from './routes/'

const createChildren = page => (
  <div className="container">
    <img
      src={require('./assets/bpb.png').default}
      alt="Logotipo da Big Player Brasil representado por um fogo azul com o nome da marca logo abaixo "
      width="250"
    />
    {page}
  </div>)

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path={LOGIN_ROUTE} children={() => createChildren(<LoginPage />)} />
          <Route path={SUBSCRIPTION_ROUTE} children={() => createChildren(<SubscriptionPage />)} />
          <Route path={LIST_SUBSCRIPTIONS_ROUTE} children={() => createChildren(<SubscriptionListPage />)} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
