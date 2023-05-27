import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsCart3, BsSearch } from 'react-icons/bs';
import logoG from '../img/logoG.png';
import logoP from '../img/logoP.png';
import '../css/Header.css';

export default class Header extends Component {
  render() {
    const { query, handleChange, getProducts,
      cartCount, visibleCategories, categoriesOpen } = this.props;
    return (
      <header className="header">
        <Link to="/">
          <picture className="logo-container">
            <source media="(min-width: 900px)" srcSet={ logoG } />
            <img src={ logoP } className="logo" alt="Shopping 07 logo" />
          </picture>
        </Link>
        <div className="search-container">
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
          </form>
          <button
            type="button"
            onClick={ visibleCategories }
            className={ `categories ${categoriesOpen && 'open'}` }
          >
            Categorias
          </button>
        </div>
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
  visibleCategories: PropTypes.func.isRequired,
  categoriesOpen: PropTypes.bool.isRequired,
};
