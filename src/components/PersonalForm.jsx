import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import React, { Component } from 'react';

export default class PersonalForm extends Component {
  render() {
    const { campos, handleChange } = this.props;
    const { fullname, email, cpf, phone } = campos;
    return (
      <>
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
      </>
    );
  }
}

PersonalForm.propTypes = {
  campos: PropTypes.shape({
    fullname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    cpf: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};
