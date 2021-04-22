import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './static/css/App.global.css';
import Hello from './components/Hello';
import 'antd/dist/antd.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
