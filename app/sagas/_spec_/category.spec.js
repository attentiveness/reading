import { expect } from 'chai';

import { put, call } from 'redux-saga/effects';
import { requestTypeList } from '../category';
import { fetchTypeList } from '../../actions/category';

describe('category saga tests', () => {
  const generator = requestTypeList();

  it('should dispatch fetchTypeList', () => {
    let next = generator.next();
    expect(next.value).to.deep.equal(put(fetchTypeList()));
  });
});
