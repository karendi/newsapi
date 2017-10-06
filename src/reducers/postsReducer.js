import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function postReducer(state = initialState.posts, action) {
  switch (action.type) {
    case types.GET_ALL_POSTS_WITH_FILTER_SUCCESS:
      return Object.assign([], state, action.posts);
    case types.GET_ALL_POSTS_WITHOUT_FILTER_SUCCESS:
      return Object.assign([], state, action.posts);
    default:
      return state;
  }
}
