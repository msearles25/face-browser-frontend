import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// styled components
import { ThemeProvider } from 'styled-components';
import Theme from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>

  );
}

export default App;
