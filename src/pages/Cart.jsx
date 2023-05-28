import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IoArrowUndo } from 'react-icons/io5';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { NumericFormat } from 'react-number-format';
import { changeQuantity, removeProduct } from '../services/localStorage';
import '../css/Cart.css';

export default class Cart extends Component {
  state = {
    productsInCart: [],
    quantities: {},
  };

  componentDidMount() {
    this.setState({
      productsInCart: JSON.parse(localStorage.getItem('cart')) || [],
    }, () => this.setState(({ productsInCart }) => ({
      quantities: productsInCart
        .reduce((obj, { id, quantity }) => ({ ...obj, [id]: quantity }), {}),
    })));
  }

  handleChangeQuantity = (product, mult, value, fromInput) => {
    let validValue = fromInput ? (Number(value) || 0) : product.quantity + (mult * 1);
    validValue = validValue > product.available_quantity
      ? product.available_quantity : validValue;
    this.setState(({ quantities }) => ({
      quantities: { ...quantities, [product.id]: validValue || '' },
    }), () => {
      const { updateCartCount } = this.props;
      this.setState({
        productsInCart: changeQuantity(product, (validValue || 1)),
      }, () => updateCartCount());
    });
  };

  // inputChangeQuantity = (value, product) => {
  //   this.setState(({ quantities }) => ({
  //     quantities: { ...quantities, [product.id]: value ? Number(value) : '' },
  //   }), () => {
  //     console.log(value);
  //     this.handleChangeQuantity(product, 0, value);
  //   });
  // };

  handleRemoveProduct = (product) => {
    const { updateCartCount } = this.props;
    const { productsInCart } = this.state;
    this.setState({ productsInCart: removeProduct(product, productsInCart) });
    updateCartCount();
  };

  render() {
    const { productsInCart, quantities } = this.state;
    const negativeMult = -1;
    return (
      <div className="page-cart-container">
        <nav>
          <Link to="/">
            <button className="back-button">
              <IoArrowUndo size="19px" />
              Voltar
            </button>
          </Link>
        </nav>
        { productsInCart.length ? (
          <section className="cart-container">
            <div className="cart-product-container">
              { productsInCart.map((product) => (
                <div className="product-cart" key={ product.id }>
                  <button
                    className="btn-cart remove-product-cart"
                    data-testid="remove-product"
                    onClick={ () => this.handleRemoveProduct(product) }
                  >
                    X
                  </button>
                  <img
                    className="img-product-cart"
                    src={ product.thumbnail }
                    alt={ product.title }
                  />
                  <p
                    className="product-title"
                    data-testid="shopping-cart-product-name"
                  >
                    { product.title }
                  </p>
                  <div className="purchase-container">
                    <div
                      className="qtd-container"
                      data-testid="shopping-cart-product-quantity"
                    >
                      <button
                        className="btn-cart qtd"
                        data-testid="product-decrease-quantity"
                        onClick={ () => this
                          .handleChangeQuantity(product, negativeMult, 1, false) }
                        disabled={ product.quantity === 1 }
                      >
                        <IoIosArrowBack size="20px" />
                      </button>
                      <input
                        type="number"
                        className="product-qtd"
                        min="1"
                        max={ product.available_quantity }
                        step="1"
                        name={ product.id }
                        value={ quantities[product.id] }
                        onChange={ (e) => this
                          .handleChangeQuantity(product, 1, e.target.value, true) }
                      />
                      <button
                        className="btn-cart qtd"
                        data-testid="product-increase-quantity"
                        onClick={ () => this.handleChangeQuantity(product, 1, 1, false) }
                        disabled={ product.quantity === product.available_quantity }
                      >
                        <IoIosArrowForward size="20px" />
                      </button>
                    </div>
                    <p className="price-cart">
                      <NumericFormat
                        value={ product.price }
                        allowNegative={ false }
                        displayType="text"
                        decimalScale={ 2 }
                        fixedDecimalScale
                        decimalSeparator=","
                        prefix="R$"
                        thousandSeparator="."
                      />
                    </p>
                  </div>
                </div>
              )) }
            </div>
            <nav className="checkout">
              <Link to="./Checkout">
                <button
                  disabled={ !productsInCart.length }
                  data-testid="checkout-products"
                >
                  Checkout
                </button>
              </Link>
            </nav>
          </section>
        ) : (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) }
      </div>
    );
  }
}

Cart.propTypes = {
  updateCartCount: PropTypes.func.isRequired,
};
