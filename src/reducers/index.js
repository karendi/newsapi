import { combineReducers } from 'redux';
import posts from './postsReducer';
import sources from './sourcesReducer';

const rootReducer = combineReducers({
  posts,
  sources,
});

export default rootReducer;
