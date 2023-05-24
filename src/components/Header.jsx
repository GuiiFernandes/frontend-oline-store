import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logoG from '../img/logoG.png';
import logoP from '../img/logoP.png';
import '../css/Header.css';

export default class Header extends Component {
  render() {
    const { query, handleChange, displayProducts, cartCount } = this.props;
    return (
      <header className="header">
        <form>
          <label htmlFor="search">
            <input
              data-testid="query-input"
              type="text"
              name="query"
              value={ query }
              onChange={ handleChange }
              id="search"
              placeholder="digite o que você busca"
            />
          </label>
          <button
            data-testid="query-button"
            onClick={ displayProducts }
          >
            Buscar

          </button>
        </form>
        <div className="logo-container">
          <img className="logo-p" src={ logoP } alt="Shopping 07 logo" />
          <img className="logo-g" src={ logoG } alt="Shopping 07 logo" />
        </div>
        <Link to="/cart" data-testid="shopping-cart-button">
          <span>Carrinho</span>
          <span data-testid="shopping-cart-size">{ cartCount }</span>
        </Link>
      </header>
    );
  }
}

Header.propTypes = {
  query: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  displayProducts: PropTypes.func.isRequired,
  cartCount: PropTypes.number.isRequired,
};
