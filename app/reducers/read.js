'use strict';

import * as types from '../constants/ActionTypes';

const initialState = {
	isRefreshing: false,
	loading: false
}

export default function notice(state = initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
}