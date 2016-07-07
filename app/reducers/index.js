import { combineReducers } from 'redux';
import read from './read';
import category from './category';

const rootReducer = combineReducers({
  read,
  category
});

export default rootReducer;
