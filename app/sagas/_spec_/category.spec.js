import { expect } from 'chai';

import { put, call } from 'redux-saga/effects';
import { requestTypeList } from '../category';
import { fetchTypeList, receiveTypeList } from '../../actions/category';
import { request } from '../../utils/RequestUtil';
import { WEXIN_ARTICLE_TYPE } from '../../constants/Urls';
import Storage from '../../utils/Storage';

describe('category saga tests', () => {
  const generator = requestTypeList();
  const step = (input) => generator.next(input).value;
  const mockTypeList = {
    showapi_res_body: {
      typeList: [
        {
          id: '19',
          name: 'Sports',
        },
        {
          id: '2',
          name: 'Entertainment',
        },
      ],
    },
  };

  it('should dispatch fetchTypeList', () => {
    const next = step();
    expect(next).to.deep.equal(put(fetchTypeList()));
  });

  it("should call(request, WEXIN_ARTICLE_TYPE, 'get')", () => {
    const next = step();
    expect(next).to.deep.equal(call(request, WEXIN_ARTICLE_TYPE, 'get'));
  });

  it('should put(receiveTypeList(typeList.showapi_res_body.typeList))', () => {
    const next = step(mockTypeList);
    expect(next).to.deep.equal(put(receiveTypeList(mockTypeList.showapi_res_body.typeList)));
  });

  it("should call(Storage.save, 'typeList', typeList.showapi_res_body.typeList)", () => {
    const next = step(mockTypeList);
    expect(next).to.deep.equal(call(Storage.save,
      'typeList',
      mockTypeList.showapi_res_body.typeList));
  });

  it('should be done', () => {
    const next = generator.next();
    expect(next.done).to.equal(true);
  });
});
