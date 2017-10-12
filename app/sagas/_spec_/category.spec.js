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
import { put, call } from 'redux-saga/effects';
import store from 'react-native-simple-store';
import { requestTypeList } from '../category';
import { fetchTypeList, receiveTypeList } from '../../actions/category';
import RequestUtil from '../../utils/RequestUtil';
import { WEXIN_ARTICLE_TYPE } from '../../constants/Urls';

/* global expect */
describe('category saga tests', () => {
  const generator = requestTypeList();
  const step = input => generator.next(input).value;
  const mockTypeList = {
    showapi_res_body: {
      typeList: [
        {
          id: '19',
          name: 'Sports'
        },
        {
          id: '2',
          name: 'Entertainment'
        }
      ]
    }
  };

  it('should put(fetchTypeList())', () => {
    const next = step();
    expect(next).toEqual(put(fetchTypeList()));
  });

  it("should call(request, WEXIN_ARTICLE_TYPE, 'get')", () => {
    const next = step();
    expect(next).toEqual(call(RequestUtil.request, WEXIN_ARTICLE_TYPE, 'get'));
  });

  it('should put(receiveTypeList(typeList.showapi_res_body.typeList))', () => {
    const next = step(mockTypeList);
    expect(next).toEqual(put(receiveTypeList(mockTypeList.showapi_res_body.typeList)));
  });

  it("should call(store.save, 'typeList', typeList.showapi_res_body.typeList)", () => {
    const next = step(mockTypeList);
    expect(next).toEqual(call(store.save, 'typeList', mockTypeList.showapi_res_body.typeList));
  });

  it('should be done', () => {
    const next = generator.next();
    expect(next.done).toEqual(true);
  });
});
