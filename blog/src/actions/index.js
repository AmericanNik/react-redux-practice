import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  const userIds = _.uniq(_.map(getState().posts, 'userId'));
  userIds.forEach((id) => dispatch(fetchUser(id)));

  // -----This is a valid way to use lodash's chain function:
  // _.chain(getState().posts)
  // .map('userId')
  // .uniq()
  // .forEach(id => dispatch(fetchUser(id)))
  // .value(); <-this means essentially to 'execute' the chain of functions, otherwise it wont run
  //
};

export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data });
};
