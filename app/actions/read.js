import * as types from '../constants/ActionTypes';
import { toastShort } from '../utils/ToastUtils';
import { request } from '../utils/RequestUtils';
import { WEXIN_ARTICLE_LIST } from '../constants/Urls';

export function fetchArticles(isRefreshing, loading, typeId, isLoadMore, page) {
  if (page === undefined) {
    page = 1;
  }
  return dispatch => {
    dispatch(fetchArticleList(isRefreshing, loading, isLoadMore));
    return request(`${WEXIN_ARTICLE_LIST}?typeId=${typeId}&page=${page}`, 'get')
      .then((articleList) => {
        dispatch(receiveArticleList(articleList.showapi_res_body.pagebean.contentlist, typeId));
        const errorMessage = articleList.showapi_res_error;
        if (errorMessage && errorMessage !== '') {
          toastShort(errorMessage);
        }
      })
      .catch(() => {
        dispatch(receiveArticleList([], typeId));
        toastShort('网络发生错误，请重试');
      });
  };
}

function fetchArticleList(isRefreshing, loading, isLoadMore) {
  if (isLoadMore === undefined) {
    isLoadMore = false;
  }
  return {
    type: types.FETCH_ARTICLE_LIST,
    isRefreshing,
    loading,
    isLoadMore
  };
}

function receiveArticleList(articleList, typeId) {
  return {
    type: types.RECEIVE_ARTICLE_LIST,
    articleList,
    typeId
  };
}
