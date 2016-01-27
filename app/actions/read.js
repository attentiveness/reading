'use strict';

import * as types from '../constants/ActionTypes';
import {ToastShort} from '../utils/ToastUtils';
import {request} from '../utils/RequestUtils';
import {WEXIN_ARTICLE_LIST} from '../constants/Urls';

export function fetchArticles(isRefreshing, loading, typeId) {
	return dispatch => {
		dispatch(fetchArticleList(isRefreshing, loading));
		return request(WEXIN_ARTICLE_LIST + '?typeId=' + typeId, 'get')
      .then((articleList) => {
        dispatch(receiveArticleList(articleList.showapi_res_body.pagebean.contentlist, typeId));
      })
      .catch((error) => {
        dispatch(receiveArticleList([], typeId));
        ToastShort(error.message);
      })
	}
}

function fetchArticleList(isRefreshing, loading) {
	return {
		type: types.FETCH_ARTICLE_LIST
	}
}

function receiveArticleList(articleList, typeId) {
	switch (typeId) {
		case 0:
			return {
				type: types.RECEIVE_HOT_LIST,
				hotList: articleList
			}
		case 9:
			return {
				type: types.RECEIVE_IT_LIST,
				itList: articleList
			}
		case 18:
			return {
				type: types.RECEIVE_CONSTELLATION_LIST,
				constellationList: articleList
			}
		default:
			break;
	}
}