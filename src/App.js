import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';

import home from './pages/home';
import login from './pages/login';
import register from './pages/register';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={home}/>
          <Route exact path='/login' component={login}/>
          <Route exact path='/register' component={register}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
