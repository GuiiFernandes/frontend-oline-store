import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import BackBtn from '../components/BackBtn';
import { getProductById } from '../services/api';
import '../css/Product.css';
import '../css/Rating.css';
import PurchaseDetail from '../components/PurchaseDetail';

const MAX_RATING = 5;

export default class Product extends Component {
  state = {
    product: {},
    email: '',
    rating: 0,
    evaluation: '',
    reviews: [],
    errorMsg: '',
    specificationsOpen: false,
  };

  async componentDidMount() {
    const { match: { params } } = this.props;
    const product = await getProductById(params.id);
    this.setState({ product });

    // Retrieve reviews from local storage
    const storedReviews = localStorage.getItem(params.id);
    if (storedReviews) {
      this.setState({ reviews: JSON.parse(storedReviews) });
    }
  }

  handleInputChange = ({ target: { name, value } }) => {
    const validValue = name === 'rating' ? Number(value) : value;
    this.setState({ [name]: validValue });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, rating, evaluation, reviews, product } = this.state;

    if ((!email.includes('.') && !email.includes('@')) || !rating) {
      this.setState({ errorMsg: 'Campos inválidos' });
      return;
    }

    const newReview = {
      email,
      rating: Number(rating),
      evaluation,
    };

    const updatedReviews = [...reviews, newReview];

    // Save reviews in local storage
    localStorage.setItem(product.id, JSON.stringify(updatedReviews));

    this.setState({
      reviews: updatedReviews,
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

  openSpecifications = () => {
    const { specificationsOpen } = this.state;
    this.setState({ specificationsOpen: !specificationsOpen });
  };

  render() {
    const { product, email, rating,
      evaluation, errorMsg, specificationsOpen } = this.state;
    const { title, thumbnail, attributes } = product;

    const ratings = [...Array(MAX_RATING).keys()].map((index) => MAX_RATING - index);
    const biggerScreen = 900;
    const screenIsBigger = document.body.clientWidth > biggerScreen;

    return (
      <div className="page-detail-container">
        <Route
          path="/product/:id"
          render={ (props) => (<BackBtn
            { ...props }
          />) }
        />
        <div className="detail-container">
          <div className="photo-detail-container">
            <h1 className="detail-title" data-testid="product-detail-name">{title}</h1>
            <img
              className="detail-image"
              data-testid="product-detail-image"
              src={ thumbnail }
              alt={ title }
            />
          </div>
          <div>
            <div>

              { screenIsBigger ? (
                <h2 className="checkout-items-title">Especificações</h2>
              ) : (
                <button
                  type="button"
                  className="checkout-items-title"
                  onClick={ this.openSpecifications }
                >
                  Especificações
                  { specificationsOpen ? (
                    <IoIosArrowDown size="20px" />
                  ) : (
                    <IoIosArrowForward size="20px" />
                  )}
                </button>
              ) }
              <ul
                className="info-details-container"
                style={ { display: specificationsOpen || screenIsBigger
                  ? 'block' : 'none' } }
              >
                { attributes && attributes.map(({ name, value_name: value, id }) => (
                  <li key={ id }>
                    <span>{ `${name}: ` }</span>
                    {value}
                  </li>
                )) }
              </ul>
            </div>
            <PurchaseDetail
              product={ product }
            />
          </div>
        </div>
        <div className="reviews-container">
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

            <label htmlFor="evaluation">
              <textarea
                data-testid="product-detail-evaluation"
                name="evaluation"
                value={ evaluation }
                id="evaluation"
                onChange={ this.handleInputChange }
              />
            </label>
            <div className="rating">
              {
                ratings.map((value) => (
                  <>
                    <input
                      data-testid={ `${value}-rating` }
                      id={ `star-${value}` }
                      type="radio"
                      name="rating"
                      value={ value }
                      onChange={ this.handleInputChange }
                      checked={ rating === value }
                    />
                    <label htmlFor={ `star-${value}` } key={ value }>
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360" /></svg>
                    </label>
                  </>
                ))
              }
            </div>

            {errorMsg && <p data-testid="error-msg">{ errorMsg }</p>}

            <button type="submit" data-testid="submit-review-btn">Avaliar</button>
          </form>

          <div className="reviews">
            {this.renderReviews()}
          </div>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleAddInCart: PropTypes.func.isRequired,
};
