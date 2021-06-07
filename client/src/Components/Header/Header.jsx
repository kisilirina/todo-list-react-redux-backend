import { useSelector, useDispatch } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { signoutAC } from "../../redux/actionCreators/userAC";



function Header() {

  const user = useSelector(state => state.user);

  const dispatch = useDispatch()

  const signoutHandler = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/users/signout`, {
      credentials: 'include',
    })
      .then(response => { response.status === 200 ? dispatch(signoutAC()) : console.log('Ошибка при выходе'); })
  }

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid px-5">
        <Link className="navbar-brand" to="#">Todolist-react-redux-registration</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar d-flex justify-content-end" id="navbarSupportedContent" >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {user.isAuth ?
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="#">Привет, {user.nickname}</Link>
                </li>

                <li className="nav-item">
                  <NavLink to="#" onClick={signoutHandler} className="nav-link" activeClassName="active">
                    Signout
                  </NavLink>
                </li>
              </>
              :
              <>
                <li className="nav-item">
                  <NavLink to="/signup" className="nav-link" activeClassName="active">
                    Signup
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/signin" className="nav-link" activeClassName="active">
                    Signin
                  </NavLink>
                </li>
              </>
            }
          </ul>

        </div>
      </div>
    </nav>
  )
}

export default Header