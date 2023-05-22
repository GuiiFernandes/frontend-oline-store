import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <header>
        <form>
          <label htmlFor="search">
            <input
              type="text"
              placeholder="digite o que você busca"
              name="search"
              id="search"
            />
          </label>
          <button>Buscar</button>
        </form>
        <h1>Front-End Online Store</h1>
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
      </header>
    );
  }
}
