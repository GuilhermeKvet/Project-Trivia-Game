import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Config from './pages/Config';
import Login from './pages/Login';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/config" component={ Config } />
      </Switch>
    </div>
  );
}
