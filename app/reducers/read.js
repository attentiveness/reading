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

const _ = require('lodash');

const initialState = {
  isRefreshing: false,
  loading: false,
  isLoadMore: false,
  noMore: false,
  articleList: {}
};

export default function read(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_ARTICLE_LIST:
      return Object.assign({}, state, {
        isRefreshing: action.isRefreshing,
        loading: action.loading,
        isLoadMore: action.isLoadMore
      });
    case types.RECEIVE_ARTICLE_LIST:
      return Object.assign({}, state, {
        isRefreshing: false,
        isLoadMore: false,
        noMore: action.articleList.length === 0,
        articleList: state.isLoadMore
          ? mergeArticles(state, action)
          : replaceArticles(state, action),
        loading: state.articleList[action.typeId] === undefined
      });
    default:
      return state;
  }
}

function replaceArticles(state, action) {
  state.articleList[action.typeId] = action.articleList;
  return state.articleList;
}

function mergeArticles(state, action) {
  state.articleList[action.typeId] = _.unionBy(
    state.articleList[action.typeId],
    action.articleList,
    'id'
  );
  return state.articleList;
}
