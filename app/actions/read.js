'use strict';

import * as types from '../constants/ActionTypes';
import {ToastShort} from '../utils/ToastUtils';
import {request} from '../utils/RequestUtils';
import {WEXIN_ARTICLE_LIST} from '../constants/Urls';

export function fetchArticles(isRefreshing, loading) {
	return dispatch => {
		dispatch(fetchArticleList(isRefreshing, loading));
		return request(WEXIN_ARTICLE_LIST + '?typeId=9', 'get')
      .then((articleList) => {
        dispatch(receiveArticleList(articleList.showapi_res_body.pagebean.contentlist));
      })
      .catch((error) => {
        dispatch(receiveArticleList([]));
        ToastShort(error.message);
      })
	}
}

function fetchArticleList(isRefreshing, loading) {
	return {
		type: types.FETCH_ARTICLE_LIST
	}
}

function receiveArticleList(articleList) {
	return {
		type: types.RECEIVE_ARTICLE_LIST,
		articleList: articleList
	}
}