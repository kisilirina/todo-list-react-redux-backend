import { all } from 'redux-saga/effects'
import addTodoSagaWatcher from './todos/addTodoSagaWatcher.js'
import userSigninSagaWatcher from './user/userSigninSagaWatcher.js'
import userSignupSagaWatcher from './user/userSignupSagaWatcher.js'

export default function* rootSaga() {
  yield all([
    addTodoSagaWatcher(),
    userSignupSagaWatcher(),
    userSigninSagaWatcher()
  ])
}