import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import Loadable from 'react-loadable';
import LoadingComponent from '../components/LoadingComponent';

const gccAsyncLogin = Loadable({
  loader: () => import('../containers/GccLoginContainer'),
  loading: LoadingComponent,
});

const genericAsyncLogin = Loadable({
  loader: () => import('../containers/GenericLoginContainer'),
  loading: LoadingComponent,
});

const AsyncHome = Loadable({
  loader: () => import('../App'),
  loading: LoadingComponent,
});

export default (props) => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={gccAsyncLogin} />
      <Route exact path="/others" component={genericAsyncLogin} />
      <Route exact path="/dashboard" component={AsyncHome} />
    </Switch>
  </Router>
);
