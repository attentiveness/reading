import reducer from './selectedCategoryIdsReducer';
import * as types from '../constants/ActionTypes';

describe('selectedCategoryIds reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle CHANGE_CATEGORY ', () => {
    const categoryIds = [1, 2];
    const newCategoryIds = [3, 4];
    expect(
      reducer([], {
        type: types.CHANGE_CATEGORY,
        data: categoryIds
      })
    ).toEqual(categoryIds);
    expect(
      reducer(categoryIds, {
        type: types.CHANGE_CATEGORY,
        data: newCategoryIds
      })
    ).toEqual(newCategoryIds);
  });

  it('should handle PERSIST_REHYDRATE from redux-persist ', () => {
    const newCategoryIds = [3, 4];
    expect(
      reducer([], {
        type: types.PERSIST_REHYDRATE,
        payload: {
          selectedCategoryIds: newCategoryIds
        }
      })
    ).toEqual(newCategoryIds);
  });
});
