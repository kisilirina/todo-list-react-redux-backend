import { AUTH, LOGOUT, SAGA_SIGNIN, SAGA_SIGNUP } from "../types/userTypes.js"

export const getAuthFromServer = () => async (dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/users/checkAuth`, {
    credentials: 'include'
  });

  if (response.status === 200) {
    const {name} = await response.json()
    dispatch(signupAC(name))
  }
}

export const sagaSignupAC = ({ email, password, userName }) => {
  return {
    type: SAGA_SIGNUP,
    payload: {
      email,
      password,
      userName
    }
  }
}

export const sagaSigninAC = ({ email, password }) => {
  return {
    type: SAGA_SIGNIN,
    payload: {
      email,
      password
    }
  }
}

export const signupAC = (nickname) => {
  return {
    type: AUTH,
    payload: {
      nickname,
      isAuth: true
    }
  }
}

export const signoutAC = () => {
  return {
    type: LOGOUT
  }
}