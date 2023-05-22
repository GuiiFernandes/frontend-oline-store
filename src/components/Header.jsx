import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    const { query } = this.props;
    return (
      <header>
        <form>
          <label htmlFor="search">
            <input
              data-testid="query-input"
              type="text"
              name="query"
              value={ query }
              id="search"
              placeholder="digite o que você busca"
            />
          </label>
          <button data-testid="query-button">Buscar</button>
        </form>
        <h1>Front-End Online Store</h1>
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
      </header>
    );
  }
}

Header.propTypes = {
  query: PropTypes.string.isRequired,
};
