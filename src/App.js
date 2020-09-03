import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import signIn from "./components/pages/SignIn";
import signUp from './components/pages/SignUp';
import forgotPass from "./components/pages/Password";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path='/' component={signIn} exact />
            <Route path='/signUp' component={signUp} />
            <Route path='/password' component={forgotPass} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
