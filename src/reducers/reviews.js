import axios from 'axios';
import {
  GET_REVIEWS,
  CREATE_REVIEW,
  _getReviews,
  _createReview
} from './constants/reviewActions';


export const getReviews = () => {
  return dispatch => {
    axios
      .get(`/api/reviews`)
      .then(response => response.data)
      .then(reviews => dispatch(_getReviews(reviews)));
  };
};

export const createReview = review => {
  return dispatch => {
    axios
      .post(`/api/reviews`, review)
      .then(response => response.data)
      .then(review => dispatch(_createReview(review)));
  };
};

export const reviewsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews;
    case CREATE_REVIEW:
      return [...state, action.review];
    default:
      return state;
  }
};
