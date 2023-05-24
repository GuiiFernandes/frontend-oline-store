import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    const { query, handleChange, displayProducts, cartCount, sort } = this.props;
    return (
      <header>
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
        <h1>Front-End Online Store</h1>
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
  sort: PropTypes.string.isRequired,
};
