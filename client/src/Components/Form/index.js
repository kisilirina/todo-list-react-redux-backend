import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoSaga } from "../../redux/actionCreators/todosAC";

const Form = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  
  const handlerSubmit = (e, inputTask) => {
    e.preventDefault();
    dispatch(addTodoSaga(inputTask))
  }

  return (
    <form onSubmit={(e) => handlerSubmit(e, input)} className="d-flex justify-content-center align-items-center my-5">
      <div>
        <input type="text" onChange={(e) => setInput(e.target.value)} placeholder="new task..." value={input} className="form-control" id="exampleInputEmail1" />
      </div>
      <button type="submit" className="btn btn-primary mx-3">Submit</button>
    </form>
  );
}

export default React.memo(Form);