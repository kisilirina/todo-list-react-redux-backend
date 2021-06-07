import { takeEvery, call, put } from '@redux-saga/core/effects';
import { addTodo } from '../../actionCreators/todosAC';
import { ADD_TODO_SAGA} from '../../types/todosTypes';


const addTodoToServer = (inputTask) => {
   return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/todos`,{
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({task: inputTask})
      })
      .then(response => response.json())
      
}

function* todoSagaWorker(action) {
  
  const todo = yield call(addTodoToServer, action.payload);
  yield put(addTodo(todo));
  
}


function* addTodoSagaWatcher() {
  yield takeEvery(ADD_TODO_SAGA, todoSagaWorker);
}

export default addTodoSagaWatcher

