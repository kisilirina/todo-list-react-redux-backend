import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { sagaSigninAC } from '../../redux/actionCreators/userAC';
// import { sagaSiginAC } from '../../redux/actionCreators/userAC';

function Signin() {
  const formRef = useRef(null);

  const dispatch = useDispatch();

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const isAuth = useSelector(state => state.user.isAuth);

  useEffect(() => {
    if(isAuth) {
      history.replace(from);
    }
  }, [isAuth])

  const handlerSubmit = (e) => {
    e.preventDefault();

    const valuesOfFields = Object.fromEntries(new FormData(formRef.current).entries());

    if (Object.keys(valuesOfFields).every(key => valuesOfFields[key].trim())) {
      dispatch(sagaSigninAC(valuesOfFields))
      formRef.current.reset()
    }
  }

  return (
    <form ref={formRef} onSubmit={handlerSubmit} className="d-flex flex-column justify-content-center align-items-center my-5">
      <div className="mb-3">
        <input type="email" name="email" placeholder="email..." className="form-control" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <input type="password" name="password" placeholder="password..." className="form-control" aria-describedby="emailHelp" />
      </div>
      <button type="submit" className="btn btn-primary">Signin</button>
    </form>
  )
}

export default Signin;