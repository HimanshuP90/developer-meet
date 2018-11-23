import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAutToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authAction';

import { Provider } from 'react-redux';
import store from './store';

import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css'; 

// Check for token
if(localStorage.jwtToken){
  // Set Auth Token
  setAutToken(localStorage.jwtToken);
  // Decode token & get info of user
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set User and isAutheticated
  store.dispatch(setCurrentUser(decoded));
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
              <Route exact path="/" component={Landing} />
              <div className="container">
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </div>
              <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
