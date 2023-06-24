import { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import { calcularPrecoPrazo, consultarCep } from 'correios-brasil';

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
      number: '',
      address: '',
      freights: [],
      payment: '',
      freight: '',
    },
    productsInCart: [],
    quantities: {},
    mostrarErro: false,
    cartOpen: false,
    completedPurchase: false,
    totalValue: 0,
  };

  componentDidMount() {
    this.setState({
      productsInCart: JSON.parse(localStorage.getItem('cart')) || [],
    }, () => this.setState(({ productsInCart }) => ({
      quantities: productsInCart
        .reduce((obj, { id, quantity }) => ({ ...obj, [id]: quantity }), {}),
      totalValue: this.getTotal(productsInCart),
    })));
  }

  calculateFreights = async (cep, totalValue) => {
    const FREE_SHIPPING_MIN_VALUE = 700;
    if (totalValue < FREE_SHIPPING_MIN_VALUE) {
      const args = { sCepOrigem: '81200100',
        sCepDestino: cep,
        nVlPeso: '1',
        nCdFormato: '1',
        nVlComprimento: '20',
        nVlAltura: '20',
        nVlLargura: '20',
        nCdServico: ['04014', '04510'], // Array com os códigos de serviço
        nVlDiametro: '0' };
      calcularPrecoPrazo(args).then((newResponse) => {
        this.setState((prevState) => ({
          campos: { ...prevState.campos,
            freights: newResponse
              .map(({ Valor, PrazoEntrega, Codigo }) => (
                { Valor, PrazoEntrega, Codigo })) },
        }));
      }).catch(() => {
        this.setState((prevState) => ({
          campos: { ...prevState.campos,
            freights: [
              { Valor: '53,10', PrazoEntrega: '8', Codigo: '04014' },
              { Valor: '27,80', PrazoEntrega: '10', Codigo: '04510' },
            ] },
        }));
      });
    } else {
      this.setState((prevState) => ({ campos: {
        ...prevState.campos,
        freights: [{ Valor: 0, PrazoEntrega: 0, Codigo: 'Grátis' }],
      } }));
    }
  };

  handleChangeCep = async ({ target: { value } }) => {
    if (!value.includes('_') && !!value.length) {
      consultarCep(value).then((response) => {
        const { bairro, logradouro, localidade, uf } = response;
        console.log(response);
        if (response.error) {
          this.setState((prevState) => ({ campos: { ...prevState.campos,
            cep: value,
            address: 'CEP INVÁLIDO!' } }));
        } else {
          this.setState((prevState) => ({ campos: { ...prevState.campos,
            cep: value,
            address: `${logradouro}, ${bairro}, ${localidade}, ${uf}` } }), () => {
            const { campos: { cep }, totalValue } = this.state;
            this.calculateFreights(cep, totalValue);
          });
        }
      });
    } else {
      this.setState((prevState) => ({ campos: {
        ...prevState.campos,
        cep: value,
        address: '',
      } }));
    }
  };

  getTotal = (productsInCart) => productsInCart
    .reduce((total, { quantity, price }) => (total + (price * quantity)), 0);

  getFreight = (value) => {
    const freightValue = value.replace(',', '.');
    return Number(freightValue);
  };

  handleChange = async (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      campos: { ...prevState.campos, [name]: value },
      totalValue: this.getTotal(prevState.productsInCart) + this.getFreight(value),
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const msgTime = 5000;
    const { campos: { fullname, email, cpf, phone, cep, address, payment } } = this.state;
    const { history, updateCartCount } = this.props;
    const camposInvalidos = !fullname
    || !email || !cpf || !phone || !cep || !address || !payment;
    if (camposInvalidos) {
      this.setState({ mostrarErro: camposInvalidos });
      return;
    }
    this.setState({ completedPurchase: true });
    localStorage.setItem('cart', JSON.stringify([]));
    updateCartCount();
    setTimeout(() => { history.push('/'); }, msgTime);
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
    const { productsInCart, cartOpen, campos, totalValue,
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
                  value={ totalValue }
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
              totalValue={ totalValue }
              handleChangeCep={ this.handleChangeCep }
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
