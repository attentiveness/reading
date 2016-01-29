'use strict';

import * as types from '../constants/ActionTypes';

const initialState = {
	isRefreshing: false,
	loading: false,
	isLoadMore: false,
	hotList: {},
	itList: {},
	constellationList: {}
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
		case types.RECEIVE_CONSTELLATION_LIST:
			return Object.assign({}, state, {
				isRefreshing: false,
				loading: false,
				constellationList: state.isLoadMore ? state.constellationList.concat(action.constellationList) : action.constellationList
			});
		default:
			return state;
	}
}