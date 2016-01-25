'use strict';

import * as types from '../constants/ActionTypes';

const initialState = {
	isRefreshing: false,
	loading: false,
	articleList: []
}

export default function notice(state = initialState, action) {
	switch (action.type) {
		case types.FETCH_ARTICLE_LIST:
			return Object.assign({}, state, {
				isRefreshing: action.isRefreshing,
				loading: action.loading
			});
		case types.RECEIVE_ARTICLE_LIST:
			return Object.assign({}, state, {
				isRefreshing: false,
				loading: false,
				articleList: action.articleList
			});
		default:
			return state;
	}
}