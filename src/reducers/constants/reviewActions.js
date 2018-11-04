export const GET_REVIEWS = 'GET_REVIEWS';
export const CREATE_REVIEW = 'CREATE_REVIEW';

export const _getReviews = reviews => {
  return {
    type: GET_REVIEWS,
    reviews,
  };
};

export const _createReview = review => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};