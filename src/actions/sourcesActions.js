import * as types from './actionTypes';
import GetNewsSources from '../api/sourcesApi';

export function getSourcesSuccess(sources) {
  return { type: types.GET_ALL_SOURCES_SUCCESS, sources };
}

export function getSourcesFailure(error) {
  return { type: types.GET_ALL_SOURCES_FAILURE, error };
}

export function getAllSources() {
  return function (dispatch) {
    return GetNewsSources.getAlllNewsSources()
            .then((sources) => {
              dispatch(getSourcesSuccess(sources));
            })
            .catch((error) => {
              dispatch(getSourcesFailure(error));
            });
  };
}
