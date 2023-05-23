import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default class ProductCard extends Component {
  render() {
    const { product, handleAddInCart } = this.props;
    const { title, thumbnail, price, id } = product;
    return (
      <Link to={ `/product/:${id}` } data-testid="product-detail-link">
        <div data-testid="product">
          <img src={ thumbnail } alt={ title } />
          <h4>{ title }</h4>
          <p>{ price }</p>
          <button
            data-testid="product-add-to-cart"
            onClick={ () => handleAddInCart(product) }
          >
            Adicionar ao carrinho
          </button>
        </div>
      </Link>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  handleAddInCart: PropTypes.func,
};

ProductCard.defaultProps = {
  handleAddInCart: () => {},
};
