import { fork } from 'redux-saga/effects';

import { watchRequestTypeList } from './category';

export default function* rootSaga() {
  yield [
    fork(watchRequestTypeList),
  ];
}
