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
import { WEXIN_ARTICLE_LIST } from '../constants/Urls';

export function fetchArticles(isRefreshing, loading, typeId, isLoadMore, page = 1) {
  return dispatch => {
    dispatch(fetchArticleList(isRefreshing, loading, isLoadMore));
    return request(`${WEXIN_ARTICLE_LIST}?typeId=${typeId}&page=${page}`, 'get')
      .then((articleList) => {
        dispatch(receiveArticleList(articleList.showapi_res_body.pagebean.contentlist, typeId));
        const errorMessage = articleList.showapi_res_error;
        if (errorMessage && errorMessage !== '') {
          toastShort(errorMessage);
        }
      })
      .catch(() => {
        dispatch(receiveArticleList([], typeId));
        toastShort('网络发生错误，请重试');
      });
  };
}

function fetchArticleList(isRefreshing, loading, isLoadMore = false) {
  return {
    type: types.FETCH_ARTICLE_LIST,
    isRefreshing,
    loading,
    isLoadMore
  };
}

function receiveArticleList(articleList, typeId) {
  return {
    type: types.RECEIVE_ARTICLE_LIST,
    articleList,
    typeId
  };
}
