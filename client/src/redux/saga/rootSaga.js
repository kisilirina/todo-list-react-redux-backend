import { all } from 'redux-saga/effects'
import addTodoSagaWatcher from './sagaWatcher'

export default function* rootSaga() {
  yield all([
    addTodoSagaWatcher()
  ])
}