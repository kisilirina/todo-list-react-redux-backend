import { takeEvery, call, put } from 'redux-saga/effects';
import { signupAC } from '../../actionCreators/userAC';
import { SAGA_SIGNUP } from '../../types/userTypes';

async function signupFetch(action) {
  const response = await fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/users/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(action.payload)
  });
  if (response.status === 200) return await response.json();
}

function* signupWorker(action) {
   try {
      yield call(signupFetch, action);
      yield put(signupAC(action.payload.userName));
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

function* userSignupSagaWatcher() {
  yield takeEvery(SAGA_SIGNUP, signupWorker);
}

export default userSignupSagaWatcher;
