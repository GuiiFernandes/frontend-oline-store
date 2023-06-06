import { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import ProductCart from '../components/ProductCart';
import BackBtn from '../components/BackBtn';
import FormCheckout from '../components/FormCheckout';
import '../css/Checkout.css';

export default class Checkout extends Component {
  state = {
    campos: {
      fullname: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      payment: '',
    },
    productsInCart: [],
    quantities: {},
    mostrarErro: false,
    cartOpen: false,
    completedPurchase: false,
  };

  componentDidMount() {
    this.setState({
      productsInCart: JSON.parse(localStorage.getItem('cart')) || [],
    }, () => this.setState(({ productsInCart }) => ({
      quantities: productsInCart
        .reduce((obj, { id, quantity }) => ({ ...obj, [id]: quantity }), {}),
    })));
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      campos: {
        ...prevState.campos,
        [name]: value,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const msgTime = 5000;
    const { campos } = this.state;
    const { history, updateCartCount } = this.props;
    const { fullname, email, cpf, phone, cep, address, payment } = campos;
    const camposInvalidos = !fullname
    || !email || !cpf || !phone || !cep || !address || !payment;
    if (camposInvalidos) {
      this.setState({ mostrarErro: camposInvalidos });
      return;
    }
    this.setState({ completedPurchase: true });
    localStorage.setItem('cart', JSON.stringify([]));
    updateCartCount();
    setTimeout(() => {
      history.push('/');
    }, msgTime);
  };

  handleRemoveProduct = (product) => {
    const { updateCartCount } = this.props;
    const { productsInCart } = this.state;
    this.setState({ productsInCart: removeProduct(product, productsInCart) });
    updateCartCount();
  };

  openCart = () => {
    const { cartOpen } = this.state;
    this.setState({ cartOpen: !cartOpen });
  };

  render() {
    const { productsInCart, cartOpen, campos,
      quantities, mostrarErro, completedPurchase } = this.state;
    const biggerScreen = 900;
    const screenIsBigger = document.body.clientWidth > biggerScreen;
    return (
      <div className="page-checkout-container">
        { completedPurchase ? (
          <section className="home-container page-text">
            <h2 className="title-message">Compra concluida com sucesso!</h2>
            <p className="message">
              Em breve você receberá um e-mail
              com as informações da compra, nota fiscal e código de ratreio.
            </p>
            <p className="message">
              OBRIGADO POR COMPRAR NA SHOPPING 07
            </p>
          </section>
        ) : (
          <>
            <Route
              path="/checkout"
              render={ (props) => (<BackBtn
                { ...props }
              />) }
            />
            <section
              className="checkout-cart-container"
            >
              { screenIsBigger ? (
                <h2 className="checkout-items-title">Revise seus produtos</h2>
              ) : (
                <button
                  type="button"
                  className="checkout-items-title"
                  onClick={ this.openCart }
                >
                  Revise seus produtos
                  { cartOpen ? (
                    <IoIosArrowDown size="20px" />
                  ) : (
                    <IoIosArrowForward size="20px" />
                  )}
                </button>
              ) }
              <section
                className="cart-product-container"
                style={ { display: cartOpen || screenIsBigger ? 'block' : 'none' } }
              >
                { productsInCart.map((product) => (
                  <ProductCart
                    key={ product.id }
                    product={ product }
                    handleRemoveProduct={ this.handleRemoveProduct }
                    quantities={ quantities }
                    noCheckout={ false }
                  />
                )) }
              </section>
              <div className="total-container">
                <p className="title-total">TOTAL:</p>
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
            </section>
            <FormCheckout
              campos={ campos }
              handleChange={ this.handleChange }
              handleSubmit={ this.handleSubmit }
              mostrarErro={ mostrarErro }
            />
          </>
        )}
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  updateCartCount: PropTypes.func.isRequired,
};
