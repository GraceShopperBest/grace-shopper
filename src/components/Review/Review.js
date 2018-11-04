import React from 'react';
import { CardContent, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
const Review = ({ review, users }) => {
  const reviewer = users.find(user => user.id === review.userId);
  return (
    <CardContent>
      <Typography variant="h6" gutterBottom={true}>Review: 
        <Typography variant="body1">{review.text}</Typography>
      </Typography>
      <Typography variant="h6" gutterBottom={true}>Rating: {review.rating}
      </Typography>
      <Typography variant="h6" gutterBottom={true}>Written By: 
        <Typography variant="body1">{reviewer.userName}</Typography>
      </Typography>
    </CardContent>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};

export default connect(mapStateToProps)(Review);
