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

import { requestArticleList } from '../read';
import RequestUtil from '../../utils/RequestUtil';
import { WEXIN_ARTICLE_LIST } from '../../constants/Urls';
import { fetchArticleList, receiveArticleList } from '../../actions/read';

/* global expect */
describe('read saga tests', () => {
  const {
    isRefreshing, loading, typeId, isLoadMore, page
  } = {
    isRefreshing: false,
    loading: false,
    typeId: 2,
    isLoadMore: false,
    page: 1
  };
  const generator = requestArticleList(
    isRefreshing,
    loading,
    typeId,
    isLoadMore,
    page
  );
  const mockArticleList = {
    showapi_res_body: {
      pagebean: {
        contentlist: []
      }
    }
  };
  const step = input => generator.next(input).value;

  it(`should put(fetchArticleList(${isRefreshing}, ${loading}, ${isLoadMore}))`, () => {
    const next = step();
    expect(next).toEqual(put(fetchArticleList(isRefreshing, loading, isLoadMore)));
  });

  it(`should call(request, ${WEXIN_ARTICLE_LIST}?typeId=${typeId}&page=${page}, 'get')`, () => {
    const next = step();
    expect(next).toEqual(call(
      RequestUtil.request,
      `${WEXIN_ARTICLE_LIST}?typeId=${typeId}&page=${page}`,
      'get'
    ));
  });

  it(`should put(receiveArticleList(contentlist, ${typeId}))`, () => {
    const next = step(mockArticleList);
    expect(next).toEqual(put(receiveArticleList(
      mockArticleList.showapi_res_body.pagebean.contentlist,
      typeId
    )));
  });

  it('should be done', () => {
    const done = generator.next().done;
    expect(done).toEqual(true);
  });
});
