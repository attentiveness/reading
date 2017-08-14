import * as actions from './category';
import * as types from '../constants/ActionTypes';

describe('actions', () => {
  it('should create an action to change currently selected category Ids', () => {
    const selectedCategoryIds = [1, 2];
    const expectedAction = {
      type: types.CHANGE_CATEGORY,
      data: selectedCategoryIds
    };
    expect(actions.changeCategory(selectedCategoryIds)).toEqual(expectedAction);
  });
});
