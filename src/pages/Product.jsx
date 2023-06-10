import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import BackBtn from '../components/BackBtn';
import { getProductById } from '../services/api';
import '../css/Product.css';
import '../css/Rating.css';
import PurchaseDetail from '../components/PurchaseDetail';
import Rating from '../components/Rating';

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

  openSpecifications = () => {
    const { specificationsOpen } = this.state;
    this.setState({ specificationsOpen: !specificationsOpen });
  };

  render() {
    const { updateCartCount, animatingAdd } = this.props;
    const { product, email, rating, reviews,
      evaluation, errorMsg, specificationsOpen } = this.state;
    const { title, thumbnail, attributes } = product;
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
          <div className="infos-container">
            <div className="specifications-container">

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
              updateCartCount={ updateCartCount }
              animatingAdd={ animatingAdd }
            />
          </div>
        </div>
        <div className="reviews-container">
          <form
            className="review-form"
            onSubmit={ this.handleSubmit }
          >
            <h2 className="checkout-items-title">Avalie este produto</h2>
            <div className="email-rating">
              <input
                className="form-input"
                data-testid="product-detail-email"
                type="email"
                name="email"
                value={ email }
                id="email"
                onChange={ this.handleInputChange }
                placeholder="E-mail"
              />
              <Rating
                rating={ rating }
                handleInputChange={ this.handleInputChange }
                isInput
              />
            </div>
            <textarea
              className="form-input textarea"
              data-testid="product-detail-evaluation"
              name="evaluation"
              value={ evaluation }
              id="evaluation"
              placeholder="Deixe seu comentário (opcional)"
              onChange={ this.handleInputChange }
            />
            {errorMsg && (
              <p
                className="invalid-input"
                data-testid="error-msg"
              >
                { errorMsg }
              </p>
            )}
            <button
              type="submit"
              className="btn-checkout"
              data-testid="submit-review-btn"
            >
              Avaliar
            </button>
          </form>
          <div className="reviews">
            <h2 className="checkout-items-title">Avaliações</h2>
            <div className="container-review">
              { reviews.map((review, index) => (
                <div className="review-container" key={ index }>
                  <div className="review-line1">
                    <p
                      className="text-email"
                      data-testid="review-card-email"
                    >
                      {review.email}
                    </p>
                    <Rating
                      rating={ review.rating }
                      handleInputChange={ this.handleInputChange }
                    />
                  </div>
                  <p
                    className="text-evaluation"
                    data-testid="review-card-evaluation"
                  >
                    {review.evaluation}
                  </p>
                </div>
              )) }
            </div>
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
  updateCartCount: PropTypes.func.isRequired,
  animatingAdd: PropTypes.bool.isRequired,
};
