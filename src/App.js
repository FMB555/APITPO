import React from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import signIn from "./components/pages/SignIn";
import signUp from './components/pages/SignUp';
import home from "./components/pages/Home";
import crearEncuesta from "./components/pages/Encuesta";
import E from "./components/pages/E";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path='/' component={signIn} exact />
            <Route path='/signUp' component={signUp} />
            <Route path='/home' component={home} />
            <Route path='/crearEncuesta' component={crearEncuesta} />
            <Route path='/E' component={E} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
