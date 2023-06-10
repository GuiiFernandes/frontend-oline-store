import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Rating extends Component {
  render() {
    const { rating, handleInputChange, isInput } = this.props;
    const MAX_RATING = 5;
    const ratings = [...Array(MAX_RATING).keys()].map((index) => MAX_RATING - index);
    return (
      <div className="rating">
        { ratings.map((value) => (isInput ? (
          <>
            <input
              data-testid={ `${value}-rating` }
              id={ `star-${value}` }
              type="radio"
              name="rating"
              value={ value }
              onChange={ handleInputChange }
              checked={ rating === value }
            />
            <label htmlFor={ `star-${value}` } key={ value }>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360" /></svg>
            </label>
          </>
        ) : (
          <div
            className={ value <= rating ? 'star-checked' : '' }
            htmlFor={ `star-${value}` }
            key={ value }
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360" /></svg>
          </div>
        ))) }
      </div>
    );
  }
}

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  isInput: PropTypes.bool,
};

Rating.defaultProps = {
  isInput: false,
};
