import {combineReducers} from 'redux'
import todosReducer from './todosReducer'
import userReducer from './userReducer'
import {LOGOUT} from '../types/userTypes'

const appReducer = combineReducers({
  todos: todosReducer,
  user: userReducer,
})

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
      state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer