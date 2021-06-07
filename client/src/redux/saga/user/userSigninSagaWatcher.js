import { takeEvery, call, put } from 'redux-saga/effects';
import { signupAC } from '../../actionCreators/userAC';
import { SAGA_SIGNIN } from '../../types/userTypes';

async function signinFetch(action) {
  const resp = await fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/users/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(action.payload)
  })
  if (resp.status === 200) return await resp.json()
}


function* signinWorker(action) {
  try {
    const signinResponse = yield call(signinFetch, action);
    yield put(signupAC(signinResponse.name));
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* userSigninSagaWatcher() {
  yield takeEvery(SAGA_SIGNIN, signinWorker);
}

export default userSigninSagaWatcher;