// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Cart extends Component {
  render() {
    return (
      <main>
        <nav>
          <Link to="/">
            <button>Voltar</button>
          </Link>
        </nav>
        <section>
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        </section>
      </main>
    );
  }
}
