'use strict';

import * as types from '../constants/ActionTypes';

const initialState = {
	loading: false,
	typeList: {}
}

export default function category(state = initialState, action) {
	switch (action.type) {
		case types.FETCH_TYPE_LIST:
			return Object.assign({}, state, {
				loading: true
			});
		case types.RECEIVE_TYPE_LIST:
			return Object.assign({}, state, {
				loading: false,
				typeList: action.typeList
			})
		default:
			return state;
	}
}
