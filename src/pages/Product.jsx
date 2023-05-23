import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getProductById } from '../services/api';

export default class Product extends Component {
  state = {
    product: {},
    email: '',
    rating: 0,
    evaluation: '',
    reviews: [],
    errorMsg: '',

  };

  async componentDidMount() {
    const { match: { params } } = this.props;
    const product = await getProductById(params.id);
    this.setState({ product });
  }

  handleInputChange = ({ target: { name, value } }) => {
    const validValue = name === 'rating' ? Number(value) : value;
    this.setState({ [name]: validValue });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, rating, evaluation, reviews } = this.state;

    if ((!email.includes('.') && !email.includes('@')) || !rating) {
      this.setState({ errorMsg: 'Campos inválidos' });
      return;
    }

    const newReview = {
      email: email.toLowerCase(),
      rating: Number(rating),
      evaluation: evaluation.toLowerCase(),
    };

    this.setState({
      reviews: [...reviews, newReview],
      email: '',
      rating: 0,
      evaluation: '',
      errorMsg: '',
    });
  };

  renderReviews = () => {
    const { reviews } = this.state;

    return reviews.map((review, index) => (
      <div key={ index }>
        <p data-testid="review-card-email">{review.email}</p>
        <p data-testid="review-card-rating">{review.rating}</p>
        <p data-testid="review-card-evaluation">{review.evaluation}</p>
      </div>
    ));
  };

  render() {
    const { product, email, rating, evaluation, errorMsg } = this.state;
    const { title, thumbnail, price } = product;

    const ratings = [1, 2, 3, 4, 5];

    return (
      <>
        <div>
          <img
            data-testid="product-detail-image"
            src={ thumbnail }
            alt={ title }
          />
          <h1 data-testid="product-detail-name">{title}</h1>
          <p data-testid="product-detail-price">{price}</p>
        </div>

        <form onSubmit={ this.handleSubmit }>

          <label htmlFor="email">
            <input
              data-testid="product-detail-email"
              type="email"
              name="email"
              value={ email }
              id="email"
              onChange={ this.handleInputChange }

            />
          </label>

          {
            ratings.map((value) => (
              <label htmlFor="" key={ value }>
                <input
                  data-testid={ `${value}-rating` }
                  type="radio"
                  name="rating"
                  value={ value }
                  onChange={ this.handleInputChange }
                  checked={ rating === value }

                />
              </label>
            ))
          }

          <label htmlFor="evaluation">
            <textarea
              data-testid="product-detail-evaluation"
              name="evaluation"
              value={ evaluation }
              id="evaluation"
              onChange={ this.handleInputChange }
            />
          </label>

          {errorMsg && <p data-testid="error-msg">{ errorMsg }</p>}

          <button type="submit" data-testid="submit-review-btn">Avaliar</button>
        </form>

        <div className="reviews">
          {this.renderReviews()}
        </div>
      </>

    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
