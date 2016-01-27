'use strict';

import * as types from '../constants/ActionTypes';

const initialState = {
	isRefreshing: false,
	loading: false,
	hotList: {},
	itList: {},
	constellationList: {}
}

export default function read(state = initialState, action) {
	switch (action.type) {
		case types.FETCH_ARTICLE_LIST:
			return Object.assign({}, state, {
				isRefreshing: action.isRefreshing,
				loading: action.loading
			});
		case types.RECEIVE_HOT_LIST:
			return Object.assign({}, state, {
				isRefreshing: false,
				loading: false,
				hotList: action.hotList
			});
		case types.RECEIVE_IT_LIST:
			return Object.assign({}, state, {
				isRefreshing: false,
				loading: false,
				itList: action.itList
			});
		case types.RECEIVE_CONSTELLATION_LIST:
			return Object.assign({}, state, {
				isRefreshing: false,
				loading: false,
				constellationList: action.constellationList
			});
		default:
			return state;
	}
}