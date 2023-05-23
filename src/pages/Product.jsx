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
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, rating, evaluation, reviews } = this.state;

    if (!email || !rating) {
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

  displayReviews = () => {
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
              required
            />
          </label>

          <label htmlFor="rating">
            <input
              type="radio"
              data-testid="product-detail-evaluation"
              name="rating"
              value={ rating }
              checked={ rating }
              id={ rating }
              onChange={ this.handleInputChange }
              required
            />
          </label>

          <label htmlFor="evaluation">
            <textarea
              data-testid="product-detail-evaluation"
              name="evaluation"
              value={ evaluation }
              id="evaluation"
              onChange={ this.handleInputChange }
            />
          </label>

          {errorMsg && <p data-testid="error-msg">{errorMsg}</p>}

          <button type="submit" data-testid="submit-review-btn">Avaliar</button>
        </form>

        <div>
          {this.displayReviews()}
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
