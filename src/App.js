import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import './App.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// styled components
import { ThemeProvider } from 'styled-components';
import Theme from './style/theme';

// jwt
import jwt_decode from 'jwt-decode';

// redux
import { connect } from 'react-redux';
import { logoutUser, authUser, getUserInfo } from './redux/actions/userActions';

const App = props => {
  const { logoutUser, authUser, getUserInfo, history } = props;
  
  // checking if users auth is expired
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      const decoded = jwt_decode(token)
      const expired = decoded.exp * 1000
      const currentDate = Date.now();
      if(expired <= currentDate) {
        logoutUser();
        // window.location.href = '/login';
        // need a small time out, otherwise an error is thrown
        setTimeout(() => history.push('/login'), 15)
      } else {
        authUser();
        getUserInfo();
      }
    }
  }, [logoutUser, history, authUser, getUserInfo])

  return (
    <ThemeProvider theme={Theme}>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
        </Switch>
      </div>
    </ThemeProvider>
  );
}

const mapActionsToProps = {
  logoutUser,
  authUser,
  getUserInfo
}

export default connect(null, mapActionsToProps)(withRouter(App));
