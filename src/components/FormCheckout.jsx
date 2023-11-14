import PropTypes from 'prop-types';
import { Component } from 'react';
import InputMask from 'react-input-mask';

import '../css/FormCheckout.css';
import BoletoIcon from '../img/BoletoIcon';
import VisaIcon from '../img/VisaIcon';
import MasterIcon from '../img/MasterIcon';
import EloIcon from '../img/EloIcon';
import PersonalForm from './PersonalForm';

export default class FormCheckout extends Component {
  checkColor = (payment, flag) => {
    if (payment === flag) return '#ff3b93';
    return '#37023a';
  };

  render() {
    const FREE_SHIPPING_MIN_VALUE = 700;
    const { campos, handleChange, handleChangeCep,
      handleSubmit, mostrarErro, totalValue } = this.props;
    const { freights, cep, address, payment, number, freight } = campos;
    return (
      <form className="form-container">
        <h2 className="form-title">Informações do Comprador</h2>
        <PersonalForm campos={ campos } handleChange={ handleChange } />
        <label htmlFor="cep">
          CEP (
          <a
            className="cep-link"
            href="https://buscacepinter.correios.com.br/app/endereco/index.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            Para buscar CEP clique aqui
          </a>
          )
          <InputMask
            mask="99999-999"
            className="form-input cep"
            name="cep"
            type="text"
            id="cep"
            data-testid="checkout-cep"
            value={ cep }
            onChange={ handleChangeCep }
            required
          />
        </label>
        <label htmlFor="address">
          Endereço
          <input
            className="form-input"
            disabled
            name="address"
            type="text"
            id="address"
            data-testid="checkout-address"
            placeholder="Com CEP endereço e frete são automáticos"
            value={ address }
            required
          />
        </label>
        <div>
          <label htmlFor="number">
            Número e Complemento
            <input
              className="form-input"
              disabled={ address === '' }
              name="address"
              type="text"
              id="address"
              data-testid="checkout-address"
              value={ number }
              onChange={ handleChange }
              required
            />
          </label>
          { freights.length > 0 && (
            <div>
              <p>Frete</p>
              <div>
                { totalValue > FREE_SHIPPING_MIN_VALUE
                  ? 'Grátis'
                  : freights.map(({ Valor, PrazoEntrega, Codigo }) => (
                    <label
                      key={ Codigo }
                      htmlFor={ Codigo }
                      style={ {
                        color: this.checkColor(freight, Valor),
                        fontWeight: freight === Valor ? 'bold' : 'normal',
                      } }
                    >
                      <input
                        className="input-freight"
                        type="radio"
                        id={ Codigo }
                        name="freight"
                        value={ Valor }
                        checked={ freight === Valor }
                        onChange={ handleChange }
                        required
                      />
                      {`${Codigo === '04014' ? 'Sedex' : 'PAC'}
                       R$ ${Valor} - ${PrazoEntrega} dias úteis`}
                    </label>
                  )) }
              </div>
            </div>
          ) }
        </div>
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
    cep: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    freights: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
    payment: PropTypes.string.isRequired,
    freight: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleChangeCep: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  mostrarErro: PropTypes.bool.isRequired,
  totalValue: PropTypes.number.isRequired,
};
