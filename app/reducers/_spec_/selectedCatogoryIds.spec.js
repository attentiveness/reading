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
import reducer from './../selectedCategoryIds';
import * as types from '../../constants/ActionTypes';

describe('selectedCategoryIds reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle CHANGE_CATEGORY ', () => {
    const categoryIds = [1, 2];
    const newCategoryIds = [3, 4];
    expect(
      reducer([], {
        type: types.CHANGE_CATEGORY,
        data: categoryIds
      })
    ).toEqual(categoryIds);
    expect(
      reducer(categoryIds, {
        type: types.CHANGE_CATEGORY,
        data: newCategoryIds
      })
    ).toEqual(newCategoryIds);
  });

  it('should handle PERSIST_REHYDRATE from redux-persist ', () => {
    const newCategoryIds = [3, 4];
    expect(
      reducer([], {
        type: types.PERSIST_REHYDRATE,
        payload: {
          selectedCategoryIds: newCategoryIds
        }
      })
    ).toEqual(newCategoryIds);
  });
});
