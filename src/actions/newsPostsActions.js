import * as types from './actionTypes';
import GetNewsPost from '../api/getNewsPost';

export function getPostsSuccess(posts) {
  return { type: types.GET_ALL_POSTS_SUCCESS, posts };
}

export function getPostsFailure(error) {
  return { type: types.FAILURE_TO_GET_POSTS, error };
}

export default function getAllNewsPosts(source, sortBy) {
  return function (dispatch) {
    return GetNewsPost.getAllNewsPosts(source, sortBy)
        .then((posts) => {
          dispatch(getPostsSuccess(posts));
        })
        .catch((error) => {
          dispatch(getPostsFailure(error));
        });
  };
}
