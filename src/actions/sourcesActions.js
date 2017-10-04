import * as types from './actionTypes';
import GetNewsSources from '../api/sourcesApi';

export function fetchingSources() {
  return { type: types.FETCHING_SOURCES, fetching: true };
}

export function getSourcesSuccess(newsSources) {
  return { type: types.GET_ALL_SOURCES_SUCCESS, newsSources };
}

export function getSourcesFailure(error) {
  return { type: types.GET_ALL_SOURCES_FAILURE, error };
}

export function getAllSources() {
  return function (dispatch) {
    dispatch(fetchingSources());
    return GetNewsSources.getAlllNewsSources()
            .then((sources) => {
              dispatch(getSourcesSuccess(sources));
            })
            .catch((error) => {
              dispatch(getSourcesFailure(error));
            });
  };
}
