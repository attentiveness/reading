/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { put, take, call, fork } from 'redux-saga/effects';
import store from 'react-native-simple-store';
import * as types from '../constants/ActionTypes';
import { toastShort } from '../utils/ToastUtil';
import { request } from '../utils/RequestUtil';
import { WEXIN_ARTICLE_TYPE } from '../constants/Urls';
import { fetchTypeList, receiveTypeList } from '../actions/category';

export function* requestTypeList() {
  try {
    yield put(fetchTypeList());
    const typeList = yield call(request, WEXIN_ARTICLE_TYPE, 'get');
    yield put(receiveTypeList(typeList.showapi_res_body.typeList));
    yield call(store.save, 'typeList', typeList.showapi_res_body.typeList);
    const errorMessage = typeList.showapi_res_error;
    if (errorMessage && errorMessage !== '') {
      yield toastShort(errorMessage);
    }
  } catch (error) {
    yield put(receiveTypeList([]));
    yield toastShort('网络发生错误，请重试');
  }
}

export function* watchRequestTypeList() {
  while (true) {
    yield take(types.REQUEST_TYPE_LIST);
    yield fork(requestTypeList);
  }
}
