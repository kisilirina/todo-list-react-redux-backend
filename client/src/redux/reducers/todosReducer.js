import { GET_TODOS, ADD_TODO, CHANGE_STATUS, DELETE_TODO, CHANGE_TASK, CHANGE_STATUS_EDIT } from "../types/todosTypes";


const todosReducer = (state = [], action) => {
  switch (action.type) {
    
    case GET_TODOS:
      return action.payload

    case ADD_TODO:
      return [
        ...state,
        action.payload
      ]

    case DELETE_TODO:
      return state.filter(todo => todo._id !== action.payload)

    case CHANGE_STATUS:
      return state.map(todo => {
        if (todo._id === action.payload) {
          return {
            ...todo,
            done: !todo.done
          }
        }
        return todo
      })

    case CHANGE_TASK:
      return state.map(todo => {
        if (todo._id === action.payload._id) {
          return {
            ...todo,
            edit: action.payload.edit,
            task: action.payload.task
          }
        }
        return todo
      })

    case CHANGE_STATUS_EDIT:
      return state.map(todo => {
        if (todo._id === action.payload) {
          return {
            ...todo,
            edit: !todo.edit
          }
        }
        return todo
      })

    default:
      return state
  }
}

export default todosReducer