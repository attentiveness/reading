'use strict';

import * as types from '../constants/ActionTypes';

const initialState = {
	isRefreshing: false,
	loading: false,
	isLoadMore: false,
	noMore: false,
	articleList: {}
}

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
				loading: false,
				isLoadMore: false,
				noMore: action.articleList.length == 0,
				articleList: state.isLoadMore ? loadMore(state, action) : combine(state, action)
			});
		default:
			return state;
	}
}

function combine(state, action) {
	state.articleList[action.typeId] = action.articleList
	return state.articleList;
}

function loadMore(state, action) {
	state.articleList[action.typeId] = state.articleList[action.typeId].concat(action.articleList)
	return state.articleList;
}