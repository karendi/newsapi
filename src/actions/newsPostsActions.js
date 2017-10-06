import * as types from './actionTypes';
import GetNewsPost from '../api/postsApi';

export function getPostsWithFilterSuccess(posts) {
  return { type: types.GET_ALL_POSTS_WITH_FILTER_SUCCESS, posts };
}

export function getPostsWithoutFilterSuccess(posts) {
  return { type: types.GET_ALL_POSTS_WITHOUT_FILTER_SUCCESS, posts };
}

export function getPostsFailure(error) {
  return { type: types.FAILURE_TO_GET_POSTS, error };
}

export function getAllNewsPostsWithFilter(source, sortBy) {
  return function (dispatch) {
    return GetNewsPost.getAllNewsPostsWithFilter(source, sortBy)
        .then((posts) => {
          dispatch(getPostsWithFilterSuccess(posts));
        })
        .catch((error) => {
          dispatch(getPostsFailure(error));
        });
  };
}

export function getAllNewsPostsWithoutFilter(source) {
  return function (dispatch) {
    return GetNewsPost.getAllNewsPostsWithoutFilter(source)
            .then((posts) => {
              dispatch(getPostsWithoutFilterSuccess(posts));
            })
            .catch((error) => {
              dispatch(getPostsFailure(error));
            });
  };
}
