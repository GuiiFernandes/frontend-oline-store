import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsCart3, BsSearch } from 'react-icons/bs';
import logoG from '../img/logoG.png';
import logoP from '../img/logoP.png';
import '../css/Header.css';

export default class Header extends Component {
  render() {
    const { query, handleChange, getProducts, cartCount, sort } = this.props;
    return (
      <header className="header">
        <div className="logo-container">
          <img className="logo-p" src={ logoP } alt="Shopping 07 logo" />
          <img className="logo-g" src={ logoG } alt="Shopping 07 logo" />
        </div>
        <form className="btn-container">
          <input
            data-testid="query-input"
            type="text"
            name="query"
            className="btn input"
            value={ query }
            onChange={ handleChange }
            id="search"
            placeholder="digite o que você busca"
          />
          <button
            className="btn search"
            data-testid="query-button"
            onClick={ getProducts }
          >
            <BsSearch size="20px" />
          </button>
          <select
            name="sort"
            id="sort"
            value={ sort }
            onChange={ handleChange }
          >
            <option value="">Ordenar</option>
            <option value="price_desc">
              Maior preço
            </option>
            <option value="price_asc">
              Menor preço
            </option>
          </select>
        </form>
        <Link to="/cart" data-testid="shopping-cart-button">
          <div className="cart-container">
            <BsCart3 size="45px" />
            <span
              className="count-cart"
              data-testid="shopping-cart-size"
            >
              { cartCount }
            </span>
          </div>
        </Link>
      </header>
    );
  }
}

Header.propTypes = {
  query: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  cartCount: PropTypes.number.isRequired,
  sort: PropTypes.string.isRequired,
};
