import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getProductById } from '../services/api';

export default class Product extends Component {
  state = {
    product: {},
  };

  async componentDidMount() {
    const { match: { params } } = this.props;
    const product = await getProductById(params.id);
    this.setState({ product });
  }

  render() {
    const { handleAddInCart } = this.props;
    const { product } = this.state;
    const { title, thumbnail, price } = product;

    return (
      <div>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ title }
        />
        <h1 data-testid="product-detail-name">{ title }</h1>
        <p data-testid="product-detail-price">{ price }</p>
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ () => handleAddInCart(product) }
        >
          Adicionar ao carrinho
        </button>
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
