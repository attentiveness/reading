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

import * as types from '../constants/ActionTypes';
import { toastShort } from '../utils/ToastUtil';
import { request } from '../utils/RequestUtil';
import { WEXIN_ARTICLE_LIST } from '../constants/Urls';
import { fetchArticleList, receiveArticleList } from '../actions/read';

export function* requestArticleList(
  isRefreshing,
  loading,
  typeId,
  isLoadMore,
  page
) {
  try {
    yield put(fetchArticleList(isRefreshing, loading, isLoadMore));
    const articleList = yield call(
      request,
      `${WEXIN_ARTICLE_LIST}?typeId=${typeId}&page=${page}`,
      'get'
    );
    yield put(
      receiveArticleList(
        articleList.showapi_res_body.pagebean.contentlist,
        typeId
      )
    );
    const errorMessage = articleList.showapi_res_error;
    if (errorMessage && errorMessage !== '') {
      yield toastShort(errorMessage);
    }
  } catch (error) {
    yield put(receiveArticleList([], typeId));
    toastShort('网络发生错误，请重试');
  }
}

export function* watchRequestArticleList() {
  while (true) {
    const {
      isRefreshing,
      loading,
      typeId,
      isLoadMore,
      page
    } = yield take(types.REQUEST_ARTICLE_LIST);
    yield fork(
      requestArticleList,
      isRefreshing,
      loading,
      typeId,
      isLoadMore,
      page
    );
  }
}
