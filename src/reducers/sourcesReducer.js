import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function sourcesReducer(state = initialState.sources, action) {
  switch (action.type) {
    case types.GET_ALL_SOURCES_SUCCESS:
      return Object.assign([], state, action.sources);
    default:
      return state;
  }
}
