import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 50,
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5
  },
});

class Paginator extends Component {

  render() {
    const { classes, count, page, category, theme } = this.props;
    return (
      <div className={classes.root}>
        <IconButton
            to={`/${category}/products/page/${0}`}
            component={Link}
            disabled={page === 0}
            aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
            to={`/${category}/products/page/${page-1}`}
            component={Link}
            disabled={page === 0}
            aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
            to={`/${category}/products/page/${page+1}`}
            component={Link}
            disabled={page >= count-1}
            aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
            to={`/${category}/products/page/${count-1}`}
            component={Link}
            disabled={page >= count-1}
            aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

Paginator.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(actionsStyles, { withTheme: true })(Paginator);
