import { createContext, useState, useEffect, useCallback, useContext, useMemo } from "react";

const todosContext = createContext();

const TodosContextProvider = ({children}) => {

  const [todos, setTodos] = useState([]);


  const handlerSubmit = (e, input) => {
    e.preventDefault();
    setTodos(prev => [...prev, {
      task: input,
      done: false,
      id: Date.now(),
      edit: false,
    }]);
  }

  const doneHandler = (id) => {
    setTodos(prev => prev.map( el => el.id === id ? {...el, done: !el.done} : el ));
  }

  const deleteHandler = (id) => {
    setTodos(prev => prev.filter(elem => id !== elem.id));
  }

  const editHandler = (id) => {
    setTodos(prev => prev.map(elem => id === elem.id ? {...elem, edit: true} : elem));
  }

  const editState = (e, id , value) => {
    e.preventDefault();
    setTodos(prev => prev.map(elem => id === elem.id ? {...elem, edit: false, task: value} : elem));
  }

  return (
    <todosContext.Provider value={{
      todos,
      doneHandler,
      deleteHandler,
      handlerSubmit,
      editHandler,
      editState,
    }} >
        {children}
    </todosContext.Provider>
  )
  
}

export default TodosContextProvider;

const useTodosContext = () => useContext(todosContext)

export {useTodosContext};

