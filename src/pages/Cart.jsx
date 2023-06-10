import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { changeQuantity, removeProduct } from '../services/localStorage';
import '../css/Cart.css';
import ProductCart from '../components/ProductCart';
import BackBtn from '../components/BackBtn';

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

  handleRemoveProduct = (product) => {
    const { updateCartCount, animatingRemove } = this.props;
    const { productsInCart } = this.state;
    animatingRemove();
    this.setState({ productsInCart: removeProduct(product, productsInCart) });
    updateCartCount();
  };

  render() {
    const { productsInCart, quantities } = this.state;
    return (
      <div className="page-cart-container">
        <Route
          path="/cart"
          render={ (props) => (<BackBtn
            { ...props }
          />) }
        />
        { productsInCart.length ? (
          <section className="cart-container">
            <div className="cart-product-container">
              { productsInCart.map((product) => (
                <ProductCart
                  key={ product.id }
                  product={ product }
                  handleChangeQuantity={ this.handleChangeQuantity }
                  handleRemoveProduct={ this.handleRemoveProduct }
                  quantities={ quantities }
                />
              )) }
            </div>
            <nav className="checkout">
              <div className="total">
                <p className="title-total">TOTAL</p>
                <NumericFormat
                  className="value-total"
                  value={
                    productsInCart.reduce((total, { quantity, price }) => (
                      total + (price * quantity)), 0)
                  }
                  allowNegative={ false }
                  displayType="text"
                  decimalScale={ 2 }
                  fixedDecimalScale
                  decimalSeparator=","
                  prefix="R$"
                  thousandSeparator="."
                />
              </div>
              <Link to="/Checkout">
                <button
                  className="btn-checkout"
                  disabled={ !productsInCart.length }
                  data-testid="checkout-products"
                >
                  FINALIZAR COMPRA
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
  animatingRemove: PropTypes.func.isRequired,
};
