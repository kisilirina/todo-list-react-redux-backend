import { useDispatch, useSelector } from "react-redux"
import { getTodosFromServer } from "../../redux/actionCreators/todosAC"
import Item from "../Item"
import { useState, useEffect } from 'react'
import Loader from '../Loader/Loader'

const List = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    setLoader(true)
    const ac = new AbortController()
    dispatch(getTodosFromServer(ac)).then(() => setLoader(false))
  }, [])

  const todos = useSelector(state => state.todos)

  return (
    <>
      {
        loader ? <Loader />
          :
          <ul className="list-group">
            {
              todos.length ?
                todos.map((el, i) => <Item key={el._id} index={i} item={el} />)
                : <p className="text-center">Здесь пока ничего нет...</p>
            }
          </ul>
      }
    </>
  );
}

export default List;