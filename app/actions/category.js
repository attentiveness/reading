'use strict';

import * as types from '../constants/ActionTypes';
import {ToastShort} from '../utils/ToastUtils';
import {request} from '../utils/RequestUtils';
import {WEXIN_ARTICLE_TYPE} from '../constants/Urls';

export function fetchTypes() {
	return dispatch => {
		dispatch(fetchTypeList());
		return request(WEXIN_ARTICLE_TYPE, 'get')
			.then((typeList) => {
				dispatch(receiveTypeList(typeList.showapi_res_body.typeList));
			})
			.catch((error) => {
				dispatch(receiveTypeList([]));
				ToastShort(error.message);
			})
	}
}

function fetchTypeList() {
	return {
		type: types.FETCH_TYPE_LIST
	}
}

function receiveTypeList(typeList) {
	return {
		type: types.RECEIVE_TYPE_LIST,
		typeList: typeList
	}
}