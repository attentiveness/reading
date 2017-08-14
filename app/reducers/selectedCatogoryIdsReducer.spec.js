import reducer from './selectedCategoryIdsReducer';
import * as types from '../constants/ActionTypes';

describe('selectedCategoryIds reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        selectedCategoryIds: []
      }
    );
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
            reducer(
              categoryIds,
              {
                type: types.CHANGE_CATEGORY,
                data: newCategoryIds
              }
            )
        ).toEqual(newCategoryIds);
  });
});
