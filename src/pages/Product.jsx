import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Product extends Component {
  render() {
    const { product } = this.props;
    const { title, thumbnail, price } = product;

    return (
      <div data-testid="product-detail-link">
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ title }
        />
        <h1 data-testid="product-detail-name">{title}</h1>
        <p data-testid="product-detail-price">{price}</p>

        <button
          data-testid="shopping-cart-button"
          type="button"
        >
          Adicionar ao carrinho

        </button>

      </div>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
