'use strict';

import * as types from '../constants/ActionTypes';

const initialState = {
	isRefreshing: false,
	loading: false,
	isLoadMore: false,
	hotList: {},
	itList: {},
	jokeList: {}
}

export default function read(state = initialState, action) {
	switch (action.type) {
		case types.FETCH_ARTICLE_LIST:
			return Object.assign({}, state, {
				isRefreshing: action.isRefreshing,
				loading: action.loading,
				isLoadMore: action.isLoadMore
			});
		case types.RECEIVE_HOT_LIST:
			return Object.assign({}, state, {
				isRefreshing: false,
				loading: false,
				hotList: state.isLoadMore ? state.hotList.concat(action.hotList) : action.hotList
			});
		case types.RECEIVE_IT_LIST:
			return Object.assign({}, state, {
				isRefreshing: false,
				loading: false,
				itList: state.isLoadMore ? state.itList.concat(action.itList) : action.itList
			});
		case types.RECEIVE_JOKE_LIST:
			return Object.assign({}, state, {
				isRefreshing: false,
				loading: false,
				jokeList: state.isLoadMore ? state.jokeList.concat(action.jokeList) : action.jokeList
			});
		default:
			return state;
	}
}