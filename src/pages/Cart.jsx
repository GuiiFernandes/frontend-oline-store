import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IoArrowUndo } from 'react-icons/io5';
import { changeQuantity, removeProduct } from '../services/localStorage';
import '../css/Cart.css';

export default class Cart extends Component {
  state = {
    productsInCart: [],
  };

  componentDidMount() {
    this.setState({
      productsInCart: JSON.parse(localStorage.getItem('cart')) || [],
    });
  }

  handleChangeQuantity = (product, mult) => {
    const { updateCartCount } = this.props;
    this.setState({
      productsInCart: changeQuantity(product, mult),
    });
    updateCartCount();
  };

  handleRemoveProduct = (product) => {
    const { updateCartCount } = this.props;
    const { productsInCart } = this.state;
    this.setState({ productsInCart: removeProduct(product, productsInCart) });
    updateCartCount();
  };

  render() {
    const { productsInCart } = this.state;
    const negativeMult = -1;
    return (
      <main>
        <nav>
          <Link to="/">
            <button className="back-button">
              <IoArrowUndo size="19px" />
              Voltar
            </button>
          </Link>
        </nav>
        <section>
          { productsInCart.length
            ? productsInCart.map((product) => (
              <div key={ product.id }>
                <button
                  data-testid="remove-product"
                  onClick={ () => this.handleRemoveProduct(product) }
                >
                  remover
                </button>
                <img src={ product.thumbnail } alt={ product.title } />
                <span data-testid="shopping-cart-product-name">{ product.title }</span>
                <span data-testid="shopping-cart-product-quantity">
                  <button
                    data-testid="product-decrease-quantity"
                    onClick={ () => this.handleChangeQuantity(product, negativeMult) }
                    disabled={ product.quantity === 1 }
                  >
                    -
                  </button>
                  <strong>
                    { product.quantity }
                  </strong>
                  <button
                    data-testid="product-increase-quantity"
                    onClick={ () => this.handleChangeQuantity(product, 1) }
                  >
                    +
                  </button>
                </span>
                <span>{ product.price }</span>
              </div>
            )) : (
              <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            ) }
        </section>
        <nav>
          <Link to="./Checkout">
            <button
              disabled={ !productsInCart.length }
              data-testid="checkout-products"
            >
              Checkout
            </button>
          </Link>
        </nav>
      </main>
    );
  }
}

Cart.propTypes = {
  updateCartCount: PropTypes.func.isRequired,
};
