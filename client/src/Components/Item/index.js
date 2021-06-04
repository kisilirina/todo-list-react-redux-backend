import { useDispatch } from 'react-redux'
import { deleteTodo, changeStatus, changeTask, changeStatusEdit } from '../../redux/actionCreators/todosAC'
import React, { useState } from 'react'

const Item = ({ item, index }) => {
  const [valueinInput, setValueinInput] = useState(item.task)

  const dispatch = useDispatch()

  const doneHandler = (id, done) => {
    fetch('http://localhost:3000/api/v1/todos', {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, done: !done }),
    })
      .then(response => { response.status === 200 ? dispatch(changeStatus(id)) : console.log('Ошибка в изменении done'); })
  }

  const deleteHandler = (id) => {
    fetch('http://localhost:3000/api/v1/todos', {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id }),
    })
      .then(response => { response.status === 200 ? dispatch(deleteTodo(id)) : console.log('Ошибка при delete'); })
  }

  const editHandler = (id, edit) => {
    fetch('http://localhost:3000/api/v1/todos', {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, edit: !edit }),
    })
      .then(response => { response.status === 200 ? dispatch(changeStatusEdit(id)) : console.log('Ошибка в изменении edit'); })
  }

  const editState = (e, id, value, edit) => {
    console.log('ya zashel');
    e.preventDefault();
    fetch('http://localhost:3000/api/v1/todos', {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, task: value, edit: !edit }),
    })
      .then(response => response.json())
      .then(editTask => dispatch(changeTask(editTask)))
  }



  return (
    <>

      {
        item.edit
          ? <div className="d-flex justify-content-start my-2">
            <form className="d-flex mx-5" onSubmit={(e) => editState(e, item._id, valueinInput, item.edit)}>
              <input className="form-control mr-1" value={valueinInput} onChange={(e) => setValueinInput(e.target.value)} style={{width: '70vw'}}/>
              <button type="submit" className="btn btn-primary mx-5" style={{width: '10vw'}}>Save changes</button >
            </form>
          </div>
          : <div className="d-flex justify-content-start my-2">
            <li id={item._id} className="list-group-item mx-5"><span className={item.done ? 'done' : ''}>{index + 1}. {item.task}</span></li>
            <button onClick={() => doneHandler(item._id, item.done)} className={`btn btn-${item.done ? 'secondary' : 'success'} mx-1`} style={{width: '7vw'}}>{item.done ? 'Undone' : 'Done'}</button>
            <button onClick={() => deleteHandler(item._id)} className="btn-danger btn mx-1" style={{width: '7vw'}}>Delete</button>
            <button onClick={() => editHandler(item._id, item.edit)} className="btn-warning btn mx-1" style={{width: '7vw'}}>Edit</button>
          </div>
      }
    </>
  );
}

export default React.memo(Item);