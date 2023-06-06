import PropTypes from 'prop-types';
import { Component } from 'react';
import '../css/FormCheckout.css';
import InputMask from 'react-input-mask';
import BoletoIcon from '../img/BoletoIcon';
import VisaIcon from '../img/VisaIcon';
import MasterIcon from '../img/MasterIcon';
import EloIcon from '../img/EloIcon';

export default class FormCheckout extends Component {
  checkColor = (payment, flag) => {
    if (payment === flag) return '#ff3b93';
    return '#37023a';
  };

  render() {
    const { campos, handleChange, handleSubmit, mostrarErro } = this.props;
    const { fullname, email, cpf, phone, cep, address, payment } = campos;
    return (
      <form className="form-container">
        <h2 className="form-title">Informações do Comprador</h2>
        <label htmlFor="fullname">
          Nome Completo
          <input
            className="form-input"
            name="fullname"
            type="text"
            id="fullname"
            data-testid="checkout-fullname"
            value={ fullname }
            onChange={ handleChange }
            required
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            className="form-input"
            name="email"
            type="email"
            id="email"
            data-testid="checkout-email"
            value={ email }
            onChange={ handleChange }
            required
          />
        </label>
        <label htmlFor="cpf">
          CPF
          <InputMask
            mask="999.999.999-99"
            className="form-input"
            name="cpf"
            type="text"
            id="cpf"
            data-testid="checkout-cpf"
            value={ cpf }
            onChange={ handleChange }
            required
          />
        </label>
        <label htmlFor="phone">
          Celular
          <InputMask
            mask="(99) 99999-9999"
            className="form-input"
            name="phone"
            type="text"
            id="phone"
            data-testid="checkout-phone"
            value={ phone }
            onChange={ handleChange }
            required
          />
        </label>
        <label htmlFor="cep">
          CEP
          <InputMask
            mask="99.999-999"
            className="form-input"
            name="cep"
            type="text"
            id="cep"
            data-testid="checkout-cep"
            value={ cep }
            onChange={ handleChange }
            required
          />
        </label>
        <label htmlFor="address">
          Endereço
          <input
            className="form-input"
            name="address"
            type="text"
            id="address"
            data-testid="checkout-address"
            value={ address }
            onChange={ handleChange }
            required
          />
        </label>
        <div className="payment-container">
          <h3 className="form-title smaller">Método de pagamento:</h3>
          <label htmlFor="ticket">
            <input
              type="radio"
              id="ticket"
              name="payment"
              data-testid="ticket-payment"
              value="Boleto"
              checked={ payment === 'Boleto' }
              onChange={ handleChange }
              required
            />
            <BoletoIcon color={ this.checkColor(payment, 'Boleto') } />
          </label>
          <label htmlFor="visa">
            <input
              type="radio"
              id="visa"
              name="payment"
              data-testid="visa-payment"
              value="Visa"
              checked={ payment === 'Visa' }
              onChange={ handleChange }
              required
            />
            <VisaIcon color={ this.checkColor(payment, 'Visa') } />
          </label>
          <label htmlFor="master">
            <input
              type="radio"
              id="master"
              name="payment"
              data-testid="master-payment"
              value="MasterCard"
              checked={ payment === 'MasterCard' }
              onChange={ handleChange }
              required
            />
            <MasterIcon color={ this.checkColor(payment, 'MasterCard') } />
          </label>
          <label htmlFor="elo">
            <input
              type="radio"
              id="elo"
              name="payment"
              data-testid="elo-payment"
              value="Elo"
              checked={ payment === 'Elo' }
              onChange={ handleChange }
              required
            />
            <EloIcon color={ this.checkColor(payment, 'Elo') } />
          </label>
        </div>
        { mostrarErro && (
          <div
            className="invalid-input"
            data-testid="error-msg"
          >
            Campos inválidos
          </div>
        ) }
        <button
          className="btn-checkout"
          onClick={ handleSubmit }
          type="submit"
          data-testid="checkout-btn"
        >
          Concluir Compra
        </button>
      </form>
    );
  }
}

FormCheckout.propTypes = {
  campos: PropTypes.shape({
    fullname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    cpf: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    cep: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    payment: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  mostrarErro: PropTypes.bool.isRequired,
};
