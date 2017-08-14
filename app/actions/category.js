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

export function requestTypeList() {
  return {
    type: types.REQUEST_TYPE_LIST
  };
}

export function fetchTypeList() {
  return {
    type: types.FETCH_TYPE_LIST
  };
}

export function receiveTypeList(typeList) {
  return {
    type: types.RECEIVE_TYPE_LIST,
    typeList
  };
}

export function changeCategory(categoryList) {
  return {
    type: types.CHANGE_CATEGORY,
    data: categoryList
  };
}
