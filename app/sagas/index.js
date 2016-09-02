import { helloSaga } from './helloSaga';

export default function* rootSaga() {
  yield [
    helloSaga(),
  ];
}
