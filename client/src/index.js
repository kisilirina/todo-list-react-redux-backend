import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './redux/reducers/rootReducer';
import initState from './redux/initState';
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './redux/saga/rootSaga';



const sagaMiddleware = createSagaMiddleware()
const store = createStore( rootReducer, initState(), composeWithDevTools(applyMiddleware(thunk, sagaMiddleware)));
sagaMiddleware.run(rootSaga)
store.subscribe(() => {
  window.localStorage.setItem('myApp', JSON.stringify(store.getState()));
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App /> 
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

