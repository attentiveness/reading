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
import * as types from '../constants/ActionTypes';
import { toastShort } from '../utils/ToastUtil';
import { request } from '../utils/RequestUtil';
import { WEXIN_ARTICLE_TYPE } from '../constants/Urls';
import Storage from '../utils/Storage';

export function fetchTypes() {
  return dispatch => {
    dispatch(fetchTypeList());
    return request(WEXIN_ARTICLE_TYPE, 'get')
      .then((typeList) => {
        dispatch(receiveTypeList(typeList.showapi_res_body.typeList));
        Storage.save('typeList', typeList.showapi_res_body.typeList);
        const errorMessage = typeList.showapi_res_error;
        if (errorMessage && errorMessage !== '') {
          toastShort(errorMessage);
        }
      })
      .catch(() => {
        dispatch(receiveTypeList([]));
        toastShort('网络发生错误，请重试');
      });
  };
}

function fetchTypeList() {
  return {
    type: types.FETCH_TYPE_LIST
  };
}

function receiveTypeList(typeList) {
  return {
    type: types.RECEIVE_TYPE_LIST,
    typeList
  };
}
