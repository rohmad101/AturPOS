import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import UserRedux from '../Redux/UserRedux'

export function * getLogin (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.getLogin, data)
  console.log(response)
  if (response.ok) {
    // do data conversion here if needed
    yield put(UserRedux.UserSuccess(response.data))
  } else {
    yield put(UserRedux.UserFailure(response))
  }
}
