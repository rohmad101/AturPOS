import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  CalculateRequest: ['data'],
  CalculateSuccess: ['payload'],
  CalculateFailure: null
})

export const CalculateTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: [],
  error: null
})

/* ------------- Selectors ------------- */

export const CalculateSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: INITIAL_STATE.payload })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CALCULATE_REQUEST]: request,
  [Types.CALCULATE_SUCCESS]: success,
  [Types.CALCULATE_FAILURE]: failure
})