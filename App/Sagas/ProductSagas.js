import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import ProductRedux from '../Redux/ProductRedux'
import ProductDetailRedux from '../Redux/ProductDetailRedux'

export function * getProduct (api, action) {
  const { data } = action
  // make the call to the api

  if(data && data.detail ){
    const response = yield call(api.getProductDetail, data)
    if (response.ok) {
      // do data conversion here if needed
      yield put(ProductDetailRedux.ProductDetailSuccess(response.data))
    } else {
      yield put(ProductDetailRedux.ProductDetailFailure())
    }
  }else{
    const response = yield call(api.getProduct, data)
    if (response.ok) {
      // do data conversion here if needed
      yield put(ProductRedux.ProductSuccess(response.data))
    } else {
      yield put(ProductRedux.ProductFailure())
    }
  }

 
}
