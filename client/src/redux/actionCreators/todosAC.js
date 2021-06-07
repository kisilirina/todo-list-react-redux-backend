import { GET_TODOS, ADD_TODO, CHANGE_STATUS, DELETE_TODO, CHANGE_TASK, CHANGE_STATUS_EDIT, ADD_TODO_SAGA } from "../types/todosTypes";

export const getTodosFromServer = (ac) => async (dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/todos`,{credentials: 'include'}, { signal: ac.signal })
  const todosFromServer = await response.json()
  dispatch(getTodos(todosFromServer))
}


export const getTodos = (todos) => {
  return {
    type: GET_TODOS,
    payload: todos
  }
}

export const addTodo = (newTodo) => {
  return {
    type: ADD_TODO,
    payload: newTodo
  }
}

export const addTodoSaga = (text) => {
  return {
    type: ADD_TODO_SAGA,
    payload: text
  }
}

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: id
  }
}

export const changeStatus = (id) => {
  return {
    type: CHANGE_STATUS,
    payload: id
  }
}

export const changeTask = (editTodo) => {
  return {
    type: CHANGE_TASK,
    payload: editTodo
  }
}

export const changeStatusEdit = (id) => {
  return {
    type: CHANGE_STATUS_EDIT,
    payload: id
  }
}