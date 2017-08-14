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

const initialState = {
  selectedCategoryIds: [],
};

export default function selectedCategoryIds(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_CATEGORY:
      return Object.assign([], action.data);
    case types.PERSIST_REHYDRATE:
      return Object.assign([], action.payload.selectedCategoryIds);

    default:
      return state || [];
  }
}
