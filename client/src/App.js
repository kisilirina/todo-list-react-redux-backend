import './App.css';
import Form from './Components/Form';
import List from './Components/List';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useEffect } from 'react';
import Signup from './Components/User/Signup.jsx';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute.jsx';
import { useDispatch } from 'react-redux';
import { getAuthFromServer } from './redux/actionCreators/userAC'
import Header from './Components/Header/Header';
import Todos from './Components/Todos/Todos';
import Signin from './Components/User/Signin';

function App() {

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getAuthFromServer())
  }, [])

  return (
    <>
      <Router>
        <Header />

        <Switch>

          <PrivateRoute exact path="/">
            <Todos />
          </PrivateRoute>

          <Route path="/signup">
            <Signup />
          </Route>
     
          <Route path="/signin">
            <Signin />
          </Route>

        </Switch>

      </Router>

    </>
  );
}

export default App;
